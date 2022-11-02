import { ActionForReducer } from "../gameStateReducer";
import { Enemy, Projectile } from "../../../../types/types";

export const detectCollisions: ActionForReducer = (state, payload) => {
  const { enemies, playerProjectiles } = state;
  const newEnemies: Enemy[] = [];
  const newProjectiles: Projectile[] = [...playerProjectiles];
  let earnedExp = 0;
  enemies.forEach((enemy) => {
    const newEnemy = { ...enemy };
    const {
      position: { x, y },
      size: { width, height },
    } = newEnemy;
    const projectileHitEnemyIndex: number = newProjectiles.findIndex(
      (projectile, index) => {
        const {
          position: { x: projX, y: projY },
          size: { width: projWidth, height: projHeight },
        } = projectile;
        const projectileHitboxFactor = projWidth / 2;
        const enemyHitboxFactor = width / 2;
        const horizontalCheck =
          (projX - projectileHitboxFactor <= x + enemyHitboxFactor &&
            projX - projectileHitboxFactor >= x - enemyHitboxFactor) ||
          (projX + projectileHitboxFactor >= x - enemyHitboxFactor &&
            projX + projectileHitboxFactor <= x + enemyHitboxFactor);
        const verticalCheck =
          (projY - projectileHitboxFactor <= y + enemyHitboxFactor &&
            projY - projectileHitboxFactor >= y - enemyHitboxFactor) ||
          (projY + projectileHitboxFactor >= y - enemyHitboxFactor &&
            projY + projectileHitboxFactor <= y + enemyHitboxFactor);

        return horizontalCheck && verticalCheck;
      }
    );
    if (projectileHitEnemyIndex !== -1) {
      // projectile hits enemy
      newEnemy.hp =
        newEnemy.hp - newProjectiles[projectileHitEnemyIndex].damage;
      newProjectiles[projectileHitEnemyIndex].durability -= 1;
      if (newProjectiles[projectileHitEnemyIndex].durability < 1) {
        newProjectiles.splice(projectileHitEnemyIndex, 1);
      }
    }
    if (newEnemy.hp < 1) {
      earnedExp += newEnemy.exp;
    } else {
      newEnemies.push(newEnemy);
    }
  });
  return {
    ...state,
    enemies: newEnemies,
    player: { ...state.player, exp: state.player.exp + earnedExp },
    playerProjectiles: newProjectiles,
  };
};
