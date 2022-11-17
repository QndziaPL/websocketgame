import { Player } from "@websocketgame/shared/dist/player";
import { getExperienceForLevelUpSteps } from "@websocketgame/shared/dist/player/levels";

export const playerLevelUp = (player: Player): Player => {
  player.level++;
  player.expForNextLevel = getExperienceForLevelUpSteps(player.level);
  player.speed += 1; // TODO: later define player classes, their perks and stat gains
  player.maxHp += 10;
  player.hp = player.maxHp;

  return player;
};
