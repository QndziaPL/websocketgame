import { Enemy } from "@websocketgame/shared/dist/enemy";
import { Position } from "@websocketgame/shared/dist/position";

export interface AreaRange {
  topLeftPointOfArea: Position;
  rightBottomPointOfArea: Position;
}

export default class Enemies {
  private enemies: Enemy[] = [];

  addNewEnemies = (enemy: Enemy, numberOfEnemies: number, area: AreaRange) => {
    if (this.enemies.length > 10) return;
    const newEnemies: Enemy[] = [];
    for (let i = 0; i < numberOfEnemies; i++) {
      const newEnemy = { ...enemy, position: getRandomSpawnPointInArea(area) };
      newEnemies.push(newEnemy);
    }
    this.enemies.push(...newEnemies);
  };

  getEnemies = () => this.enemies;
}
const getRandomSpawnPointInArea = ({
  topLeftPointOfArea,
  rightBottomPointOfArea,
}: AreaRange) => {
  const x = Math.floor(
    Math.random() * (rightBottomPointOfArea.x - topLeftPointOfArea.x) +
      topLeftPointOfArea.x
  );
  const y = Math.floor(
    Math.random() * (rightBottomPointOfArea.y - topLeftPointOfArea.y) +
      topLeftPointOfArea.y
  );

  return { x, y };
};
