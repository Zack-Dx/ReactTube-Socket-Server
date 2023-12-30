import { io } from "../config/socket.js";

export function sendNewMessage(message) {
    io.emit("new-message", message);
}
