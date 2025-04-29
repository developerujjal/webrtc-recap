import { io } from "socket.io-client";

import React from 'react';

let socket;

const socketConnection = (jwt) => {
    if (socket && socket.connected) {
        return socket;
    } else {
        socket = io("http://localhost:3000", {
            auth: {
                jwt
            }
        })
    }

    return socket;
};

export default socketConnection;