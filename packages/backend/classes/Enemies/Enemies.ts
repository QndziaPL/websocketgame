import { getRandomSpawnPointInArea } from "./helpers";
import { Position } from "@websocketgame/shared/dist/types/position";
import { Enemy } from "@websocketgame/shared/dist/types/enemy";
import { Player } from "@websocketgame/shared/dist/types/player";
import { checkCircularAreaCollision } from "../../objectMovement/objectCollision";

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
      const newEnemy = {...enemy, position: getRandomSpawnPointInArea(area)};
      newEnemies.push(newEnemy);
    }
    this.enemies.push(...newEnemies);
  };

  getEnemies = () => this.enemies;

  setEnemies = (enemies: Enemy[]) => {
    this.enemies = enemies;
  };

  performAction = (players: Player[]) => {
    const newEnemies = [...this.enemies]
    this.enemies.forEach((enemy) => {
      const newEnemy = {...enemy}
      players.forEach((player) => {
        const inSight = checkCircularAreaCollision(
            {
              position: player.position,
              collisionRadius: 1,
            },
            {position: enemy.position, collisionRadius: enemy.visionRadius}
        );

        if (inSight) {

        }

      });
      newEnemy.destination
    });
    //TODO: start here, implement checking if any player is withing range, if yes than check if you have some option
    //todo: to attack from range (probably check enemy attacks and try to pick best one off cooldown)
    //todo: if not possible move towards the closest enemy
  };

  private move = () => {
  };

  private attack = () => {
  };
}
