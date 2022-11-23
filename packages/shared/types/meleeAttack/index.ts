import { Position } from "../position";

export interface MeleeAttack {
  id: string;
  damage: number;
  range: number;
  speed: number;
  position: Position;
  ownerId: string;
  source: MeleeAttackSource;
  whenPerformed: number;
  animationTime: number;
  dealtDamage: boolean;
}

export enum MeleeAttackSource {
  PLAYER = "player",
  ENEMY = "enemy",
  NPC = "npc",
}
