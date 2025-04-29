const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = require('./routes/routes');
const port = process.env.PORT || 3000;
const { createServer } = require("http");
const { Server } = require('socket.io');
const secret = 'aldkfsdlfksdlfkdsdklfasakdfj';


// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // replace with your frontend URL
    credentials: true,
}));
app.use(express.json());


const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        // allowedHeaders: ['my-custom-header', 'Content-Type'],
        // credentials: true,
    }
});

const professionalAppointments = [];


app.set('professionalAppointments', professionalAppointments);

// here we are using the router from routes.js
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('TeleLegal Backend is running!')
});


const connectedProfessionals = [];

const allKnownOffers = {
    //offer
    //professionalsFullName
    //clientName
    //apptDate
    //offererIceCandidates
    //answer
    //answererIceCandidates
}


// Socket connection logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    // to fill it later
    const jwtToken = socket.handshake.auth.jwt;

    let decodedData;
    try {
        decodedData = jwt.verify(jwtToken, secret);

    } catch (error) {
        socket.disconnected();
        return;
    }


    const { name, proId } = decodedData;

    if (proId) {
        const connectedPro = connectedProfessionals.find((p) => p.proId === proId);
        // if the deshobarduser is already connected, we update the socketId
        if (connectedPro) {
            connectedPro.socketId = socket.id;
        } else {
            connectedProfessionals.push({
                socketId: socket.id,
                fullName: name,
                proId
            })
        }

    }else{
        // this is a client

        
    }



    console.log('connectedProfessionals', connectedProfessionals);

    socket.on('newOffer', ({ offer, apptInfo }) => {

        allKnownOffers[apptInfo.uuid] = {
            ...apptInfo,
            offer: offer,
            offererIceCandidates: [],
            answer: null,
            answererIceCandidates: [],
        };


        /* 
        in apptInfo there is no professionalFullName, its only name
        */
        //we don't emit this to everyone like we did our chat server
        // we only want this to go to our professional

        const p = connectedProfessionals.find((p) => p.fullName === apptInfo.name);
        if (p) {

            // only emit if the user is connected
            const socketId = p.socketId;
            socket.to(socketId).emit('newOfferWaiting', allKnownOffers[apptInfo.uuid])
        };




    })

});



httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});