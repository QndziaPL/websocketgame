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
import Players from "./classes/Players";
import MessagesToFrontend from "./classes/MessagesToFrontend";
import Projectiles from "./classes/Projectiles";

dotenv.config();

const port: number = process.env.PORT ? Number(process.env.port) : 80;

const messages = new MessagesToFrontend();
const projectiles = new Projectiles();
const players = new Players(messages.addMessage, projectiles);

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

const updateCoreGameData = (socket: Socket) => {
  players.movePlayers();
  players.checkCollisions();
  projectiles.moveProjectiles();
  socket.broadcast.emit(ServerToClientEventType.CHARACTERS_DATA, {
    charactersData: { players: players.getPlayers() },
  });
  socket.broadcast.emit(
    ServerToClientEventType.PROJECTILES,
    projectiles.getProjectiles()
  );
};

io.on("connection", (socket) => {
  players.addNewPlayer(socket.id, "test player", 1);

  socket.emit(
    ServerToClientEventType.CLIENTS_CONNECTED,
    players.getPlayers().map(({ id }) => id)
  );

  socket.on(ClientToServerEventType.RIGHT_CLICK, (vector) => {
    players.updatePlayerDestination(socket.id, vector);
  });

  socket.on(ClientToServerEventType.LEFT_CLICK, (vector) => {
    players.performBaseAttack(socket.id, vector);
  });

  socket.on(ClientToServerEventType.KICK_ALL_PLAYERS, () => {
    players.removeAllPlayers();
  });

  socket.on("disconnect", (reason) => {
    players.removePlayer(socket.id, reason);
  });

  socket.on(ClientToServerEventType.RE_JOIN_GAME, () => {
    players.addNewPlayer(socket.id, "test player", 1);
  });

  setInterval(() => {
    updateCoreGameData(socket);
  }, 15);

  setInterval(() => {
    socket.emit(
      ServerToClientEventType.MESSAGES_TO_FRONTEND,
      messages.getMessages()
    );
  }, 100);
});
