import { Position, Size } from "../types/types";
import { randomNumberBetween } from "../helpers/helpers";

const GENERATION_SIDES = ["top", "right", "bottom", "left"];
export const generateRandomEnemyPosition: (windowSize: Size) => Position = (
  windowSize
) => {
  const sideOfEnemiesAreComingFrom = GENERATION_SIDES[randomNumberBetween(3)];
  switch (sideOfEnemiesAreComingFrom) {
    case "top": {
      return { x: randomNumberBetween(windowSize.width), y: 0 };
    }
    case "right": {
      return { x: windowSize.width, y: randomNumberBetween(windowSize.height) };
    }
    case "bottom": {
      return { x: randomNumberBetween(windowSize.width), y: windowSize.height };
    }
    case "left": {
      return { x: 0, y: randomNumberBetween(windowSize.height) };
    }
    default: {
      return { x: -100, y: -100 };
    }
  }
};
