"use client";

import { useState } from "react";

type InputAreaProps = {
  onSend: (message: string) => void;
};

export default function InputArea({ onSend }: InputAreaProps) {
  const [input, setInput] = useState("");
 
  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="flex gap-3 max-w-3xl mx-auto bg-white border-gray-300 rounded-xl px-3 py-2 shadow-sm">
      <input
        type="text"
        className="flex-1 border rounded-lg px-3 py-2 outline-none"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      <button
        className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-400"
        onClick={handleSend}
        disabled={!input.trim()}
      >
        Send
      </button>
    </div>
  );
}