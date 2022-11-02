import { Position } from "../types/types";
import { MapObject, Obstacle } from "./types";
import { randomNumberBetween } from "../helpers/helpers";
import { MAP_SIDE, OBSTACLES } from "../consts/map";

export const generateMapObjects: (squarePosition: Position) => MapObject[] = (
  squarePosition: Position
) => {
  const numberOfObstacles = randomNumberBetween(300, 150);
  const obstacles: Obstacle[] = [];
  for (let i = 0; i < numberOfObstacles; i++) {
    const obstacle = OBSTACLES[randomNumberBetween(OBSTACLES.length, 0)];
    const randomPosition: Position = {
      x: randomNumberBetween(
        MAP_SIDE * (squarePosition.x + 1),
        MAP_SIDE * squarePosition.x
      ),
      y: randomNumberBetween(
        MAP_SIDE * (squarePosition.y + 1),
        MAP_SIDE * squarePosition.y
      ),
    };
    obstacles.push(obstacle(randomPosition));
  }
  return obstacles;
};
