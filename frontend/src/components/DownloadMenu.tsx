import React, { useState } from "react";
import { Download, FileText, FileDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function DownloadMenu() {
  const [open, setOpen] = useState(false);
  const { darkMode } = useTheme();
  const downloadCV = (format) => {
    const fileUrls = {
      pdf: "/cv/hodaya-resume.pdf",
      docx: "/cv/hodaya-resume.docx",
    };
    const url = fileUrls[format];
    const link = document.createElement("a");
    link.href = url;
    link.download = `Hodaya-CV.${format}`;
    link.click();
  };

  return (
    <div className="relative inline-block">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`${darkMode ? " text-slate-200" : " text-slate-900"} inline-flex items-center font-medium text-base  hover:text-magenta-custom transition-colors`}
        title="Download My CV"
      >
        Download My CV
        <Download className="w-4 h-4 ml-2 transition-transform duration-300" />
      </button>

      {/* Download Buttons */}
      <div
        className={`absolute top-1/2 left-full ml-3 transform -translate-y-1/2 flex  gap-2 transition-all duration-300 ${open
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-2 pointer-events-none"
          }`}
      >
        <button
          onClick={() => downloadCV("pdf")}
          className="flex items-center rounded-full bg-teal-400/10 px-3 py-3 text-xs font-medium leading-5 text-magenta-custom transition "
          title="Download PDF"
        >
          <FileDown className="w-4 h-4" />
        </button>
        <button
          onClick={() => downloadCV("docx")}
          className="flex items-center rounded-full bg-teal-400/10 px-3 py-3 text-xs font-medium leading-5 text-magenta-custom transition "
          title="Download DOCX"
        >
          <FileText className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
