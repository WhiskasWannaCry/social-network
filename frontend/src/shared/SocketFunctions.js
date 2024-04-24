import env from "react-dotenv";
import { io as socketIO } from "socket.io-client";

export const connectToSocket = (userId) => {
  const URL = `${env.URL_SERVICES}:${env.PORT_SERVICE_SOCKET}/?userId=${userId}`;
  const socket = socketIO(URL);
  return socket;
};
