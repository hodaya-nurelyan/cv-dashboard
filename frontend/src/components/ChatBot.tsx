import React, { useState, useEffect } from "react";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<
    { question: string; answer: string }[]
  >([]);

  const LOCAL_STORAGE_KEY = "chat-history";

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  // Save history to localStorage on every change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  async function ask() {
    if (!question.trim()) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setHistory([...history, { question, answer: data.answer }]);
    setQuestion("");
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
            className="fixed bottom-0 right-0 w-full max-w-sm h-[70vh] bg-slate-900 border border-slate-700 rounded-t-2xl shadow-xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-slate-100 font-semibold text-lg">
                Tech, skills, story – just ask 😉
              </h3>
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-slate-400 hover:text-slate-200" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
              {history.map((item, idx) => (
                <div key={idx}>
                  <div className="text-pink-400 font-semibold">You:</div>
                  <div className="text-slate-200 mb-1">{item.question}</div>
                  <div className="text-green-400 font-semibold">Hodaya:</div>
                  <div className="text-slate-300 whitespace-pre-line">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What is your field?"
                  className="flex-1 bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  onKeyDown={(e) => e.key === "Enter" && ask()}
                />
                <button
                  onClick={ask}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded transition"
                >
                  Ask
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
