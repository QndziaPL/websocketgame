import { Socket } from "socket.io";
import { Player } from "@websocketgame/shared/dist/player";
import { ServerToClientEventType } from "@websocketgame/shared/dist/socket";

interface EmitMyPlayerProps {
  socket: Socket;
  clientsPlayer: Player;
}

type EmitMyPlayerFunctionType = (props: EmitMyPlayerProps) => void;

export const emitMyPlayer: EmitMyPlayerFunctionType = ({
  clientsPlayer,
  socket,
}) => {
  const { exp, expForNextLevel, hp, maxHp, weapon, level } = clientsPlayer;
  socket.emit(ServerToClientEventType.MY_PLAYER, {
    expForNextLevel,
    exp,
    hp,
    maxHp,
    weapon,
    level,
  });
};
