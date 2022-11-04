import { Position } from "../position";
import { GameData } from "../game";

enum ServerToClientEventType {
  COUNTDOWN = "countdown",
  CHARACTERS_DATA = "charactersData",
  CLIENTS_CONNECTED = "clientsConnected",
}

interface ServerToClientEvents {
  [ServerToClientEventType.COUNTDOWN]: (countdown: number) => void;
  [ServerToClientEventType.CLIENTS_CONNECTED]: (clients: string[]) => void;
  [ServerToClientEventType.CHARACTERS_DATA]: (gameData: GameData) => void;
}

enum ClientToServerEventType {
  CLICK = "click",
  KICK_ALL_PLAYERS = "kickAllPlayers",
}

interface ClientToServerEvents {
  [ClientToServerEventType.CLICK]: (position: Position) => void;
  [ClientToServerEventType.KICK_ALL_PLAYERS]: () => void;
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
