import React, { useState, useEffect } from "react";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "./ChatMessage";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<
    { question: string; answer: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const LOCAL_STORAGE_KEY = "chat-history";

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (isOpen && history.length === 0) {
      const greeting = navigator.language.startsWith("he")
        ? "היי! רוצה להכיר את הניסיון המקצועי שלי טוב יותר? מוזמן לשאול שאלה 😊"
        : "Hi there! Curious about my professional experience? Feel free to ask me anything 😊";

      setHistory([{ question: "", answer: greeting }]);
    }
  }, [isOpen]);

  async function ask() {
    if (!question.trim()) return;
    setLoading(true);
    setError("");

    const formattedMessages = history
      .filter((m) => m.question || m.answer)
      .flatMap((m) => [
        m.question ? { role: "user", content: m.question } : null,
        m.answer ? { role: "assistant", content: m.answer } : null,
      ])
      .filter(Boolean);

    formattedMessages.push({ role: "user", content: question });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: formattedMessages }),
      });

      const data = await res.json();
      setHistory([...history, { question, answer: data.answer }]);
      setQuestion("");
    } catch (error) {
      console.error("Error asking question:", error);
      setHistory([
        ...history,
        { question, answer: "שגיאה. נסי שוב בעוד רגע." },
      ]);
      setError("תקלה בשליחה. נסי שוב בעוד רגע.");
    } finally {
      setLoading(false);
    }
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 text-white p-4 rounded-full shadow-lg"
        style={{ backgroundColor: "#d946ef" }}
        whileHover={{ scale: 1.1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => setIsOpen(true)}
      >
        <SparklesIcon className="h-7 w-7" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed bottom-0 right-0 w-full max-w-sm h-[70vh] bg-slate-200 border border-slate-700 rounded-t-2xl shadow-xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-slate-900 font-semibold text-lg">
                Tech, skills, story – just ask
              </h3>
              <div className="flex gap-2 items-center">
                {history.length > 0 && (
                  <button
                    className="text-xs text-slate-400 hover:text-pink-500"
                    onClick={clearHistory}
                  >
                    Clear
                  </button>
                )}
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-slate-400 hover:text-slate-200" />
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
              {history.map((item, idx) => (
                <div key={idx}>
                  {item.question && (
                    <>
                      <div className="whitespace-pre-line">
                        <ChatMessage
                          message={item.question}
                          type="question"
                          direction="right"
                        />
                      </div>
                    </>
                  )}
                  <div className="whitespace-pre-line">
                    <ChatMessage
                      message={item.answer}
                      type="answer"
                      direction="left"
                    />
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex space-x-1 pt-1 pl-1">
                  <span className="bg-green-400 rounded-full h-2 w-2 animate-bounce [animation-delay:.1s]"></span>
                  <span className="bg-green-400 rounded-full h-2 w-2 animate-bounce [animation-delay:.2s]"></span>
                  <span className="bg-green-400 rounded-full h-2 w-2 animate-bounce [animation-delay:.3s]"></span>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about my experience"
                  className="flex-1 bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  onKeyDown={(e) => e.key === "Enter" && ask()}
                  disabled={loading}
                />
                <button
                  onClick={ask}
                  disabled={loading}
                  className={`${
                    loading ? "bg-pink-400" : "bg-pink-600 hover:bg-pink-700"
                  } text-white px-4 py-2 rounded transition`}
                >
                  {loading ? "..." : "Ask"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
