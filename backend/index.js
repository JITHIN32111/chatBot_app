import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./src/utils/connection.js";
import cookieParser from "cookie-parser";
import { Server as socketIO } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import axios from "axios";
const app = express();

const server = http.createServer(app);
const io = new socketIO(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  methods: ["GET", "POST"],
  credentials: true,
};
dotenv.config();

app.use(cors(corsOptions));

connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
    server.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const Message = mongoose.model("Message", {
  content: String,
  sender: String,
  question: String,
});
app.use(cookieParser());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

// console.log(io);

// Socket.io setup for real-time communication
const apiKey = "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";
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("message", async (data) => {
    const { message } = data;

    // Save the message to MongoDB
    // const newMessage = new Message({ content: message, sender: 'user' });
    // await newMessage.save();

    // Use OpenAI API to generate a bot reply
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: message,
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    console.log(openaiResponse.data);
    const botReply = new Message({
      content: openaiResponse.data.choices[0].text.trim(),
      sender: "bot",
      question: message,
    });
    await botReply.save();

    // Emit the bot reply to all connected clients
    io.emit("reply", { reply: botReply.content });
  });
});

app.use("/api/user/getData", async (req, res) => {
  console.log(":::::::::::::::::::");
  try {
    const data = await Message.find().sort({ _id: -1 }).limit(10);
    console.log(data);
    return res.status(201).json({
        data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }

  // Rest of your route handling logic
});


app.use("/api/user/getHistory/:id", async (req, res) => {
  const id = req.params.id;
  console.log(":::::::::::::::::::");
  console.log(id);
  try {
    const result = await Message.findOne({ _id: id });
    console.log(result);
    if (!result) {
      // If no document is found with the provided id, return a 404 status
      return res.status(404).json({ error: 'Document not found' });
    }

    // If a document is found, return the data
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }

  // Rest of your route handling logic
});
