import React, { useState, useEffect, useRef } from "react";
import { SparklesIcon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
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
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  const LOCAL_STORAGE_KEY = "chat-history";

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, loading]);


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

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // מספיק זמן אחרי האנימציה

      return () => clearTimeout(timer);
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
      inputRef.current?.focus();
    }
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <>
      {/* Floating Button */}
      {/* <motion.button
        className="fixed bottom-6 right-6 z-50 text-white p-4 rounded-full shadow-lg"
        style={{ backgroundColor: "#ec4899" }}
        whileHover={{ scale: 1.1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => setIsOpen(true)}
      >
        <SparklesIcon className="h-7 w-7" />
      </motion.button> */}


      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 px-4 py-2 text-sm font-medium text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => setIsOpen(true)}
      >
        <SparklesIcon className="h-7 w-7" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Z"
            clipRule="evenodd"
          />
        </svg>
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
            className="fixed bottom-0 right-0 w-full max-w-sm h-[70vh] bg-stone-100 border border-slate-300  rounded-t-2xl shadow-xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="relative p-4 border-b border-slate-300 text-center">
              <h3 className="text-slate-900 font-semibold text-lg">
                Tech, skills, story – just ask
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <ChevronDownIcon className="h-6 w-6 text-slate-400 hover:text-slate-200" />
              </button>
            </div>


            {/* Chat History */}
            <div className="flex-1 overflow-y-auto   py-2 ">
              {history.map((item, idx) => (
                <div key={idx}>
                  {item.question && (
                    <>
                      <div className="whitespace-pre-line px-4">
                        <ChatMessage
                          message={item.question}
                          type="question"
                          direction="right"
                        />
                      </div>
                    </>
                  )}
                  <div className="whitespace-pre-line px-2">
                    <ChatMessage
                      message={item.answer}
                      type="answer"
                      direction="left"
                    />
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex space-x-1 px-4 pt-1 ">
                  <span className="bg-slate-900 rounded-full h-2 w-2 animate-bounce [animation-delay:.1s]"></span>
                  <span className="bg-slate-900 rounded-full h-2 w-2 animate-bounce [animation-delay:.2s]"></span>
                  <span className="bg-slate-900 rounded-full h-2 w-2 animate-bounce [animation-delay:.3s]"></span>
                </div>
              )}
              <div ref={bottomRef} />

              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-300 ">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about my experience"
                  className="flex-1 bg-white text-slate-800 placeholder-slate-500 border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  onKeyDown={(e) => e.key === 'Enter' && ask()}
                />

                <button
                  onClick={ask}
                  disabled={loading}
                  className={`${loading ? "bg-pink-400" : "bg-gradient-brand hover:bg-pink-700 font-bold"
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
