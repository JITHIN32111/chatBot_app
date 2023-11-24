// ChatArea.js
import React from "react";
import Typewriter from "typewriter-effect";
import { FaRegCopy } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

const ChatArea = ({ conversation,inputMessage,setInputMessage,sendMessage, loading, copyToClipboard }) => {
  return (
    <div className="ml-0 md:ml-64 transition-transform duration-300">
      {/* ChatArea content */}
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto mb-4 flex-shrink-0 rounded-2xl bg-gray-100 ">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    {conversation.length ? (
                      ""
                    ) : (
                      <div className="flex flex-col justify-center font-sans items-center">
                        <h1 className="sm:text-4xl text-2xl font-bold my-8 text-black ">
                          <Typewriter
                            onInit={(typewriter) => {
                              typewriter
                                .typeString("Welcome to chatBot")
                                .pauseFor(2000)
                                .start();
                            }}
                          />
                        </h1>
                        <h1 className="text-xl ">
                          <Typewriter
                            onInit={(typewriter) => {
                              typewriter
                                .typeString("How can I help you?")
                                .pauseFor(2000)
                                .start();
                            }}
                          />
                        </h1>
                      </div>
                    )}
                    {conversation.map((msg, index) => (
                      <div
                        className="flex items-center mb-4 justify-start"
                        key={index}
                      >
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          {msg.sender === "user" ? "U" : "A"}
                        </div>
                        <div
                          className={`relative ml-3 text-sm py-2 px-4 shadow rounded-xl ${
                            msg.sender === "user"
                              ? "bg-blue-300"
                              : "bg-gray-100"
                          }`}
                        >
                          {" "}
                          <div>{msg.content}</div>
                          {msg.sender === "user" ? (
                            ""
                          ) : (
                            <>
                              <FaRegCopy
                                className=""
                                onClick={() => copyToClipboard(msg.content)}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {loading && (
                    <AiOutlineLoading className="animate-spin text-blue-500 ml-6" />
                  )}
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center"></div>
                  </div>
                </div>
              </div>
            </div>
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
                  }}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
