import { getRandomSpawnPointInArea } from "./helpers";
import { Position } from "@websocketgame/shared/dist/types/position";
import { Enemy } from "@websocketgame/shared/dist/types/enemy";

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

  setEnemies = (enemies: Enemy[]) => {
    this.enemies = enemies;
  };

  attack = () => {};
}
