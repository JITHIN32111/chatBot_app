import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  question: String,
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
