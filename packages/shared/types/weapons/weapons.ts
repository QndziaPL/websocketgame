import { Weapon, WeaponType } from "./index";

export const SimpleBow: Weapon = {
  name: "Bow",
  type: WeaponType.RANGED,
  cooldown: 1,
  damage: 2,
};
export const weapons: Weapon[] = [SimpleBow];
