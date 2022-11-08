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
import { BasePlayer } from "@websocketgame/shared/dist/characters";

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
    charactersBaseData: {
      basePlayers: players.getPlayers().map(
        ({
          position,
          id,
          nick,
          hp,
          maxHp,
          destination,
          collisionRadius,
        }): BasePlayer => ({
          position,
          id,
          nick,
          hp,
          maxHp,
          destination,
          collisionRadius,
        })
      ),
    },
  });
  socket.broadcast.emit(
    ServerToClientEventType.PROJECTILES,
    projectiles.getProjectiles()
  );
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
      const { exp, expForNextLevel, hp, maxHp, weapon, level } = clientsPlayer;
      socket.emit(ServerToClientEventType.MY_PLAYER, {
        expForNextLevel,
        exp,
        hp,
        maxHp,
        weapon,
        level,
      });
    }
  }, 50);
});
