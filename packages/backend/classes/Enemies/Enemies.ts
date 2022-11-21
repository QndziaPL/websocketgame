import { getRandomSpawnPointInArea } from "./helpers";
import { Position } from "@websocketgame/shared/dist/types/position";
import { Enemy, EnemyAttackType } from "@websocketgame/shared/dist/types/enemy";
import { Player } from "@websocketgame/shared/dist/types/player";
import { checkCircularAreaCollision } from "../../objectMovement/objectCollision";
import {
  lengthBetweenPoints,
  objectMovement,
} from "../../objectMovement/objectMovement";
import Projectiles from "../Projectiles";
import { v4 } from "uuid";
import { ProjectileSource } from "@websocketgame/shared/dist/types/projectile";

export interface AreaRange {
  topLeftPointOfArea: Position;
  rightBottomPointOfArea: Position;
}

export default class Enemies {
  private enemies: Enemy[] = [];

  addNewEnemies = (enemy: Enemy, numberOfEnemies: number, area: AreaRange) => {
    if (this.enemies.length > 20) return;
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

  performAction = (players: Player[], projectiles: Projectiles) => {
    const newEnemies: Enemy[] = [];
    this.enemies.forEach((enemy) => {
      const newEnemy = { ...enemy };
      players.forEach((player) => {
        const inSight = checkCircularAreaCollision(
          {
            position: player.position,
            collisionRadius: 1,
          },
          { position: enemy.position, collisionRadius: enemy.visionRadius }
        );

        if (inSight) {
          const attacksInRange = enemy.attacks.filter(
            ({ range }) =>
              range >=
              lengthBetweenPoints(
                enemy.position.x - player.position.x,
                enemy.position.y - player.position.y
              )
          );

          const attacksOffCooldown = attacksInRange.filter(
            ({ lastTimeAttacked, cooldown }) =>
              Date.now() - lastTimeAttacked > cooldown * 1000
          );

          if (
            attacksOffCooldown.length &&
            attacksOffCooldown[0].type === EnemyAttackType.RANGE
          ) {
            //TODO: temporarily i will trigger only first range attack
            const { speed, collisionRadius, range, id, damage } =
              attacksOffCooldown[0];
            projectiles.addProjectile({
              position: enemy.position,
              speed,
              destination: player.position,
              id: v4(),
              damage,
              range,
              initialPosition: enemy.position,
              collisionRadius,
              ownerId: enemy.id,
              durability: 1,
              source: ProjectileSource.ENEMY,
            });
            newEnemy.attacks[
              newEnemy.attacks.findIndex((attack) => attack.id === id)
            ].lastTimeAttacked = Date.now();
          } else {
            //TODO: later add logic for choosing attacks available etc
            newEnemy.destination = player.position;
          }
        }
        newEnemies.push(newEnemy);
      });
    });

    this.enemies = newEnemies;
    //TODO: start here, implement checking if any player is withing range, if yes than check if you have some option
    //todo: to attack from range (probably check enemy attacks and try to pick best one off cooldown)
    //todo: if not possible move towards the closest enemy
  };

  moveEnemies = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      const { destination, position, speed } = this.enemies[i];
      if (destination) {
        const { newPosition, isDestination } = objectMovement(
          destination,
          position,
          speed
        );

        if (isDestination) {
          this.enemies[i].position = destination;
          this.enemies[i].destination = undefined;
        } else {
          this.enemies[i].position = newPosition;
        }
      }
    }
  };

  private attack = () => {};
}
