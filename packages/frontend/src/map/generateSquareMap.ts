import { MapSquare } from "./types";
import { generateMapObjects } from "./generateMapObjects";
import { Position } from "@websocketgame/shared/dist/types/position";

export const generateSquareMap: (squarePosition: Position) => MapSquare = (
  squarePosition
) => {
  return {
    objects: generateMapObjects(squarePosition),
    position: squarePosition,
  };
};
