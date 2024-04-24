import { io as socketIO } from "socket.io-client";
import { PORT_SERVICE_SOCKET, URL_SERVICES } from "./config";

export const connectToSocket = (userId) => {
  const URL = `${URL_SERVICES}:${PORT_SERVICE_SOCKET}/?userId=${userId}`;
  const socket = socketIO(URL);
  return socket;
};
