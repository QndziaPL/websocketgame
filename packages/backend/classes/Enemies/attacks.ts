import { EnemyAttackType } from "@websocketgame/shared/dist/types/enemy";
import { EnemyMeleeAttack, EnemyRangeAttack } from "./helpers";

const BasicBowAttack: EnemyRangeAttack = {
  id: "1",
  name: "Basic bow attack",
  cooldown: 3,
  lastTimeAttacked: 0,
  type: EnemyAttackType.RANGE,
  speed: 2,
  range: 300,
  collisionRadius: 2,
  attacksPerSecond: 0.3,
  damage: 3,
};

const BasicMeleeAttack: EnemyMeleeAttack = {
  id: "2",
  name: "Basic melee attack",
  cooldown: 1,
  lastTimeAttacked: 0,
  type: EnemyAttackType.MEELE,
  speed: 2,
  range: 30,
  collisionRadius: 30,
  attacksPerSecond: 0.3,
  damage: 5,
};

export { BasicBowAttack, BasicMeleeAttack };
