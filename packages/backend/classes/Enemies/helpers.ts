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
import {
  Projectile,
  ProjectileSource,
} from "@websocketgame/shared/dist/types/projectile";
import { BasicBowAttack, BasicMeleeAttack } from "./attacks";
import {
  MeleeAttackInstance,
  MeleeAttackSource,
} from "@websocketgame/shared/dist/types/meleeAttack";

export const addTestEnemy = (): Enemy => {
  const hp = randomNumberBetween(3, 6);
  const exp = randomNumberBetween(5, 10);

  const attacks: EnemyAttack[] = [
    { ...BasicBowAttack },
    { ...BasicMeleeAttack },
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

export type EnemyRangeAttack = Omit<EnemyAttack, "type"> & {
  type: EnemyAttackType.RANGE;
};

export const performEnemyRangeAttack = (
  addProjectile: (projectile: Projectile) => void,
  rangeAttacks: EnemyRangeAttack[],
  destination: Position,
  newCopyOfEnemy: Enemy
) => {
  const { speed, damage, range, collisionRadius, id } =
    rangeAttacks[randomNumberBetween(rangeAttacks.length - 1)];

  addProjectile({
    position: newCopyOfEnemy.position,
    speed,
    destination,
    id: v4(),
    damage,
    range,
    initialPosition: newCopyOfEnemy.position,
    collisionRadius,
    ownerId: newCopyOfEnemy.id,
    durability: 1,
    source: ProjectileSource.ENEMY,
  });

  newCopyOfEnemy.attacks[
    newCopyOfEnemy.attacks.findIndex((attack) => attack.id === id)
  ].lastTimeAttacked = Date.now();
};

export type EnemyMeleeAttack = Omit<EnemyAttack, "type"> & {
  type: EnemyAttackType.MEELE;
};

export const performEnemyMeleeAttack = (
  addMeleeAttack: (meleeAttack: MeleeAttackInstance) => void,
  meleeAttacks: EnemyMeleeAttack[],
  newCopyOfEnemy: Enemy
) => {
  const { speed, damage, range, id } =
    meleeAttacks[randomNumberBetween(meleeAttacks.length - 1)];

  addMeleeAttack({
    id: v4(),
    position: newCopyOfEnemy.position,
    speed,
    damage,
    range,
    ownerId: newCopyOfEnemy.id,
    source: MeleeAttackSource.ENEMY,
  });

  newCopyOfEnemy.attacks[
    newCopyOfEnemy.attacks.findIndex((attack) => attack.id === id)
  ].lastTimeAttacked = Date.now();

  console.log(`using melee attack with damage ${damage} and range ${range}`);
};
