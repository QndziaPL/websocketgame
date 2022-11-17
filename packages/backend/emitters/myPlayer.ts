import { Socket } from "socket.io";
import { Player } from "@websocketgame/shared/dist/types/player";
import { ServerToClientEventType } from "@websocketgame/shared/dist/types/socket";

interface EmitMyPlayerProps {
  socket: Socket;
  clientsPlayer: Player;
}

type EmitMyPlayerFunctionType = (props: EmitMyPlayerProps) => void;

export const emitMyPlayer: EmitMyPlayerFunctionType = ({
  clientsPlayer,
  socket,
}) => {
  const { exp, hp, maxHp, weapon, level } = clientsPlayer;
  socket.emit(ServerToClientEventType.MY_PLAYER, {
    exp,
    hp,
    maxHp,
    weapon,
    level,
  });
};
