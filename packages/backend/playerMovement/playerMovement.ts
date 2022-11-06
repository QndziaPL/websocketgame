import { Position } from "@websocketgame/shared/dist/position";

export const numberToFixed = (num: number, fractionDigits?: number) =>
  Number(num.toFixed(fractionDigits));
export const movePlayerByVector = (
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
