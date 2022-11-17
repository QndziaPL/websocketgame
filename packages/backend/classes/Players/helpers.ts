import { Player } from "@websocketgame/shared/dist/player";
import { getExperienceNeededForLevels } from "@websocketgame/shared/dist/player/levels";

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
