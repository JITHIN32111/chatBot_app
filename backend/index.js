import express, { json, urlencoded } from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server as socketIO } from "socket.io";
import http from "http";
import {dbConnection} from './src/utils/db.js'
import routes from './src/routes/routes.js'
import handleSocketConnection from './src/utils/socketConnection.js'

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
app.use(cookieParser());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));
dbConnection();
handleSocketConnection(io)
app.use("/api/user",routes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});







