import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) =>{
    console.log('Client connected')

    socket.on('message', (body) => {
        console.log(socket.id);
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(4)
        })
    })
});
    

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});