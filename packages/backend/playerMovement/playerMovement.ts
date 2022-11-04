import { Position } from "@websocketgame/shared/dist/position";

export const movePlayerByVector = (
  oldPosition: Position,
  vector: Position
): Position => {
  console.log(
    `prevPosition:${oldPosition.x},${oldPosition.y}, vector:${vector.x},${vector.y}`
  );
  return { x: oldPosition.x + vector.x, y: oldPosition.y + vector.y };
};
