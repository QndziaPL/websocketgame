import Players from "../classes/Players/Players";
import Enemies from "../classes/Enemies/Enemies";
import Projectiles from "../classes/Projectiles";
import { collisionsBetweenPlayersAndProjectiles } from "./collisionsBetweenPlayersAndProjectiles";
import { collisionsBetweenEnemiesAndProjectiles } from "./collisionsBetweenEnemiesAndProjectiles";
import MeleeAttacks from "../classes/MeleeAttacks";
import { collisionsBetweenPlayersAndMeleeAttacks } from "./collisionsBetweenPlayersAndMeleeAttacks";

interface CheckCollisionsProps {
  players: Players;
  enemies: Enemies;
  projectiles: Projectiles;
  meleeAttacks: MeleeAttacks;
  addMessage: (message: string) => void;
}

type CheckCollisionsFunctionType = (props: CheckCollisionsProps) => void;

export const checkCollisions: CheckCollisionsFunctionType = ({
  players,
  projectiles,
  enemies,
  addMessage,
  meleeAttacks,
}) => {
  collisionsBetweenPlayersAndProjectiles({ projectiles, players, addMessage });
  collisionsBetweenEnemiesAndProjectiles({
    enemies,
    projectiles,
    addMessage,
    playersGainExperience: players.playersGetExperience,
  });
  collisionsBetweenPlayersAndMeleeAttacks({
    meleeAttacks,
    players,
    addMessage,
  });
};
