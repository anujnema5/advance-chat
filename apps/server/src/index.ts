import http from 'http';
import SocketService from './services/socket';
import express from 'express';

const app = express();

app.get("/", (req, res)=> {
    res.send("asdasdasd");
})

const init = async () => {
    const socketService = new SocketService();
    const socket = socketService.io;
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT || 8000
    
    socket.attach(httpServer);
    httpServer.listen(PORT, ()=> console.log(`HTTP Server Started at PORT:${PORT}`));

    socketService.initListners();
}

init();