import Message from '../models/messageModel.js';

export const getDataFromDb =async (req, res) => {
    try {
      const data = await Message.find().sort({ _id: -1 }).limit(10);
      return res.status(201).json({
          data
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }