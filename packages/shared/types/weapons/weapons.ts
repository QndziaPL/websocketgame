import { Weapon, WeaponType } from "./index";

export const SimpleBow: Weapon = {
  name: "Bow",
  type: WeaponType.RANGED,
  attacksPerSecond: 1,
  damage: 1,
  speed: 50,
  range: 1000,
  collisionRadius: 5,
};

export const weapons: Weapon[] = [SimpleBow];
