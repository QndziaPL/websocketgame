import { Position } from "../position";

export interface Projectile {
  id: string;
  damage: number;
  range: number;
  speed: number;
  position: Position;
  destination: Position;
  initialPosition: Position;
  collisionRadius: number;
}
