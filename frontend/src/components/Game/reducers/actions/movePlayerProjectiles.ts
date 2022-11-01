import { ActionForReducer } from "../gameStateReducer";
import { Projectile } from "../../../../types/types";
import { isProjectileInGameArea } from "../../helpers/isProjectileInGameArea";

export const movePlayerProjectiles: ActionForReducer = (state, payload) => {
  const newProjectiles: Projectile[] = [];
  state.playerProjectiles.forEach((projectile) => {
    const { position, size, directionMoveFactor } = projectile;
    if (isProjectileInGameArea(position, payload.windowSize, size)) {
      const newProjectile: Projectile = {
        ...projectile,
        position: {
          x: position.x + directionMoveFactor.x,
          y: position.y + directionMoveFactor.y,
        },
      };
      newProjectiles.push(newProjectile);
    }
  });
  return { ...state, playerProjectiles: newProjectiles };
};
