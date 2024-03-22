import { io as socketIO } from "socket.io-client";

export const connectToSocket = (userId) => {
  const URL = "http://localhost:9000";
  const socket = socketIO(URL);
  return socket
};
