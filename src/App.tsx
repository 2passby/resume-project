import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Preview from "./components/Preview";
import type { ResumeData } from "./types";
import { defaultResumeData } from "./types";
import { useReactToPrint } from "react-to-print";

function App() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.basicInfo.name}_Resume`,
  });

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[450px] bg-white border-r shadow-lg flex-shrink-0 flex flex-col h-full overflow-y-auto">
        <Sidebar data={data} setData={setData} onExport={handlePrint} />
      </div>

      {/* Right Preview */}
      <div className="flex-1 flex justify-center overflow-y-auto p-8 relative">
        <div className="absolute inset-0 pointer-events-none flex justify-center">
          <div className="w-[800px] h-full" />
        </div>
        <div className="w-[800px] transform-gpu scale-[0.9] origin-top">
          <Preview data={data} ref={componentRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
