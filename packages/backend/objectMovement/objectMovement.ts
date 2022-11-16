import { Position } from "@websocketgame/shared/dist/position";
import { numberToFixed } from "../playerMovement/playerMovement";

export const moveObjectByVector = (
  oldPosition: Position,
  vector: Position
): Position => {
  console.log(
    `prevPosition:${oldPosition.x},${oldPosition.y}, vector:${vector.x},${vector.y}`
  );
  return {
    x: numberToFixed(oldPosition.x + vector.x),
    y: numberToFixed(oldPosition.y + vector.y),
  };
};

export const objectMovement = (
  destination: Position,
  position: Position,
  speed: number
): {
  newPosition: Position;
  isDestination: boolean;
  remainingLength: number;
} => {
  const xDif = destination.x - position.x;
  const yDif = destination.y - position.y;
  if (Math.abs(xDif) < speed && Math.abs(yDif) < speed)
    return {
      newPosition: destination,
      isDestination: true,
      remainingLength: 0,
    };
  const remainingLength = lengthBetweenPoints(xDif, yDif);
  const xStepValue = numberToFixed((xDif / remainingLength) * speed, 4);
  const yStepValue = numberToFixed((yDif / remainingLength) * speed, 4);
  const nextX = numberToFixed(position.x + xStepValue, 4);
  const nextY = numberToFixed(position.y + yStepValue, 4);

  return {
    newPosition: {
      x: nextX,
      y: nextY,
    },
    isDestination: false,
    remainingLength,
  };
};

export const lengthBetweenPoints = (xDif: number, yDif: number) =>
  numberToFixed(Math.sqrt(xDif * xDif + yDif * yDif), 4);
