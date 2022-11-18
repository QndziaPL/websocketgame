import { Manager, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ClientToServerEventType,
  ServerToClientEvents,
  ServerToClientEventType,
} from "@websocketgame/shared/dist/types/socket";

export default class SocketIO {
  private static instance: SocketIO;
  private static socket: Socket;
  readonly connected: boolean;

  private constructor() {
    // const address = process.env.REACT_APP_ADDRESS ?? "";
    const manager = new Manager<ServerToClientEvents, ClientToServerEvents>(
      "http://localhost:80"
      // "http://localhost:80"
      // "http://192.168.88.40:80" // TODO: IP in office wifi
    );
    SocketIO.socket = manager.socket("/");
    this.connected = SocketIO.socket.connected;
  }

  public static getInstance = (): SocketIO => {
    if (!SocketIO.instance) {
      SocketIO.instance = new SocketIO();
    }
    return SocketIO.instance;
  };

  getId = () => {
    return SocketIO.socket.id;
  };

  subscribe<T>(event: ServerToClientEventType, callback: (t: T) => void) {
    SocketIO.socket.on(event, callback);
  }

  send(event: ClientToServerEventType, payload?: any) {
    SocketIO.socket.emit(event, payload);
  }

  disconnect = () => {
    SocketIO.socket.disconnect();
  };
}
