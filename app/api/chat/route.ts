import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    await connectDB();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const { message, chatId } = await req.json();

    let currentChatId = chatId;

    // Create chat session if new
    if (!currentChatId) {
      const newChat = await Chat.create({
        title: message.substring(0, 20),
      });

      currentChatId = newChat._id;
    }

    // Save user message
    await Message.create({
      chatId: currentChatId,
      sender: "user",
      text: message,
    });

    const previousMessages = await Message.find({
      chatId: currentChatId,
    })
      .sort({ timestamp: 1 })
      .limit(10);

    // Call Gemini
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
 
        contents: previousMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
}),
      }
    );

    const data = await geminiResponse.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I'm unable to respond right now. Please try again.";

    // Save bot message
    await Message.create({
      chatId: currentChatId,
      sender: "assistant",
      text: reply,
    });

    return NextResponse.json({
      reply,
      chatId: currentChatId,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Server error while processing chat." },
      { status: 500 }
    );
  }
}