import {MessageEventType} from "./messageEventType";

// export interface ServerToClientEvents {
//     noArg: () => void;
//     basicEmit: (a: number, b: string, c: Buffer) => void;
//     withAck: (d: string, callback: (e: number) => void) => void;
//     eventEmit: (
//         e: Event,
//         ...args: any
//         ) => void
// }

export interface ServerToClientEvents {
    [MessageEventType.COUNTDOWN]: (countdown: number) => void
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}
