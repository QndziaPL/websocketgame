import Projectiles from "../classes/Projectiles";
import { Socket } from "socket.io";
import { ServerToClientEventType } from "@websocketgame/shared/dist/types/socket";

interface EmitProjectilesProps {
  projectiles: Projectiles;
  socket: Socket;
}

type EmitProjectilesFunctionType = (props: EmitProjectilesProps) => void;

export const emitProjectiles: EmitProjectilesFunctionType = ({
  projectiles,
  socket,
}) => {
  socket.broadcast.emit(
    ServerToClientEventType.PROJECTILES,
    projectiles.getProjectiles()
  );
};
