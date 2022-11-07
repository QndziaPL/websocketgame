export enum WeaponType {
  MELEE,
  RANGED,
}

export interface Weapon {
  name: string;
  type: WeaponType;
  damage: number;
  attacksPerSecond: number;
  speed: number;
  range: number;
  collisionRadius: number;
}
