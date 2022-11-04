import dotenv from "dotenv";
import { Server, Socket } from "socket.io";

import {
  ClientToServerEvents,
  ClientToServerEventType,
  InterServerEvents,
  ServerToClientEvents,
  ServerToClientEventType,
  SocketData,
} from "@websocketgame/shared/dist/socket";
import { Player } from "@websocketgame/shared/dist/player";
import { movePlayerByVector } from "./playerMovement/playerMovement";

dotenv.config();

const port: number = process.env.PORT ? Number(process.env.port) : 80;

let countdown = 100;

let players: Player[] = [];

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(port ?? 4000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const updateGame = (socket: Socket) => {
  for (let i = 0; i < players.length; i++) {
    const { destination, position, speed } = players[i];
    if (
      destination &&
      destination.x !== position.x &&
      destination.y !== position.y
    ) {
      const xDif = destination.x - position.x;
      const yDif = destination.y - position.y;
      const stepLength = Math.sqrt(xDif * xDif + yDif * yDif);
      const xStepValue = (xDif / stepLength) * speed;
      const yStepValue = (yDif / stepLength) * speed;
      players[i].position = {
        x: position.x + xStepValue,
        y: position.y + yStepValue,
      };
    }
  }
  socket.broadcast.emit(ServerToClientEventType.CHARACTERS_DATA, {
    charactersData: { players },
  });
};

io.on("connection", (socket) => {
  players.push({
    position: { x: 0, y: 0 },
    nick: "test player",
    id: socket.id,
    speed: 5,
  });
  console.log(`pushed ${socket.id} to players`);
  socket.emit(ServerToClientEventType.COUNTDOWN, countdown);

  socket.emit(
    ServerToClientEventType.CLIENTS_CONNECTED,
    players.map(({ id }) => id)
  );

  socket.on(ClientToServerEventType.CLICK, (vector) => {
    console.log(vector, "VECTOR HEREEEEEEEEEE");
    const id = players.findIndex(({ id }) => id === socket.id);
    players.forEach((p) =>
      console.log(`${p.id} -> ${p.position.x},${p.position.y}`)
    );
    if (id !== -1) {
      const newPlayers = [...players];
      newPlayers[id].destination = movePlayerByVector(
        newPlayers[id].position,
        vector
      );
      players = newPlayers;
    }
  });

  socket.on(ClientToServerEventType.KICK_ALL_PLAYERS, () => {
    players = [];
  });

  socket.on("disconnect", (reason) => {
    players.splice(
      players.findIndex(({ id }) => socket.id),
      1
    );
    console.log(`removed client ${socket.id} with reason: ${reason}`);
  });

  setInterval(() => {
    updateGame(socket);
  }, 15);
});
