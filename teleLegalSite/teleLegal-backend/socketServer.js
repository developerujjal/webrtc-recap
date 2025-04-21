const { io } = require('./server');

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)
});