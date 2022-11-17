import { Weapon, WeaponType } from "./index";

export const SimpleBow: Weapon = {
  name: "Bow",
  type: WeaponType.RANGED,
  attacksPerSecond: 1,
  damage: 1,
  speed: 10,
  range: 300,
  collisionRadius: 3,
};

export const weapons: Weapon[] = [SimpleBow];
