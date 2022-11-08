import { Position } from "@websocketgame/shared/dist/position";
import { lengthBetweenPoints } from "./objectMovement";

export interface PositionWithCollisionRadius {
  position: Position;
  collisionRadius: number;
}

export const checkObjectCollision = (
  p1: PositionWithCollisionRadius,
  p2: PositionWithCollisionRadius
): boolean => {
  const length = lengthBetweenPoints(
    p1.position.x - p2.position.x,
    p1.position.y - p2.position.y
  );
  return length <= p1.collisionRadius + p2.collisionRadius;
};
