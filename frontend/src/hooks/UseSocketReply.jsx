import { useEffect } from "react";
const UseSocketReply = (socket, setConversation, setLoading, conversation) => {
    useEffect(() => {
      const handleReply = (data) => {
        const botReply = { content: data.reply, sender: "bot" };
        setConversation((prevConversation) => [...prevConversation, botReply]);
        setLoading(false);
      };
  
      socket.on("reply", handleReply);
  
      return () => {
        socket.off("reply", handleReply);
      };
    }, [socket, setConversation, setLoading, conversation]);
  };
  
  export default UseSocketReply;