import React from "react";
import io from "socket.io-client";
import { format } from 'react-string-format';
import { getDomainSocket } from "../../helpers/getDomainSocket";

const roomCode = 'asdf';

const url = format(getDomainSocket() + "?roomCode={0}", roomCode);
//export const socket = io.connect(url, { transports: ['websocket'], upgrade: false, roomCode: roomCode });

export const socket = io.connect(url, { transports: ['websocket'], upgrade: false});
export const SocketContext = React.createContext();