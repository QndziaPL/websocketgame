import dotenv from 'dotenv';
import {Server, Socket} from "socket.io";

dotenv.config();

const port: number = process.env.PORT ? Number(process.env.port) : 80

let countdown = 100

const io = new Server(port ?? 4000, {
        cors: {
            origin: "http://localhost:3000"
        }
});

// const io = new Server<
//     ClientToServerEvents,
//     ServerToClientEvents,
//     InterServerEvents,
//     SocketData
//     >(port ?? 4000, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });


const startGameLoop = () => {

}

io.on('connection', (socket) => {
    startGameLoop()
    // socket.emit(MessageEventType.COUNTDOWN, countdown)
});

