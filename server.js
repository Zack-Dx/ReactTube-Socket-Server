import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN,
  },
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("new-message", (message) => {
    if (message.length) {
      sendNewMessage(message, socket);
    }
  });
});

const { PORT } = process.env;

server.listen(PORT || 5000, () => {
  console.log("Server running at " + PORT);
});

function sendNewMessage(message) {
  io.emit("new-message", message);
}
