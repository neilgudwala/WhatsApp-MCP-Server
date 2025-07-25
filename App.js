import createError from "http-errors";
import express from "express";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as socketIo } from "socket.io";

import { startBot } from './startBot.js';
import { handleIncomingMessages } from './msgLogger.js';
import { sendMessageObject } from './msgSender.js';
import { handleIncomingRequests } from './apiRes.js';

dotenv.config();

// Handling __dirname in ES modules
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT || 8000;

app.use(cors({ 
  origin: URL,
  credentials: true,
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

async function socketConnect(){
  try{
    await startBot(handleIncomingMessages);
  }
  catch(err){
    console.log(err);
  }
}

app.post("/", (req,res) => {
  console.log(req.body);
  // console.log(res);
  handleIncomingRequests(req.body);
});

server.listen(port, () => {
  console.log("Server running on port", port);
  socketConnect();
});

// // Poll for new messages to send every 10s
// setInterval(() => {
//   sendFromQueue();
// }, 10000);
