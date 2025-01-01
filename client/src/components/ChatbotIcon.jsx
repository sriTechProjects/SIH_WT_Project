import React, { useState } from "react";

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg cursor-pointer z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white shadow-lg border rounded-lg p-4 z-50">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="h-64 overflow-y-auto mt-2">
            {/* Chatbot content will go here */}
            <p className="text-gray-500">
              Hello! How can I assist you today?
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotIcon;