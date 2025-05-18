import { useState } from "react";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate assistant reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "That's an interesting question!" },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Container */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xl px-4 py-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-700 text-white self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-600 p-4 bg-[#0d1117] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 p-2 rounded bg-gray-800 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}
