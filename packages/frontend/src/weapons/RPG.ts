import { Weapon } from "../types/types";

export const RPG: Weapon = {
  name: "RPG",
  speed: 5,
  projectileColor: "#6b6b6b",
  projectileSize: { width: 11, height: 16 },
  fireRatePerSecond: 0.5,
  damage: 20,
  projectileDurability: 10,
};
