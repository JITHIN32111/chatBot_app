// MessageInput.js
import React from "react";

const MessageInput = ({ inputMessage, setInputMessage, sendMessage }) => {
  return (
    <div className="flex m flex-row items-center h-16 rounded-xl bg-white w-full px-4 ">
      <div className="flex-grow ml-4">
        <div className="relative w-full mb-6">
          <input
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
        </div>
      </div>
      <div className="ml-4 mb-6">
        <button
          onClick={() => {
            sendMessage();
            setSubmit(true);
          }}
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
        >
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
