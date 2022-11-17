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
  type: EnemyAttackType;
}

export interface Enemy {
  position: Position;
  lookingTowardsDegree: number;
  id: string;
  name: string;
  type: EnemyType;
  damage: number;
  hp: number;
  maxHp: number;
  collisionRadius: number;
  lastTimeAttacked: number;
  isAttacking: boolean;
  attacks: EnemyAttack[];
  speed: number;
  exp: number;
}

export interface EnemiesBaseData {
  baseEnemies: BaseEnemy[];
}

export type BaseEnemy = Pick<
  Enemy,
  "position" | "name" | "hp" | "maxHp" | "collisionRadius"
>;
