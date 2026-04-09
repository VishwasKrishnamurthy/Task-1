"use client";

import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import InputArea from "./InputArea";

type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content: text,
      role: "user" as const,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        role: "assistant" as const,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        content: "Something went wrong. Please try again.",
        role: "assistant" as const,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div
      className={`flex flex-col h-screen max-w-2xl mx-auto border rounded-lg shadow-lg ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
     <div className="p-4 border-b bg-blue-600 text-white flex items-center justify-between">

  {/* Title */}
  <h1 className="text-lg font-semibold pr-6">
    Metawurks Chatbot
  </h1>

  {/* Buttons */}
  <div className="flex gap-3 ml-6">
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-sm bg-white text-blue-600 px-4 py-1.5 rounded-md hover:bg-gray-100"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>

    <button
      onClick={clearChat}
      className="text-sm bg-white text-blue-600 px-4 py-1.5 rounded-md hover:bg-gray-100"
    >
      Clear Chat
    </button>
  </div>

</div>

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-2 ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">
            Start the conversation...
          </p>
        ) : (
          <>
            {messages.map((msg) => (
              <Message
                key={msg.id}
                content={msg.content}
                role={msg.role}
                timestamp={msg.timestamp}
              />
            ))}

            {isTyping && (
              <div className="text-gray-400 text-sm italic animate-pulse">
                Bot is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <InputArea onSend={handleSend} />
      </div>
    </div>
  );
}