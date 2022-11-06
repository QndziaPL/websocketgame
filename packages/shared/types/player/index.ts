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
  exp: number;
  skillSet: PlayerSkill[];
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
