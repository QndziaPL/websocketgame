import { Position } from "../position";

export enum EnemyType {
  FROG,
  HUMAN,
}

export interface Enemy {
  position: Position;
  id: string;
  name: string;
  type: EnemyType;
}
