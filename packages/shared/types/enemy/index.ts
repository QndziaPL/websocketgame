import { Position } from "../position";

export enum EnemyType {
  FROG,
  HUMAN,
}

export enum EnemyAttackType {
  MEELE,
  RANGE,
}

export interface EnemyAttack {
  id: string;
  name: string;
  cooldown: number;
  lastTimeAttacked: number;
  type: EnemyAttackType;
  speed: number;
  range: number;
  attacksPerSecond: number;
  damage: number;
}

export interface Enemy {
  position: Position;
  destination?: Position;
  lookingTowardsDegree: number;
  id: string;
  name: string;
  type: EnemyType;
  damage: number;
  hp: number;
  maxHp: number;
  collisionRadius: number;
  isAttacking: boolean;
  attacks: EnemyAttack[];
  speed: number;
  exp: number;
  visionRadius: number;
}

export interface EnemiesBaseData {
  baseEnemies: BaseEnemy[];
}

export type BaseEnemy = Pick<
  Enemy,
  | "position"
  | "name"
  | "hp"
  | "maxHp"
  | "collisionRadius"
  | "lookingTowardsDegree"
  | "visionRadius"
>;
