import dotenv from "dotenv";
import { Server, Socket } from "socket.io";

import {
  ClientToServerEvents,
  ClientToServerEventType,
  InterServerEvents,
  ServerToClientEvents,
  ServerToClientEventType,
  SocketData,
} from "@websocketgame/shared/dist/types/socket";
import Players from "./classes/Players/Players";
import MessagesToFrontend from "./classes/MessagesToFrontend";
import Projectiles from "./classes/Projectiles";
import Enemies from "./classes/Enemies/Enemies";
import { emitCharacters } from "./emitters/characters";
import { emitProjectiles } from "./emitters/projectiles";
import { emitMyPlayer } from "./emitters/myPlayer";
import { checkCollisions } from "./collisions/checkCollisions";
import { addTestEnemy } from "./classes/Enemies/helpers";

dotenv.config();

// const port: number = process.env.PORT ? Number(process.env.port) : 80;

const messages = new MessagesToFrontend();
const projectiles = new Projectiles();
const players = new Players(messages.addMessage, projectiles);
const enemies = new Enemies();

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(80, {
  cors: {
    origin: "*",
    // origin: "http://localhost:3000",
  },
});

const updateCoreGameData = (socket: Socket) => {
  checkCollisions({
    players,
    enemies,
    projectiles,
    addMessage: messages.addMessage,
  });
  players.movePlayers();
  projectiles.moveProjectiles();
  enemies.performAction();
  emitCharacters({ socket, enemies, players });
  emitProjectiles({ socket, projectiles });
};

io.on("connection", (socket) => {
  socket.emit(
    ServerToClientEventType.CLIENTS_CONNECTED,
    players.getPlayers().map(({ id }) => id)
  );

  socket.on(ClientToServerEventType.RIGHT_CLICK, (mouseClickPosition) => {
    players.updatePlayerDestination(socket.id, mouseClickPosition);
  });

  socket.on(ClientToServerEventType.LEFT_CLICK, (mouseClickPosition) => {
    players.performBaseAttack(socket.id, mouseClickPosition);
  });

  socket.on(ClientToServerEventType.KICK_ALL_PLAYERS, () => {
    players.removeAllPlayers();
  });

  socket.on("disconnect", (reason) => {
    players.removePlayer(socket.id, reason);
  });

  socket.on(ClientToServerEventType.JOIN_GAME, (nickname: string) => {
    players.addNewPlayer(socket.id, nickname, 1);
  });

  setInterval(() => {
    updateCoreGameData(socket);
  }, 1000 / 60);

  setInterval(() => {
    socket.emit(
      ServerToClientEventType.MESSAGES_TO_FRONTEND,
      messages.getMessages()
    );
  }, 100);

  setInterval(() => {
    const clientsPlayer = players.getPlayer(socket.id);
    if (clientsPlayer) {
      emitMyPlayer({ socket, clientsPlayer });
    }
  }, 1000 / 60);

  setInterval(() => {
    enemies.addNewEnemies(addTestEnemy(), 1, {
      topLeftPointOfArea: { x: 0, y: 0 },
      rightBottomPointOfArea: { x: 1000, y: 1000 },
    });
  }, 5000);
});
