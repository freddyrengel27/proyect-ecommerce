import {io} from "socket.io-client";

const socketConfig = { transports: ['websocket', 'polling', 'flashsocket'], forceNew: true};

const socket = io("http://localhost:3000", socketConfig);

export default socket;