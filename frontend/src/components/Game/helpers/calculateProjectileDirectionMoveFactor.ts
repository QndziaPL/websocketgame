import { Position } from "../../../types/types";

export const calculateProjectileDirectionMoveFactor: (
  mousePosition: Position,
  playerPosition: Position,
  speed: number
) => Position = (mousePosition, playerPosition, speed) => {
  const factorX = mousePosition.x - playerPosition.x;
  const factorY = mousePosition.y - playerPosition.y;
  const magnitude = Math.sqrt(factorX * factorX + factorY * factorY);
  const x = (factorX / magnitude) * speed;
  const y = (factorY / magnitude) * speed;
  return { x, y };
};

export const calculateEnemyDirectionMoveFactor: (
  playerPosition: Position,
  enemyPosition: Position,
  speed: number
) => Position = (playerPosition, enemyPosition, speed) => {
  const factorX = playerPosition.x - enemyPosition.x;
  const factorY = playerPosition.y - enemyPosition.y;
  const magnitude = Math.sqrt(factorX * factorX + factorY * factorY);
  const x = (factorX / magnitude) * speed;
  const y = (factorY / magnitude) * speed;
  return { x, y };
};
