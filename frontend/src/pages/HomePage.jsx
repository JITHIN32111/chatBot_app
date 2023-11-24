// HomePage.js
import React, { useState } from "react";
import io from "socket.io-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewSidebar from "../components/NewSidebar";
import ChatArea from "../components/ChatArea";
import MessageInput from "../components/MessageInput";
import UseSocketReply from "../hooks/useSocketReply";
import useFetchData from "../hooks/UseFetchData";
import UseSelectedQuestions from "../hooks/UseSelectedQuestions";
import UseCopyTo from "../hooks/useCopyTo";

const socket = io("http://localhost:5000");

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const { data } = useFetchData(
    "http://localhost:5000/api/user/getData",
    conversation
  );
  const { handleLiClick } = UseSelectedQuestions(
    data,
    setConversation,
    setIsSidebarOpen
  );
  const { copyToClipboard } = UseCopyTo();
  UseSocketReply(socket, setConversation, setLoading, conversation);

  return (
    <div>
      <ToastContainer />

      <NewSidebar data={data} handleLiClick={handleLiClick} />

      <ChatArea
        conversation={conversation}
        inputMessage={inputMessage}
        sendMessage={sendMessage}
        setInputMessage={setInputMessage}
        loading={loading}
        copyToClipboard={copyToClipboard}
      />

      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
      />

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

export default HomePage;
