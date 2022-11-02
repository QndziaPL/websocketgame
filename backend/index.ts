import dotenv from 'dotenv';
import {Server, Socket} from "socket.io";
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "../frontend/src/types/socket/socket";
import {MessageEventType} from "../frontend/src/types/socket/messageEventType";
import {GameStatus} from "../frontend/src/types/types"

dotenv.config();

const port: number = process.env.PORT ? Number(process.env.port) : 80

let countdown = 100

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
    >(port ?? 4000, {
        cors: {
            origin: "http://localhost:3000"
        }
});

const gameObject = {
    gameStatus: GameStatus.PAUSED
}

const startGameLoop = () => {
    while (gameObject.gameStatus === GameStatus.RUNNING){

    }
}

io.on('connection', (socket) => {
    startGameLoop()
    socket.emit(MessageEventType.COUNTDOWN, countdown)
    // io.emit("eventEmit", Event.COUNTDOWN, {countdown})
});

