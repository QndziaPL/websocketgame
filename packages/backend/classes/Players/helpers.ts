import { Player } from "@websocketgame/shared/dist/player";
import { getExperienceNeededForLevels } from "@websocketgame/shared/dist/player/levels";
import { SimpleBow } from "@websocketgame/shared/dist/weapons/weapons";
import { sampleSkillSet } from "@websocketgame/shared/dist/skills";

export const playerLevelUp = (player: Player): Player => {
  player.level++;
  player.exp = {
    value: player.exp.value,
    expForNextLevel: getExperienceNeededForLevels(player.level).next,
    expForCurrentLevel: getExperienceNeededForLevels(player.level).current,
  };
  player.speed += 1; // TODO: later define player classes, their perks and stat gains
  player.maxHp += 10;
  player.hp = player.maxHp;

  return player;
};

export interface CreateNewPlayerObjectProps {
  id: string;
  nick: string;
  speed: number;
}

type CreateNewPlayerObjectFunctionType = (
  props: CreateNewPlayerObjectProps
) => Player;
export const createNewPlayerObject: CreateNewPlayerObjectFunctionType = ({
  id,
  nick,
  speed,
}) => ({
  id,
  nick,
  speed,
  position: { x: 100, y: 100 },
  weapon: SimpleBow,
  exp: {
    value: 0,
    expForNextLevel: getExperienceNeededForLevels(1).next,
    expForCurrentLevel: getExperienceNeededForLevels(1).current,
  },
  level: 1,
  skillSet: sampleSkillSet,
  isAttacking: false,
  lastTimeAttacked: 0,
  collisionRadius: 15,
  hp: 10,
  maxHp: 10,
  notifiedOfDeath: false,
  lookingTowardsDegree: 0,
});
