import { ActionForReducer } from "../gameStateReducer";
import { randomNumberBetween } from "../../../../helpers/helpers";
import { Enemy } from "../../../../types/types";
import { generateRandomEnemyPosition } from "../../../../generators/generateRandomEnemyPosition";

export const generateEnemies: ActionForReducer = (state, payload) => {
  const { enemies, lastTimeEnemiesGenerated, enemiesGeneratingInterval } =
    state;
  if (Date.now() - lastTimeEnemiesGenerated >= enemiesGeneratingInterval) {
    const numberOfEnemiesToGenerate = randomNumberBetween(7, 2);
    const newEnemies = [...enemies];
    for (let i = 0; i < numberOfEnemiesToGenerate; i++) {
      const enemy: Enemy = {
        name: "test enemy",
        size: { width: 30, height: 30 },
        hp: 1,
        speed: 1,
        damage: 1,
        position: generateRandomEnemyPosition(payload.windowSize),
        exp: 5,
        color: { main: "#ff0000" },
      };
      const speedyGonzalez: Enemy = {
        name: "Speedy Gonzalez",
        size: { width: 20, height: 50 },
        hp: 1,
        speed: 2,
        damage: 1,
        position: generateRandomEnemyPosition(payload.windowSize),
        exp: 10,
        color: { main: "#f6a818" },
      };
      newEnemies.push(enemy, speedyGonzalez);
    }
    return {
      ...state,
      enemies: newEnemies,
      lastTimeEnemiesGenerated: Date.now(),
    };
  }
  return state;
};
