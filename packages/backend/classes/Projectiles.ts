import { Projectile } from "@websocketgame/shared/dist/projectile";
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

  moveProjectiles = () => {
    const newProjectiles: Projectile[] = [];
    this.projectiles.forEach((projectile) => {
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
