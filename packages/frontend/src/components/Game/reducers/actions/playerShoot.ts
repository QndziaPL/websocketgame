import { ActionForReducer } from "../gameStateReducer";
import { GameStatus, Projectile } from "../../../../types/types";
import { enoughTimePassedSinceLastShot } from "../../helpers/enoughTimePassedSinceLastShot";
import { calculateProjectileDirectionMoveFactor } from "../../helpers/calculateProjectileDirectionMoveFactor";
import { createProjectileShape } from "../../../../weapons/helpers/createProjectileShape";

export const playerShoot: ActionForReducer = (state, payload) => {
  const { player } = state;
  const { weapons, activeWeaponIndex } = state.player;
  const activeWeapon = weapons[activeWeaponIndex];
  if (
    state.status === GameStatus.RUNNING &&
    enoughTimePassedSinceLastShot(
      activeWeapon.fireRatePerSecond,
      state.lastTimePlayerShot
    )
  ) {
    const projectile: Projectile = {
      damage: activeWeapon.damage,
      speed: activeWeapon.speed,
      position: player.position,
      size: activeWeapon.projectileSize,
      directionMoveFactor: calculateProjectileDirectionMoveFactor(
        payload.mousePosition,
        player.position,
        activeWeapon.speed
      ),
      color: activeWeapon.projectileColor,
      createShape: createProjectileShape(
        player.position,
        payload.mousePosition,
        activeWeapon.projectileSize,
        activeWeapon.projectileColor,
        activeWeapon.projectileImageName,
        activeWeapon.projectileImageScalingRatio
      ),
      durability: activeWeapon.projectileDurability,
    };
    const newProjectiles = [...state.playerProjectiles, projectile];
    return {
      ...state,
      lastTimePlayerShot: Date.now(),
      playerProjectiles: newProjectiles,
    };
  }
  return state;
};
