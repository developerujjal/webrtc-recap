import { io } from "socket.io-client";

import React from 'react';

const socketConnection = (jwt) => {
    const socket = io("http://localhost:3000", {
        auth: {
            jwt
        }
    });
    
    return socket;
};

export default socketConnection;