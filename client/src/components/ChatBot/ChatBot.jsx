import { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/chatbot/query",
        { message: input },
        { withCredentials: true }
      );

      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error.message);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4">
          <img
            onClick={toggleChat}
            className="w-12 h-12 shadow-md border border-slate-100 rounded-full cursor-pointer"
            src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
            alt="Chatbot Icon"
          />
        </div>
      )}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-[450px] bg-white shadow-md border rounded-lg flex flex-col">
          <div className="flex justify-between items-center p-2 border-b">
            <h3 className="text-lg font-semibold">Chatbot</h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              className="flex-grow px-3 py-2 border rounded-lg"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
