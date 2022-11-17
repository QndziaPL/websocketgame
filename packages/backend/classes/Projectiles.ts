import { Projectile } from "@websocketgame/shared/dist/types/projectile";
import {
  lengthBetweenPoints,
  objectMovement,
} from "../objectMovement/objectMovement";

export default class Projectiles {
  private projectiles: Projectile[] = [];

  getProjectiles = () => {
    return [...this.projectiles];
  };

  addProjectile = (projectile: Projectile) => {
    this.projectiles.push(projectile);
  };

  removeProjectile = (id: string) => {
    const newProjectiles = [...this.projectiles];
    newProjectiles.splice(
      this.projectiles.findIndex((projectile) => projectile.id === id),
      1
    );
    this.projectiles = newProjectiles;
  };

  useDurability = (id: string) => {
    const newProjectiles = [...this.projectiles];
    const indexOfProjectile = newProjectiles.findIndex(
      (proj) => proj.id === id
    );

    newProjectiles[indexOfProjectile].durability =
      newProjectiles[indexOfProjectile].durability - 1;

    this.projectiles = newProjectiles;
  };

  moveProjectiles = () => {
    const newProjectiles: Projectile[] = [];

    this.projectiles.filter(durabilityFilter).forEach((projectile) => {
      const { newPosition, remainingLength, isDestination } = objectMovement(
        projectile.destination,
        projectile.position,
        projectile.speed
      );

      const xDif = newPosition.x - projectile.initialPosition.x;
      const yDif = newPosition.y - projectile.initialPosition.y;

      const distanceTravelled = lengthBetweenPoints(xDif, yDif);

      if (
        distanceTravelled < projectile.range &&
        projectile.position.x !== newPosition.x &&
        projectile.position.y !== newPosition.y
      ) {
        newProjectiles.push({ ...projectile, position: newPosition });
      }
    });

    this.projectiles = newProjectiles;
  };
}

const durabilityFilter = (projectile: Projectile) => projectile.durability > 0;
