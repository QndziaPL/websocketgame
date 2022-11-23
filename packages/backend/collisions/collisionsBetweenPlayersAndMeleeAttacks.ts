import Players from "../classes/Players/Players";
import MeleeAttacks from "../classes/MeleeAttacks";
import { Player } from "@websocketgame/shared/dist/types/player";
import { MeleeAttackSource } from "@websocketgame/shared/dist/types/meleeAttack";
import { checkCircularAreaCollision } from "../objectMovement/objectCollision";

interface CollisionsBetweenPlayersAndMeleeAttacksProps {
  players: Players;
  meleeAttacks: MeleeAttacks;
  addMessage: (message: string) => void;
}

type CollisionBetweenPlayersAndMeleeAttacksFunctionType = (
  props: CollisionsBetweenPlayersAndMeleeAttacksProps
) => void;

export const collisionsBetweenPlayersAndMeleeAttacks: CollisionBetweenPlayersAndMeleeAttacksFunctionType =
  ({ meleeAttacks, players, addMessage }) => {
    const newPlayers: Player[] = [];
    players.getPlayers().forEach((player) => {
      const newPlayer = { ...player };
      const meleeAttacksCollided = meleeAttacks
        .getMeleeAttacks()
        .filter(({ source }) => source === MeleeAttackSource.ENEMY)
        .filter(({ dealtDamage }) => !dealtDamage)
        .filter((attack) =>
          checkCircularAreaCollision(
            {
              position: player.position,
              collisionRadius: player.collisionRadius,
            },
            {
              position: attack.position,
              collisionRadius: attack.range,
            }
          )
        );
      meleeAttacksCollided.forEach((attack) => {
        meleeAttacks.setDealtDamageToTrue(attack.id);

        if (player.hp > 0) {
          newPlayer.hp = newPlayer.hp - attack.damage;
          addMessage(`${player.nick} lost ${attack.damage}hp (melee attack)`);
        }
      });

      newPlayers.push(newPlayer);
    });
    players.setPlayers(newPlayers);
  };
