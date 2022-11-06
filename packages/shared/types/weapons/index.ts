export enum WeaponType {
  MELEE,
  RANGED,
}

export interface Weapon {
  name: string;
  type: WeaponType;
  damage: number;
  attacksPerSecond: number;
}
