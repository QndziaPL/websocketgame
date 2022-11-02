import React, {useEffect, useState} from "react";
import "./App.css";
import Game from "./components/Game/Game";
import {Manager} from "socket.io-client";
import {ClientToServerEvents, ServerToClientEvents} from "./types/socket/socket";
import {MessageEventType} from "./types/socket/messageEventType"


const manager = new Manager<ServerToClientEvents, ClientToServerEvents>("http://localhost:80")
const socket = manager.socket("/")

const App = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState<string>();

    useEffect(() => {
        socket.on('connect', () => {
            console.log("połączony")
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', () => {
            setLastPong(new Date().toISOString());
        });

        socket.on(MessageEventType.COUNTDOWN, (countdown) => {
            console.log("GÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓWNO")
            console.log(countdown)
        })

        return () => {
            console.log("wchodzi disc")
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const sendPing = () => {
        socket.emit('ping');
    }

  return (
    <div className="App" onClick={sendPing}>
      <Game />
    </div>
  );
};

export default App;
