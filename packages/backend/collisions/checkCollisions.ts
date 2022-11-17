import Players from "../classes/Players";
import Enemies from "../classes/Enemies";
import Projectiles from "../classes/Projectiles";
import { collisionsBetweenPlayersAndProjectiles } from "./collisionsBetweenPlayersAndProjectiles";
import { collisionsBetweenEnemiesAndProjectiles } from "./collisionsBetweenEnemiesAndProjectiles";

interface CheckCollisionsProps {
  players: Players;
  enemies: Enemies;
  projectiles: Projectiles;
  addMessage: (message: string) => void;
}

type CheckCollisionsFunctionType = (props: CheckCollisionsProps) => void;

export const checkCollisions: CheckCollisionsFunctionType = ({
  players,
  projectiles,
  enemies,
  addMessage,
}) => {
  collisionsBetweenPlayersAndProjectiles({ projectiles, players, addMessage });
  collisionsBetweenEnemiesAndProjectiles({
    enemies,
    projectiles,
    addMessage,
    playersGainExperience: players.playersGetExperience,
  });
};
