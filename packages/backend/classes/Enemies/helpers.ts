import { randomNumberBetween } from "@websocketgame/shared/dist/helpers/helpers";
import { v4 } from "uuid";
import { AreaRange } from "./Enemies";
import {
  Enemy,
  EnemyAttack,
  EnemyAttackType,
  EnemyType,
} from "@websocketgame/shared/dist/types/enemy";
import { Player } from "@websocketgame/shared/dist/types/player";
import { Position } from "@websocketgame/shared/dist/types/position";
import { lengthBetweenPoints } from "../../objectMovement/objectMovement";

export const addTestEnemy = (): Enemy => {
  const hp = randomNumberBetween(3, 6);
  const exp = randomNumberBetween(5, 10);
  const attacks: EnemyAttack[] = [
    {
      id: "1",
      name: "Basic arrow",
      cooldown: 3,
      lastTimeAttacked: 0,
      type: EnemyAttackType.RANGE,
      speed: 2,
      range: 300,
      collisionRadius: 2,
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
    speed: 0.7,
    type: EnemyType.HUMAN,
    isAttacking: false,
    name: "test enemy",
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

export const sortByClosestPlayer = (
  p1: Player,
  p2: Player,
  enemyPosition: Position
) => {
  const dist1 = lengthBetweenPoints(
    p1.position.x - enemyPosition.x,
    p1.position.y - enemyPosition.y
  );
  const dist2 = lengthBetweenPoints(
    p2.position.x - enemyPosition.x,
    p2.position.y - enemyPosition.y
  );
  if (dist1 > dist2) {
    return 1;
  }
  if (dist2 > dist1) {
    return -1;
  }
  return 0;
};
