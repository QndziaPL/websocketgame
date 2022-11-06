import { Position } from "../position";
import { GameData, MessageToFrontend } from "../game";
import { SkillButton } from "../input";

enum ServerToClientEventType {
  COUNTDOWN = "countdown",
  CHARACTERS_DATA = "charactersData",
  CLIENTS_CONNECTED = "clientsConnected",
  MESSAGES_TO_FRONTEND = "messagesToFrontend",
}

interface ServerToClientEvents {
  [ServerToClientEventType.COUNTDOWN]: (countdown: number) => void;
  [ServerToClientEventType.CLIENTS_CONNECTED]: (clients: string[]) => void;
  [ServerToClientEventType.CHARACTERS_DATA]: (gameData: GameData) => void;
  [ServerToClientEventType.MESSAGES_TO_FRONTEND]: (
    messages: MessageToFrontend[]
  ) => void;
}

enum ClientToServerEventType {
  RIGHT_CLICK = "rightClick",
  LEFT_CLICK = "leftClick",
  KICK_ALL_PLAYERS = "kickAllPlayers",
  RE_JOIN_GAME = "reJoinGame",
  SKILL_BUTTON_PRESSED = "skillButtonPressed",
}

interface ClientToServerEvents {
  [ClientToServerEventType.RIGHT_CLICK]: (position: Position) => void;
  [ClientToServerEventType.LEFT_CLICK]: (position: Position) => void;
  [ClientToServerEventType.KICK_ALL_PLAYERS]: () => void;
  [ClientToServerEventType.RE_JOIN_GAME]: () => void;
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
