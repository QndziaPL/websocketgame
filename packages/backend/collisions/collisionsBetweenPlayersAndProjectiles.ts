import Players from "../classes/Players";
import Projectiles from "../classes/Projectiles";
import { Player } from "@websocketgame/shared/dist/player";
import { checkObjectCollision } from "../objectMovement/objectCollision";
import { ProjectileSource } from "@websocketgame/shared/dist/projectile";

interface CollisionsBetweenPlayersAndProjectilesProps {
  players: Players;
  projectiles: Projectiles;
  addMessage: (message: string) => void;
}

type CollisionsBetweenPlayersAndProjectilesFunctionType = (
  props: CollisionsBetweenPlayersAndProjectilesProps
) => void;

export const collisionsBetweenPlayersAndProjectiles: CollisionsBetweenPlayersAndProjectilesFunctionType =
  ({ projectiles, players, addMessage }) => {
    const newPlayers: Player[] = [];
    players.getPlayers().forEach((player) => {
      const newPlayer = { ...player };
      const projectileCollided = projectiles
        .getProjectiles()
        .filter(({ source }) => source === ProjectileSource.ENEMY)
        .find((projectile) =>
          checkObjectCollision(
            {
              position: player.position,
              collisionRadius: player.collisionRadius,
            },
            {
              position: projectile.position,
              collisionRadius: projectile.collisionRadius,
            }
          )
        );
      if (
        player.hp > 0 &&
        projectileCollided &&
        projectileCollided.ownerId !== player.id
      ) {
        projectiles.useDurability(projectileCollided.id);
        newPlayer.hp = newPlayer.hp - projectileCollided.damage;
        addMessage(`${player.nick} lost ${projectileCollided.damage}hp`);
      }

      newPlayers.push(newPlayer);

      if (newPlayer.hp <= 0 && !newPlayer.notifiedOfDeath) {
        addMessage(`Player ${newPlayer.nick} is a piece of shit`);
        newPlayer.notifiedOfDeath = true;
      }
    });
    players.setPlayers(newPlayers);
  };
