const express = require('express');
const app = express();
const path = require('path');
const { createServer } = require('http');
const { Server } = require("socket.io");

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname)));


const httpServer = createServer(app);
const io = new Server(httpServer)

/* 
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
*/


io.on('connection', (socket) => {
  console.log('a user connected', socket.id);



  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  })
})


httpServer.listen(port, () => {
  console.log(`Server is running on ${port}`);
})




  // socket.on('disconnect', () => {
  //   console.log('user disconnected', socket.id);
  // });

  // socket.on('offer', (data) => {
  //   console.log('offer received:', data);
  //   socket.broadcast.emit('offer', data);
  // });

  // socket.on('answer', (data) => {
  //   console.log('answer received:', data);
  //   socket.broadcast.emit('answer', data);
  // });

  // socket.on('candidate', (data) => {
  //   console.log('candidate received:', data);
  //   socket.broadcast.emit('candidate', data);
  // });



