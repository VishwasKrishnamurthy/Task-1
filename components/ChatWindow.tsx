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
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
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
        body: JSON.stringify({
          message: text,
          chatId: currentChatId,
        }),
      });
        
      const data = await response.json();

      if (!currentChatId) {
        setCurrentChatId(data.chatId);  
      }
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
    <div className="flex flex-col h-full w-full border-l">
      {/* Header */}
     <div
    className={`p-4 border-b flex items-center justify-between ${
      darkMode
           ? "bg-[#020617] border-gray-800"
           : "bg-white border-gray-200"
       }`}
      >

  {/* Title */}
    <h1 className={`text-lg font-semibold tracking-wide ${
  darkMode ? "text-gray-200" : "text-gray-800"
}`}>
      Metawurks Chatbot
    </h1>

  {/* Buttons */}
  <div className="flex gap-3 ml-6">
    <button
      onClick={() => {
            setDarkMode(prev => !prev);
            document.documentElement.classList.toggle("dark");
        }}
      className="text-sm bg-gray-800 text-gray-200 px-4 py-1.5 rounded-md hover:bg-gray-700 transition"
      >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>

    <button
      onClick={clearChat}
      className={`text-sm px-4 py-1.5 rounded-md ${
  darkMode
    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
}`}
    >
      Clear Chat
    </button>
  </div>

</div>

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-2 ${
          darkMode ? "bg-[#020617]" : "bg-gray-100" 
        }`}
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500 text-lg">
            Start a conversation 
          </div>
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