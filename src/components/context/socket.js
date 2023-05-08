import React, { useContext, createContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {

    const socket = io('http://localhost:9092');


    const connect = (url, obj) => {
        socket.connect(url, obj);
    }

    const disconnect = () => {
        console.log("disconnect from socket")
        socket.disconnect();
    }

    // Use useMemo to prevent object recreation on every render
    const contextValue = useMemo(() => ({ socket, connect, disconnect }), [socket]);

    return (
        // Using the provider so that ANY component in our application can 
        // use the values that we are sending.
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);