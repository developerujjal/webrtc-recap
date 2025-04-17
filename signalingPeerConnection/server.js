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

//offers will be stored in this array
// so that we can send them to the clients when they connect
// good for one to one communication
// but not for group communication
const offers = [
  /* 
  offererUsername
  offer
  offerIceCandidate
  answererUsername
  answer
  answerIceCandidate
  */
];

const connectedSockets = [];

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const userName = socket.handshake.auth.userName;
  const password = socket.handshake.auth.password;

  if (password !== 'x') {
    socket.disconnect(true)
    return;
  };

  connectedSockets.push({
    socketId: socket.id,
    userName
  });

  

  // a new client has joined. if there are any offers available, send/emit them to the client
  if(offers.length){
    socket.emit('availableOffers', offers)
  }


  socket.on('newOffer', (newOffer) => {
    // console.log('new offer received:', newOffer);

    // Store the offer in the array
    offers.push({
      offererUsername: userName,
      offer: newOffer,
      offerIceCandidate: [],
      answererUsername: null,
      answer: null,
      answerIceCandidate: []
    });

    // Send the offer to the other clients except the one who created it
    socket.broadcast.emit('newOfferAwaiting', offers.slice(-1)); // send only the last offer
    // socket.broadcast.emit('newOfferAwaiting', offer[offer.length - 1]); // can work too

  });


  socket.on('sendIceCandidateToSignalingServer', (iceCandidatedObj) => {
    const {didIOffer, iceCandidate, iceUserName} = iceCandidatedObj;

    // console.log('iceCandidate received:', iceCandidate);

    if(didIOffer){
      const offerInOffers = offers.find((offer) => offer.offererUsername === iceUserName);
      if(offerInOffers){
        // add the ice candidate to the offer
        offerInOffers.offerIceCandidate.push(iceCandidate);
      }
    };

    // console.log(offers)
  });


  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
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



