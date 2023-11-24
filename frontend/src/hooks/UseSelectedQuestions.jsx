
const UseSelectedQuestions = (data, setConversation, setIsSidebarOpen) => {
  const handleLiClick = async (id) => {
    try {
      const selectedQuestion = data.find((msg) => msg._id === id);
      setConversation((prevConversation) => [
        ...prevConversation,
        { content: selectedQuestion.question, sender: 'user' },
      ]);

      setConversation((prevConversation) => [
        ...prevConversation,
        { content: selectedQuestion.content, sender: 'bot' },
      ]);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { handleLiClick };
};

export default UseSelectedQuestions;
