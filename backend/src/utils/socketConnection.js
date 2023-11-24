// src/socket/socketController.js
import axios from 'axios';
import Message from '../models/messageModel.js';

const handleSocketConnection = (io) => {
  io.on('connection', (socket) => {

    socket.on('message', async (data) => {
      const { message } = data;
      const openaiResponse = await axios.post(
        process.env.OPEN_AI_URL,
        {
          prompt: message,
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPEN_AI_API}`,
          },
        }
      );

      const botReply = new Message({
        content: openaiResponse.data.choices[0].text.trim(),
        sender: 'bot',
        question: message,
      });

      await botReply.save();
      io.emit('reply', { reply: botReply.content });
    });
  });
};

export default handleSocketConnection;
