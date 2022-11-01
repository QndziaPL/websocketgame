import { Position } from "../types/types";
import { MapSquare } from "./types";
import { generateMapObjects } from "./generateMapObjects";

export const generateSquareMap: (squarePosition: Position) => MapSquare = (
  squarePosition
) => {
  return {
    objects: generateMapObjects(squarePosition),
    position: squarePosition,
  };
};
