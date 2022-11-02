import { ActionForReducer } from "../gameStateReducer";
import { calculateEnemyDirectionMoveFactor } from "../../helpers/calculateProjectileDirectionMoveFactor";

export const moveEnemies: ActionForReducer = (state, payload) => {
  const newEnemies = state.enemies.map((enemy) => {
    const { position, speed } = enemy;
    const moveFactor = calculateEnemyDirectionMoveFactor(
      state.player.position,
      position,
      speed
    );
    return {
      ...enemy,
      position: {
        x: position.x + moveFactor.x,
        y: position.y + moveFactor.y,
      },
    };
  });
  return { ...state, enemies: newEnemies };
};
