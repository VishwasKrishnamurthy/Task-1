import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const text = message.toLowerCase().trim();

  // simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  let reply = "";

  if (["hi", "hello", "hlo", "hey"].includes(text)) {
    reply = "Hello! How can I assist you today?";
  } 
  else if (text.includes("good morning")) {
    reply = "Good morning! Hope you have a productive day ahead.";
  } 
  else if (text.includes("good afternoon")) {
    reply = "Good afternoon! How can I help you?";
  } 
  else if (text.includes("good evening")) {
    reply = "Good evening! What would you like to know?";
  } 
  else if (text.includes("how are you")) {
    reply = "I'm doing great! Thanks for asking 😊";
  } 
  else if (text.includes("bye")) {
    reply = "Goodbye! Have a great day!";
  } 
  else {
    const fallbackResponses = [
      "That's interesting. Tell me more.",
      "I understand. Could you explain further?",
      "Let me think about that.",
      "Thanks for sharing that!",
      "Can you provide more details?"
    ];

    reply =
      fallbackResponses[
        Math.floor(Math.random() * fallbackResponses.length)
      ];
  }

  return NextResponse.json({ reply });
}