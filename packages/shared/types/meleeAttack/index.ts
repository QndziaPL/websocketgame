import { Position } from "../position";

export interface MeleeAttackInstance {
  id: string;
  damage: number;
  range: number;
  speed: number;
  position: Position;
  ownerId: string;
  source: MeleeAttackSource;
}

export enum MeleeAttackSource {
  PLAYER = "player",
  ENEMY = "enemy",
  NPC = "npc",
}
