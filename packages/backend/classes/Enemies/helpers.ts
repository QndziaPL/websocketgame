import { randomNumberBetween } from "@websocketgame/shared/dist/helpers/helpers";
import { v4 } from "uuid";
import { AreaRange } from "./Enemies";
import {
  Enemy,
  EnemyAttack,
  EnemyAttackType,
  EnemyType,
} from "@websocketgame/shared/dist/types/enemy";

export const addTestEnemy = (): Enemy => {
  const hp = randomNumberBetween(3, 6);
  const exp = randomNumberBetween(5, 10);
  const attacks: EnemyAttack[] = [
    {
      id: "1",
      name: "Basic arrow",
      cooldown: 2,
      type: EnemyAttackType.RANGE,
      speed: 0.2,
      range: 300,
      collisionRadius: 5,
      attacksPerSecond: 0.3,
      damage: 3,
    },
  ];
  return {
    position: { x: 0, y: 0 },
    hp,
    maxHp: hp,
    id: v4(),
    damage: 2,
    collisionRadius: 15,
    lookingTowardsDegree: 0,
    speed: 2,
    type: EnemyType.HUMAN,
    isAttacking: false,
    name: "test enemy",
    lastTimeAttacked: 0,
    attacks,
    exp,
    visionRadius: 400,
  };
};

export const getRandomSpawnPointInArea = ({
  topLeftPointOfArea,
  rightBottomPointOfArea,
}: AreaRange) => {
  const x = Math.floor(
    Math.random() * (rightBottomPointOfArea.x - topLeftPointOfArea.x) +
      topLeftPointOfArea.x
  );
  const y = Math.floor(
    Math.random() * (rightBottomPointOfArea.y - topLeftPointOfArea.y) +
      topLeftPointOfArea.y
  );

  return { x, y };
};
