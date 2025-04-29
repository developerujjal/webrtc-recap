const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/routes');
const port = process.env.PORT || 3000;
const { createServer } = require("http");
const { Server } = require('socket.io');

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

    socket.on('newOffer', ({offer, apptInfo}) => {

    })

});



httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});