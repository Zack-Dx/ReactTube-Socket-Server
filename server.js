import { Config } from "./config/index.js";
import { ACTIONS } from "./constants/socket.actions.js";
import { io, server } from "./config/socket.js";
import { sendNewMessage } from "./utils/socket.js";

const { PORT } = Config;
const { NEW_MESSAGE } = ACTIONS;

io.on("connection", (socket) => {
    console.log("Client Connected");
    socket.on(NEW_MESSAGE, (message) => {
        try {
            if (message && typeof message === "string") {
                sendNewMessage(message, socket);
            } else {
                throw new Error("Invalid message format");
            }
        } catch (error) {
            console.error(`Error processing new message: ${error.message}`);
        }
    });

    socket.on("error", (error) => {
        console.error(`Socket error: ${error.message}`);
    });

    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    });
});

server.on("error", (error) => {
    console.error(`Server error: ${error.message}`);
});

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
