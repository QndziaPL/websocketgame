interface ClientToServerEvents {
    hello: () => void;
}


interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

enum MessageEventType {
    COUNTDOWN = "countdown"
}

interface ServerToClientEvents {
    [MessageEventType.COUNTDOWN]: (countdown: number) => void
}


export {ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData, MessageEventType}
