import { Position } from "../position";
import { Weapon } from "../weapons";

export interface Player {
  position: Position;
  id: string;
  nick: string;
  destination?: Position;
  speed: number;
  weapon: Weapon;
  level: number;
  exp: {
    value: number;
    expForNextLevel: number;
    expForCurrentLevel: number;
  };
  skillSet: PlayerSkill[];
  isAttacking: boolean;
  lastTimeAttacked: number;
  collisionRadius: number;
  hp: number;
  maxHp: number;
  notifiedOfDeath: boolean;
  lookingTowardsDegree: number;
  // stats: BaseStats TODO: add stats like str, agi, endurance, armor blablabla
}

export interface PlayerSkill {
  id: string;
  name: string;
  lastTimeUsed: number;
  cooldown: number;
  type: PlayerSkillType;
  range: number;
}

export enum PlayerSkillType {
  AURA,
  PASSIVE,
  BASIC_ATTACK_ENHANCEMENT,
  TARGETED_SPELL,
  NON_TARGETED_SPELL,
  AOE_AROUND_PLAYER,
}
