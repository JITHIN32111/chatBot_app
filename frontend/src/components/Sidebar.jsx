import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import img from "../assets/img3.png";
import Typewriter from 'typewriter-effect'
import UseSocketReply from "../hooks/useSocketReply";
import UseCopyTo from "../hooks/useCopyTo";
const socket = io("http://localhost:5000");

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleLiClick = async (id) => {
    try {
      const selectedQuestion = data.find((msg) => msg._id === id);
      setConversation((prevConversation) => [
        ...prevConversation,
        { content: selectedQuestion.question, sender: "user" },
      ]);

      setConversation((prevConversation) => [
        ...prevConversation,
        { content: selectedQuestion.content, sender: "bot" },
      ]);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/getData`
        );
        console.log(response.data.data);

        // Make sure response.data.data is an array before setting it in the state

        setData([...response.data.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [conversation]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const sendMessage = () => {
    const userMessage = { content: inputMessage, sender: "user" };
    setConversation([...conversation, userMessage]);
    setLoading(true);
    socket.emit("message", { message: inputMessage });
    setInputMessage("");
  };

    const { copyToClipboard } = UseCopyTo();
    UseSocketReply(socket, setConversation, setLoading, conversation);
  // useEffect(() => {
  //   socket.on("reply", (data) => {
  //     const botReply = { content: data.reply, sender: "bot" };
  //     setConversation([...conversation, botReply]);
  //     setLoading(false);
  //   });
  // }, [conversation]);

  return (
    <div>
      <ToastContainer />

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed h-screen bg-gray-800 text-white mt-6 rounded-lg   w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
   
        {/* Sidebar content */}
        <div className="flex flex-row mt-8 justify-between">
          <img className="w-14 ml-2  " src={img} alt="" />
          <h1 className=" font-bold  my-auto mr-24 text-gray-100  text-2xl">
            chatBot
          </h1>
        </div>
        <ul className="p-4 mt-6 list-disc ml-2">
          {data.map((msg) => (
            <li key={msg._id} className="mb-2">
              <a
                href="#"
                className="hover:text-gray-300"
                onClick={() => handleLiClick(msg._id)}
              >
                
                {msg.question}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div
        className={`ml-0 md:ml-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-64" : "translate-x-0"
        }`}
      >
        {/* Add your main content here */}
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto mb-4 flex-shrink-0 rounded-2xl bg-gray-100 ">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="col-start-6 col-end-13 p-3  rounded-lg">
                   {conversation.length? '': <div  className="flex flex-col justify-center font-sans items-center">
                     <h1 className="text-4xl font-bold my-8 text-black ">
                     <Typewriter
  onInit={(typewriter) => {
    typewriter
      .typeString("Welcome to chatBot")
      .pauseFor(2000)
      .start(); // Don't forget to start the typewriter
  }}
/></h1>
                     <h1 className="text-xl ">How can i help you ?</h1>
                    </div>}
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
                <div className="flex-grow ml-4 ">
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
            </div>
          </div>
        </div>
      </div>

      <div
        id="open-btn"
        className="block md:hidden fixed text-white text-2xl cursor-pointer top-4 left-4"
        onClick={toggleSidebar}
      >
        &#x02261;
      </div>
    </div>
  );
};

export default Sidebar;
