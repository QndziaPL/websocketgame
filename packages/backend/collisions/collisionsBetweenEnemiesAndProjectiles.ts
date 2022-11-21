import Enemies from "../classes/Enemies/Enemies";
import Projectiles from "../classes/Projectiles";
import { Enemy } from "@websocketgame/shared/dist/types/enemy";
import { checkCircularAreaCollision } from "../objectMovement/objectCollision";
import { ProjectileSource } from "@websocketgame/shared/dist/types/projectile";

interface CollisionsBetweenEnemiesAndProjectilesProps {
  enemies: Enemies;
  projectiles: Projectiles;
  addMessage: (message: string) => void;
  playersGainExperience: (exp: number) => void;
}

type CollisionBetweenEnemiesAndProjectilesFunctionType = (
  props: CollisionsBetweenEnemiesAndProjectilesProps
) => void;

export const collisionsBetweenEnemiesAndProjectiles: CollisionBetweenEnemiesAndProjectilesFunctionType =
  ({ enemies, projectiles, addMessage, playersGainExperience }) => {
    const newEnemies: Enemy[] = [];
    enemies.getEnemies().forEach((enemy) => {
      const newEnemy = { ...enemy };
      const projectileCollided = projectiles
        .getProjectiles()
        .filter(
          ({ source }) =>
            source === ProjectileSource.PLAYER ||
            source === ProjectileSource.ENEMY
        )
        .find((projectile) =>
          checkCircularAreaCollision(
            {
              position: enemy.position,
              collisionRadius: enemy.collisionRadius,
            },
            {
              position: projectile.position,
              collisionRadius: projectile.collisionRadius,
            }
          )
        );
      if (projectileCollided) {
        projectiles.useDurability(projectileCollided.id);
        newEnemy.hp = newEnemy.hp - projectileCollided.damage;
        addMessage(`${enemy.name} lost ${projectileCollided.damage} hp`);
      }
      if (newEnemy.hp <= 0) {
        playersGainExperience(enemy.exp);
        addMessage(`${enemy.name} was killed`);
      } else {
        newEnemies.push(newEnemy);
      }
    });
    enemies.setEnemies(newEnemies);
  };
