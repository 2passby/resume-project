import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Preview from "./components/Preview";
import type { ResumeData } from "./types";
import { defaultResumeData } from "./types";
import { useReactToPrint } from "react-to-print";
import { ChevronUp, ChevronDown } from "lucide-react";

function App() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const componentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.basicInfo.name}_Resume`,
  });

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

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[450px] bg-white border-r shadow-lg flex-shrink-0 flex flex-col h-full overflow-y-auto z-10">
        <Sidebar data={data} setData={setData} onExport={handlePrint} />
      </div>

      {/* Right Preview */}
      <div className="flex-1 flex justify-center items-start overflow-y-auto p-8 relative bg-gray-100">
        <div className="relative flex items-start gap-6 mt-8">
          {/* Pagination Controls - Left Side */}
          {totalPages > 1 && (
            <div className="sticky top-8 flex flex-col items-center gap-4 bg-white p-3 rounded-2xl shadow-md z-10 border border-gray-200">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent text-primary"
                title="上一页"
              >
                <ChevronUp size={24} />
              </button>
              <div className="flex flex-col items-center font-bold text-gray-700 space-y-1">
                <span className="text-lg">{currentPage}</span>
                <span className="text-xs text-gray-400 border-t border-gray-300 w-full text-center pt-1">
                  {totalPages}
                </span>
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent text-primary"
                title="下一页"
              >
                <ChevronDown size={24} />
              </button>
            </div>
          )}

          {/* Preview Container */}
          <div className="w-[800px] transform-gpu scale-[0.9] origin-top flex-shrink-0">
            <div className="h-[1131px] w-[800px] overflow-hidden shadow-2xl bg-white relative ring-1 ring-gray-200">
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
