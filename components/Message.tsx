type MessageProps = {
  content: string;
  role: "user" | "assistant";
  timestamp: string;
};

export default function Message({ content, role, timestamp }: MessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-200"
        }`}
      >
        <p>{content}</p>
        <span className="block text-xs mt-1 opacity-70 text-right">
          {timestamp}
        </span>
      </div>
    </div>
  );
}