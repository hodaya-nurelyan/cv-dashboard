import React, { useState } from "react";

export default function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function ask() {
    const res = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  }

  return (
    <div className="border rounded p-4 mt-6 shadow bg-white">
      <h3 className="text-xl font-semibold mb-2">🤖 שאל אותי עליי</h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="מה את יודעת ב-React?"
        className="border p-2 w-full rounded mb-2"
      />
      <button
        onClick={ask}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        שלח
      </button>
      {answer && (
        <div className="mt-4 bg-gray-50 border rounded p-3 text-gray-800">
          <strong>תשובה:</strong> {answer}
        </div>
      )}
    </div>
  );
}
