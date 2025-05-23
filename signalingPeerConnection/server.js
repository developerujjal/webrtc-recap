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
  if (offers.length) {
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
    const { didIOffer, iceCandidate, iceUserName } = iceCandidatedObj;

    // console.log('iceCandidate received:', iceCandidate);

    if (didIOffer) {
      const offerInOffers = offers.find((offer) => offer.offererUsername === iceUserName);
      if (offerInOffers) {
        // add the ice candidate to the offer
        offerInOffers.offerIceCandidate.push(iceCandidate);
        // come back soon
        // 1. When the answerer answers, all exsisting ice candidates are sent
        // 2. Any candidates that come in after the offer has been answered, 
        // will be pass through

        // console.log('offerInOffers:', offerInOffers);

        if (offerInOffers.answererUsername) {
          // pass it through to the others socket
          const socketToSendTo = connectedSockets.find((connectedSocket) => connectedSocket.userName === offerInOffers.answererUsername);

          if (socketToSendTo) {
            socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate);
          } else {
            console.log('IceCandidate received but not found answerer')
          };


        };

      }
    } else {
      // this ice is coming from the answerer. send to the offerer
      // pass it through to the others socket
      const offerInOffers = offers.find((offer) => offer.answererUsername === iceUserName);

      const socketToSendTo = connectedSockets.find((connectedSocket) => connectedSocket.userName === offerInOffers.offererUsername);

      if (socketToSendTo) {
        socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate);
      } else {
        console.log('IceCandidate received but not found offerer')
      };
    }

    // console.log(offers)
  });

  socket.on('newAnswer', (offerObj, ackFunction) => {
    // emit the answer (offerObj) back to the client1
    //  in order to do that we need to the socket id of the client1 who created the offer

    const socketToAnswer = connectedSockets.find((connectedSocket) => connectedSocket.userName === offerObj.offererUsername);

    if (!socketToAnswer) {
      console.log('Connected Socket not found')
      return;
    };

    // we found the socketId of the client1 who created the offer
    const socketIdToAnswer = socketToAnswer.socketId;

    // we need to find the offer in the offers array and update it with the answer
    const offerToUpdate = offers.find((offer) => offer.offererUsername == offerObj.offererUsername);

    if (!offerToUpdate) {
      console.log('Offer not found')
      return;
    };

    // send back to the answerer all ice candidates that We have already collected
    ackFunction(offerToUpdate.offerIceCandidate)

    offerToUpdate.answer = offerObj.answer;
    offerToUpdate.answererUsername = userName;


    // socket. has a to() which alllows us to emit to a specific socketId/room
    // every socket has it's own room 
    socket.to(socketIdToAnswer).emit('answerResponse', offerToUpdate);


  })


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



