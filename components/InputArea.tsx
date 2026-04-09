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
    <div className="flex gap-2">
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
        className="bg-blue-600 text-white px-4 rounded-lg disabled:bg-gray-400"
        onClick={handleSend}
        disabled={!input.trim()}
      >
        Send
      </button>
    </div>
  );
}