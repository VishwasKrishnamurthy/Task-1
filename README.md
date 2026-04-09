# Chat UI Interface – Metawurks AI Internship Task-1

## Project Description

This project is a Chat UI Interface built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.
It simulates an AI chatbot interface with a mock backend API.

The application allows users to send messages and receive automated responses with features like typing indicator, auto-scrolling, dark mode toggle, and clear chat functionality.

---

## How to Run Locally

Clone the repository:

```bash
git clone https://github.com/VishwasKrishnamurthy/Task-1.git
```

Navigate to the project folder:

```bash
cd Task-1
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## Deployed Application Link

Live application:

https://task-1-psi-ebon.vercel.app

---

## Challenges Faced and Solutions

**1. Managing dynamic chat messages**

Challenge:
Updating both user and bot messages dynamically in the chat window.

Solution:
Used React `useState` to store messages and update them whenever a new message is sent or received.

---

**2. Implementing typing indicator**

Challenge:
Showing assistant typing before response appears.

Solution:
Used an `isTyping` state variable and displayed a temporary typing message while waiting for API response.

---

**3. Auto-scrolling to latest message**

Challenge:
Ensuring latest messages are always visible.

Solution:
Used `useRef` with `useEffect` to scroll automatically when messages update.

---

**4. Creating mock backend responses**

Challenge:
Simulating chatbot replies without integrating a real AI model.

Solution:
Implemented a mock API route using Next.js route handlers inside `/api/chat`.
