import { ServerToClientEventType } from "@websocketgame/shared/dist/socket";
import { BasePlayer } from "@websocketgame/shared/dist/characters";
import { Socket } from "socket.io";
import Players from "../classes/Players";
import Enemies from "../classes/Enemies";

interface EmitCharactersProps {
  socket: Socket;
  players: Players;
  enemies: Enemies;
}

type EmitCharactersFunctionType = (props: EmitCharactersProps) => void;

export const emitCharacters: EmitCharactersFunctionType = ({
  socket,
  enemies,
  players,
}) => {
  socket.broadcast.emit(ServerToClientEventType.CHARACTERS_DATA, {
    charactersBaseData: {
      basePlayers: players.getPlayers().map(
        ({
          position,
          id,
          nick,
          hp,
          maxHp,
          destination,
          collisionRadius,
          lookingTowardsDegree,
        }): BasePlayer => ({
          position,
          id,
          nick,
          hp,
          maxHp,
          destination,
          collisionRadius,
          lookingTowardsDegree,
        })
      ),
    },
    enemiesBaseData: {
      baseEnemies: enemies
        .getEnemies()
        .map(({ position, name, hp, maxHp, collisionRadius }) => ({
          position,
          name,
          hp,
          maxHp,
          collisionRadius,
        })),
    },
  });
};
