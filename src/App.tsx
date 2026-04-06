import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Preview from "./components/Preview";
import type { ResumeData } from "./types";
import { defaultResumeData } from "./types";
import { useReactToPrint } from "react-to-print";
import { ChevronUp, ChevronDown, Minus, Plus } from "lucide-react";
import { storage } from "./utils";
import {
  A4_PAGE_HEIGHT_PX,
  A4_PAGE_WIDTH_PX,
  RESUME_FONT_FAMILY,
} from "./constants/layout";

const STORAGE_KEY = "resume_data";
const MIN_PREVIEW_SCALE = 0.6;
const MAX_PREVIEW_SCALE = 1.0;
const PREVIEW_SCALE_STEP = 0.1;
const PREVIEW_PAGE_HEIGHT = A4_PAGE_HEIGHT_PX;
const PREVIEW_PAGE_WIDTH = A4_PAGE_WIDTH_PX;
const PREVIEW_PAGE_TOP_PADDING = 48;
const PAGE_OVERFLOW_EPSILON = 1;
const PRINT_PAGE_STYLE = `
  @page {
    margin: 0;
    size: A4;
  }

  html,
  body {
    background: #fff !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-family: ${RESUME_FONT_FAMILY};
  }

  [data-resume-preview="true"],
  [data-resume-preview="true"] * {
    font-family: ${RESUME_FONT_FAMILY} !important;
  }
`;

function getRelativeOffsetTop(element: HTMLElement, ancestor: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;

  while (current && current !== ancestor) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return top;
}

function getPageCapacity(pageNumber: number) {
  return pageNumber === 1
    ? PREVIEW_PAGE_HEIGHT
    : PREVIEW_PAGE_HEIGHT - PREVIEW_PAGE_TOP_PADDING;
}

function getPreviewPageOffsets(root: HTMLDivElement) {
  const blocks = Array.from(
    root.querySelectorAll<HTMLElement>("[data-page-block]")
  );

  const totalHeight = root.scrollHeight;
  if (blocks.length === 0) {
    const offsets = [0];
    let currentPageStart = 0;

    while (
      totalHeight - currentPageStart >
      getPageCapacity(offsets.length) + PAGE_OVERFLOW_EPSILON
    ) {
      currentPageStart += getPageCapacity(offsets.length);
      offsets.push(currentPageStart);
    }

    return offsets;
  }

  const offsets = [0];
  let currentPageStart = 0;
  let pendingHeadingTop: number | null = null;

  const pushOffset = (nextOffset: number) => {
    if (nextOffset <= currentPageStart) {
      return;
    }

    offsets.push(nextOffset);
    currentPageStart = nextOffset;
  };

  for (const block of blocks) {
    const blockTop = getRelativeOffsetTop(block, root);
    const blockHeight = block.offsetHeight;
    const blockBottom = blockTop + blockHeight;
    const blockType = block.dataset.pageBlock;
    const currentPageCapacity = getPageCapacity(offsets.length);

    if (blockType === "heading") {
      pendingHeadingTop = blockTop;
      continue;
    }

    if (
      blockHeight < currentPageCapacity &&
      blockBottom - currentPageStart > currentPageCapacity
    ) {
      pushOffset(
        pendingHeadingTop !== null && pendingHeadingTop > currentPageStart
          ? pendingHeadingTop
          : blockTop
      );
    }

    pendingHeadingTop = null;
  }

  while (
    totalHeight - currentPageStart >
    getPageCapacity(offsets.length) + PAGE_OVERFLOW_EPSILON
  ) {
    pushOffset(currentPageStart + getPageCapacity(offsets.length));
  }

  return offsets;
}

function getPageMetrics(
  pageOffsets: number[],
  contentHeight: number,
  pageNumber: number
) {
  const pageStart = pageOffsets[pageNumber - 1] ?? 0;
  const pageEnd = pageOffsets[pageNumber] ?? contentHeight;
  const pageTopPadding = pageNumber > 1 ? PREVIEW_PAGE_TOP_PADDING : 0;
  const pageCapacity = getPageCapacity(pageNumber);
  const pageContentHeight = Math.max(
    0,
    Math.min(pageCapacity, pageEnd - pageStart)
  );

  return {
    pageStart,
    pageTopPadding,
    pageContentHeight,
  };
}

function App() {
  const [data, setData] = useState<ResumeData>(() => {
    const savedData = storage.get<ResumeData>(STORAGE_KEY, defaultResumeData);
    return {
      ...defaultResumeData,
      ...savedData,
      theme: { ...defaultResumeData.theme, ...savedData.theme },
      visible: { ...defaultResumeData.visible, ...savedData.visible },
      sectionTitles: {
        ...defaultResumeData.sectionTitles,
        ...savedData.sectionTitles,
      },
      sectionOrder: savedData.sectionOrder || defaultResumeData.sectionOrder,
    };
  });
  const measureRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageOffsets, setPageOffsets] = useState([0]);
  const [contentHeight, setContentHeight] = useState(PREVIEW_PAGE_HEIGHT);
  const [previewScale, setPreviewScale] = useState(1);
  const totalPages = pageOffsets.length;
  const activePage = Math.min(currentPage, totalPages);
  const {
    pageStart: activePageStart,
    pageTopPadding: activePageTopPadding,
    pageContentHeight: activePageContentHeight,
  } = getPageMetrics(pageOffsets, contentHeight, activePage);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${data.basicInfo.name}_Resume`,
    onBeforePrint: async () => {
      if ("fonts" in document) {
        await document.fonts.ready;
      }
    },
    pageStyle: PRINT_PAGE_STYLE,
  });

  useEffect(() => {
    storage.set(STORAGE_KEY, data);
  }, [data]);

  useEffect(() => {
    if (!measureRef.current) {
      return;
    }

    const previewNode = measureRef.current;
    const observedNodes = [
      previewNode,
      ...Array.from(
        previewNode.querySelectorAll<HTMLElement>("[data-page-block]")
      ),
    ];
    const updatePageOffsets = () => {
      setContentHeight(previewNode.scrollHeight);
      setPageOffsets(getPreviewPageOffsets(previewNode));
    };
    const observer = new ResizeObserver(() => {
      updatePageOffsets();
    });

    observedNodes.forEach((node) => observer.observe(node));
    updatePageOffsets();

    let isMounted = true;

    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        if (isMounted) {
          updatePageOffsets();
        }
      });
    }

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [data]);

  const handleScaleChange = (direction: "in" | "out") => {
    setPreviewScale((prev) => {
      if (direction === "in") {
        return Math.min(
          MAX_PREVIEW_SCALE,
          Math.round((prev + PREVIEW_SCALE_STEP) * 10) / 10
        );
      }

      return Math.max(
        MIN_PREVIEW_SCALE,
        Math.round((prev - PREVIEW_SCALE_STEP) * 10) / 10
      );
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      <div className="w-[430px] xl:w-[470px] flex-shrink-0 h-full overflow-y-auto z-10 px-4 py-4">
        <Sidebar data={data} setData={setData} onExport={handlePrint} />
      </div>

      <div className="flex-1 flex justify-center items-start overflow-y-auto px-8 py-10 relative">
        <div className="relative flex items-start gap-6">
          <div className="sticky top-10 flex flex-col items-center gap-4 rounded-[28px] border border-white/70 bg-white/85 p-3 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleScaleChange("in")}
                disabled={previewScale === MAX_PREVIEW_SCALE}
                className="rounded-full border border-transparent p-2 text-primary transition-colors hover:border-primary/10 hover:bg-primary/10 disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent"
                title="放大"
              >
                <Plus size={20} />
              </button>
              <div className="min-w-[58px] rounded-2xl bg-primary/6 px-3 py-2 text-center text-xs font-bold text-slate-700">
                {Math.round(previewScale * 100)}%
              </div>
              <button
                onClick={() => handleScaleChange("out")}
                disabled={previewScale === MIN_PREVIEW_SCALE}
                className="rounded-full border border-transparent p-2 text-primary transition-colors hover:border-primary/10 hover:bg-primary/10 disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent"
                title="缩小"
              >
                <Minus size={20} />
              </button>
            </div>

            {totalPages > 1 && (
              <>
                <div className="h-px w-full bg-slate-200" />
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={activePage === 1}
                  className="rounded-full border border-transparent p-2 text-primary transition-colors hover:border-primary/10 hover:bg-primary/10 disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent"
                  title="上一页"
                >
                  <ChevronUp size={24} />
                </button>
                <div className="flex flex-col items-center space-y-1 font-bold text-slate-700">
                  <span className="text-lg">{activePage}</span>
                  <span className="w-full border-t border-slate-200 pt-1 text-center text-xs text-slate-400">
                    {totalPages}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={activePage === totalPages}
                  className="rounded-full border border-transparent p-2 text-primary transition-colors hover:border-primary/10 hover:bg-primary/10 disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent"
                  title="下一页"
                >
                  <ChevronDown size={24} />
                </button>
              </>
            )}
          </div>

          <div
            className="transform-gpu origin-top flex-shrink-0 transition-transform duration-200"
            style={{
              width: `${PREVIEW_PAGE_WIDTH}px`,
              transform: `scale(${previewScale})`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_32px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70"
              style={{
                width: `${PREVIEW_PAGE_WIDTH}px`,
                height: `${PREVIEW_PAGE_HEIGHT}px`,
              }}
            >
              {activePageTopPadding > 0 && (
                <div style={{ height: `${activePageTopPadding}px` }} />
              )}
              <div
                className="overflow-hidden"
                style={{ height: `${activePageContentHeight}px` }}
              >
                <div
                  style={{
                    transform: `translateY(-${activePageStart}px)`,
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Preview data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed left-[-10000px] top-0 invisible">
        <Preview data={data} ref={measureRef} />
      </div>

      <div className="pointer-events-none fixed left-[-10000px] top-0 opacity-0">
        <div ref={printRef}>
          {pageOffsets.map((_, index) => {
            const pageNumber = index + 1;
            const { pageStart, pageTopPadding, pageContentHeight } =
              getPageMetrics(pageOffsets, contentHeight, pageNumber);

            return (
              <div
                key={pageNumber}
                className="relative overflow-hidden bg-white"
                style={{
                  width: `${PREVIEW_PAGE_WIDTH}px`,
                  height: `${PREVIEW_PAGE_HEIGHT}px`,
                  breakAfter: pageNumber === totalPages ? "auto" : "page",
                  pageBreakAfter: pageNumber === totalPages ? "auto" : "always",
                }}
              >
                {pageTopPadding > 0 && (
                  <div style={{ height: `${pageTopPadding}px` }} />
                )}
                <div
                  className="overflow-hidden"
                  style={{ height: `${pageContentHeight}px` }}
                >
                  <div
                    style={{
                      transform: `translateY(-${pageStart}px)`,
                    }}
                  >
                    <Preview data={data} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
