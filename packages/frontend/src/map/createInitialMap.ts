import { GameMap } from "./types";
import { generateSquareMap } from "./generateSquareMap";

/**
 * Single "MapSquare" refers to one square piece of map
 * initially we'll have something like:
 * [][][]
 * [][][]
 * [][][]
 * 3x3 map square pieces
 * ----------------------------
 * Game map will contain many MapSquares generated
 * when player will come close to previous MapSquare border
 * */

export const createInitialMap: () => GameMap = () => {
  const squares = [
    { position: { x: -1, y: -1 } },
    { position: { x: 0, y: -1 } },
    { position: { x: 1, y: -1 } },
    { position: { x: -1, y: 0 } },
    { position: { x: 0, y: 0 } },
    { position: { x: 1, y: 0 } },
    { position: { x: -1, y: 1 } },
    { position: { x: 0, y: 1 } },
    { position: { x: 1, y: 1 } },
  ].map((square) => generateSquareMap(square.position));
  return {
    squares,
    actualViewRange: {
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: window.innerWidth, y: window.innerHeight },
    },
  };
};
