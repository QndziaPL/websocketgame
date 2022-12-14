import { Position } from "../position";
import { GameData, MessageToFrontend } from "../game";
import { SkillButton } from "../input";
import { Projectile } from "../projectile";
import { MyPlayerForFrontend } from "../characters";

enum ServerToClientEventType {
  COUNTDOWN = "countdown",
  CHARACTERS_DATA = "charactersData",
  CLIENTS_CONNECTED = "clientsConnected",
  MESSAGES_TO_FRONTEND = "messagesToFrontend",
  PROJECTILES = "projectiles",
  MY_PLAYER = "myPlayer",
}

interface ServerToClientEvents {
  [ServerToClientEventType.COUNTDOWN]: (countdown: number) => void;
  [ServerToClientEventType.CLIENTS_CONNECTED]: (clients: string[]) => void;
  [ServerToClientEventType.CHARACTERS_DATA]: (gameData: GameData) => void;
  [ServerToClientEventType.MESSAGES_TO_FRONTEND]: (
    messages: MessageToFrontend[]
  ) => void;
  [ServerToClientEventType.PROJECTILES]: (projectiles: Projectile[]) => void;
  [ServerToClientEventType.MY_PLAYER]: (myPlayer?: MyPlayerForFrontend) => void;
}

enum ClientToServerEventType {
  RIGHT_CLICK = "rightClick",
  LEFT_CLICK = "leftClick",
  KICK_ALL_PLAYERS = "kickAllPlayers",
  SKILL_BUTTON_PRESSED = "skillButtonPressed",
  JOIN_GAME = "joinGame",
}

interface ClientToServerEvents {
  [ClientToServerEventType.RIGHT_CLICK]: (position: Position) => void;
  [ClientToServerEventType.LEFT_CLICK]: (position: Position) => void;
  [ClientToServerEventType.KICK_ALL_PLAYERS]: () => void;
  [ClientToServerEventType.JOIN_GAME]: (nickname: string) => void;
  [ClientToServerEventType.SKILL_BUTTON_PRESSED]: (button: SkillButton) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export {
  ServerToClientEvents,
  ClientToServerEvents,
  ClientToServerEventType,
  InterServerEvents,
  SocketData,
  ServerToClientEventType,
};
