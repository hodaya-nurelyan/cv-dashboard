import React from "react";

function cleanText(text: string) {
  // מסיר את בלוק ה-JSON עם הפונקציה
  return text.replace(/```json[\s\S]*?```/, "").trim();
}

export function ChatMessage({
  message,
  type,
  direction,
}: {
  message: string;
  type: string;
  direction: "left" | "right";
}) {
  const isHebrew = /[\u0590-\u05FF]/.test(message);
  const textDirection = direction === "right" ? "rtl" : "ltr";
  const directionClass = direction === "right" ? "right" : "left";
  const color = type == "question" ? "teal-400/10" : "slate-900";

  const triangleDirection =
    direction === "right"
      ? `-right-2 border-l-8 border-l-${color} border-r-0 `
      : `-left-2 border-r-8 border-r-${color} border-l-0`;

  <div className="absolute top-3 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-pink-500" />;

  const triangleClassName = `absolute top-3 ${triangleDirection} w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent `;

  const hasDownloadCall = message.includes(
    '"function_call": "offer_resume_download"'
  );

  // טקסט מותאם לשפה
  const downloadText = isHebrew
    ? "📄 להורדת קורות החיים שלי"
    : "📄 Download my resume";

  return (
    <div className={` text-${directionClass}`} dir={textDirection}>
      {/* תוכן ההודעה ללא בלוק ה-JSON */}

      {!hasDownloadCall && (
        <div
          className={`flex items-start space-x-2 py-2 ${
            direction === "right" ? "space-x-reverse" : ""
          }`}
          dir={textDirection}
        >
          {type === "answer" && (
            <img
              src="/hodaya.png" // החלף לשם הקובץ שלך
              alt="Hodaya"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}

          <div
            className={`relative  rounded-xl px-4 py-2 max-w-xs text-${directionClass}   ${
              type == "question"
                ? "text-slate-900  bg-teal-400/10"
                : "bg-slate-900"
            }`}
          >
            {/* חץ שמאלה (כמו bubble) */}
            <div className={triangleClassName} />
            <div
              className={`${
                isHebrew ? "dir-rtl text-right" : "dir-ltr text-left"
              } `}
              dangerouslySetInnerHTML={{ __html: cleanText(message) }}
            />
          </div>
        </div>
      )}

      {/* כפתור להורדת קו״ח */}
      {hasDownloadCall && (
        <a
          href="/cv/hodaya-resume.pdf"
          download
          className="inline-block mt-3 px-4 py-2 bg-pink-600  rounded-xl shadow-lg hover:bg-pink-700 hover:scale-105 transition-transform duration-200"
        >
          {downloadText}
        </a>
      )}
    </div>
  );
}
