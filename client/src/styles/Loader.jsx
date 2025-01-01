import React, { useEffect, useState } from "react";

const Loader = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = ["Creating", "Fetching", "Loading"];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => prevIndex + 1);
    }, 5000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="text-center animate-pulse">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>

        {/* Changing Message */}
        <p className="mt-4 text-white text-xl font-semibold animate-heartbeat">
          {messages[messageIndex]}...
        </p>
      </div>
    </div>
  );
};

export default Loader;
