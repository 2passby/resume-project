import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Preview from "./components/Preview";
import type { ResumeData } from "./types";
import { defaultResumeData } from "./types";
import { useReactToPrint } from "react-to-print";
import { ChevronUp, ChevronDown, Minus, Plus } from "lucide-react";
import { storage } from "./utils";

const STORAGE_KEY = "resume_data";
const MIN_PREVIEW_SCALE = 0.6;
const MAX_PREVIEW_SCALE = 1.0;
const PREVIEW_SCALE_STEP = 0.1;
const PRINT_FONT_FAMILY =
  '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif';
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
    font-family: ${PRINT_FONT_FAMILY};
  }

  [data-resume-preview="true"],
  [data-resume-preview="true"] * {
    font-family: ${PRINT_FONT_FAMILY} !important;
  }
`;

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
  const componentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [previewScale, setPreviewScale] = useState(1);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
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
    if (!componentRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.target.scrollHeight;
        // A4 height is ~1131px. Add small buffer
        const pages = Math.max(1, Math.ceil((height - 10) / 1131));
        setTotalPages(pages);
        if (currentPage > pages) {
          setCurrentPage(pages);
        }
      }
    });

    observer.observe(componentRef.current);
    return () => observer.disconnect();
  }, [currentPage]);

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
                  disabled={currentPage === 1}
                  className="rounded-full border border-transparent p-2 text-primary transition-colors hover:border-primary/10 hover:bg-primary/10 disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent"
                  title="上一页"
                >
                  <ChevronUp size={24} />
                </button>
                <div className="flex flex-col items-center space-y-1 font-bold text-slate-700">
                  <span className="text-lg">{currentPage}</span>
                  <span className="w-full border-t border-slate-200 pt-1 text-center text-xs text-slate-400">
                    {totalPages}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-transparent p-2 text-primary transition-colors hover:border-primary/10 hover:bg-primary/10 disabled:opacity-50 disabled:hover:border-transparent disabled:hover:bg-transparent"
                  title="下一页"
                >
                  <ChevronDown size={24} />
                </button>
              </>
            )}
          </div>

          <div
            className="w-[800px] transform-gpu origin-top flex-shrink-0 transition-transform duration-200"
            style={{ transform: `scale(${previewScale})` }}
          >
            <div className="relative h-[1131px] w-[800px] overflow-hidden rounded-[28px] bg-white shadow-[0_32px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
              <div
                style={{
                  transform: `translateY(-${(currentPage - 1) * 1131}px)`,
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Preview data={data} ref={componentRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
