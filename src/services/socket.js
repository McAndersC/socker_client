import { io } from "socket.io-client";
import { serverPath } from "./settings";
const socket = io(serverPath);

export default socket;