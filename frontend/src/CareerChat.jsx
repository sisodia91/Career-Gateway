
import { useState } from "react";
import "./CareerChat.css";
import ReactMarkdown from "react-markdown";

const suggestions = [
  "Explore AI & Machine Learning careers",
  "Help me choose a career",
  "Find scholarships for college",
];

export default function CareerChat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi there! 👋 I'm your Career Gateway guide. Ask me about careers, courses or scholarships!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text = input) {
    const question = text.trim();

    if (!question || loading) return;

    setInput("");
    setLoading(true);

    // Show the user's message immediately.
    setMessages((previous) => [
      ...previous,
      { role: "user", text: question },
    ]);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "The AI assistant could not answer your question."
        );
      }

      if (!data.reply) {
        throw new Error("The backend returned an empty reply.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: data.reply },
      ]);
    } catch (error) {
      console.error("Career Gateway chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: `Sorry, I couldn't connect to the AI assistant. ${error.message} Please check that the backend is running and try again.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <section className="career-chat" aria-label="Career assistant chat">
      <header className="chat-header">
        <div className="chat-avatar">✦</div>

        <div className="chat-heading">
          <h2>Career Gateway AI</h2>
          <p>Your personal career guide</p>
        </div>

        <button
          className="chat-close"
          onClick={onClose}
          aria-label="Close chat"
        >
          ×
        </button>
      </header>

      <div className="chat-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div
            className={`chat-message ${message.role}`}
            key={`${index}-${message.role}`}
          >
          <div className="chat-message-content">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message assistant">
            Thinking...
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="chat-suggestions">
          <p>TRY ASKING</p>

          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              disabled={loading}
              onClick={() => sendMessage(suggestion)}
            >
              {suggestion} ↗
            </button>
          ))}
        </div>
      )}

      <form className="chat-input-area" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about your career..."
          aria-label="Your career question"
          disabled={loading}
        />

        <button
          type="submit"
          aria-label="Send message"
          disabled={loading || !input.trim()}
        >
          ➤
        </button>
      </form>
    </section>
  );
}
