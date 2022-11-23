import {
  EnemyMeleeAttack,
  EnemyRangeAttack,
  getRandomSpawnPointInArea,
  performEnemyMeleeAttack,
  performEnemyRangeAttack,
  sortByClosestPlayer,
} from "./helpers";
import { Position } from "@websocketgame/shared/dist/types/position";
import { Enemy, EnemyAttackType } from "@websocketgame/shared/dist/types/enemy";
import { Player } from "@websocketgame/shared/dist/types/player";
import { checkCircularAreaCollision } from "../../objectMovement/objectCollision";
import { lengthBetweenPoints } from "../../objectMovement/objectMovement";
import Projectiles from "../Projectiles";
import { moveCharacters } from "../../characterMovement/characterMovement";
import { MeleeAttackInstance } from "@websocketgame/shared/dist/types/meleeAttack";

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
      const playersSortedByDistanceFromEnemy = players.sort((p1, p2) =>
        sortByClosestPlayer(p1, p2, enemy.position)
      );

      const player = playersSortedByDistanceFromEnemy[0];

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

        const rangeAttacks = attacksOffCooldown.filter(
          ({ type }) => type === EnemyAttackType.RANGE
        ) as EnemyRangeAttack[];

        const meleeAttacks = attacksOffCooldown.filter(
          ({ type }) => type === EnemyAttackType.MEELE
        ) as EnemyMeleeAttack[];

        if (rangeAttacks.length) {
          performEnemyRangeAttack(
            projectiles.addProjectile,
            rangeAttacks,
            player.position,
            newEnemy
          );
        } else if (meleeAttacks.length) {
          const mockAddMeleeAttack = (meleeAttack: MeleeAttackInstance) => {
            console.log(meleeAttack);
          };
          performEnemyMeleeAttack(mockAddMeleeAttack, meleeAttacks, newEnemy);
        } else {
          newEnemy.destination = player.position;
        }
      }
      newEnemies.push(newEnemy);
    });

    this.enemies = newEnemies;
  };

  moveEnemies = () => {
    moveCharacters(this.enemies);
  };

  private attack = () => {};
}
