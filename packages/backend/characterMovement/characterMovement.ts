import { Position } from "@websocketgame/shared/dist/types/position";
import { objectMovement } from "../objectMovement/objectMovement";

export interface MovableCharacter {
  destination?: Position;
  position: Position;
  speed: number;
}

type MoveCharacterFunctionType = <T extends MovableCharacter>(
  characters: T[]
) => void;

export const moveCharacters: MoveCharacterFunctionType = (characters) => {
  for (let i = 0; i < characters.length; i++) {
    const { destination, position, speed } = characters[i];
    if (destination) {
      const { newPosition, isDestination } = objectMovement(
        destination,
        position,
        speed
      );

      if (isDestination) {
        characters[i].position = destination;
        characters[i].destination = undefined;
      } else {
        characters[i].position = newPosition;
      }
    }
  }
};
