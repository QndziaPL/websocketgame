import { PlayerSkill, PlayerSkillType } from "../player";

export const TemporaryBaseSkill: PlayerSkill = {
  id: "testskill",
  cooldown: 2,
  lastTimeUsed: 0,
  name: "testskill",
  range: 200,
  type: PlayerSkillType.AOE_AROUND_PLAYER,
};

export type PlayerSkillSet = [
  PlayerSkill,
  PlayerSkill,
  PlayerSkill,
  PlayerSkill
];

export const sampleSkillSet: PlayerSkillSet = [
  TemporaryBaseSkill,
  TemporaryBaseSkill,
  TemporaryBaseSkill,
  TemporaryBaseSkill,
];
