"use client";

import { useEffect, useState } from "react";

type Chat = {
  _id: string;
  title: string;
};

export default function Sidebar() {
  const [chats, setChats] = useState<Chat[]>([]);

  const loadChats = async () => {
    const res = await fetch("/api/chat/history");
    const data = await res.json();
    setChats(data);
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
  <div className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
    
    {/* Header */}
    <div className="p-5 text-lg font-semibold text-gray-800">
      Metawurks AI
    </div>

    {/* New Chat Button */}
    <button
      className="mx-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium shadow-sm transition"
      onClick={() => window.location.reload()}
    >
      + New Chat
    </button>

    {/* Chat History */}
    <div className="flex-1 overflow-y-auto px-4 mt-6 space-y-2">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="p-2 rounded-md hover:bg-gray-200 cursor-pointer text-sm text-gray-700 transition"
        >
          {chat.title}
        </div>
      ))}
    </div>
  </div>
);
}