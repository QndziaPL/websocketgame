import { Position, Size } from "../../../types/types";

export const isProjectileInGameArea: (
  position: Position,
  windowSize: Size,
  projectileSize: Size
) => boolean = (position, windowSize, projectileSize) => {
  return (
    position.x - projectileSize.height / 2 > 0 &&
    position.x + projectileSize.height / 2 < windowSize.width &&
    position.y - projectileSize.height / 2 > 0 &&
    position.y + projectileSize.height / 2 < windowSize.height
  );
};
