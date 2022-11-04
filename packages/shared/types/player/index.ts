import { Position } from "../position";

export interface Player {
  position: Position;
  id: string;
  nick: string;
  destination?: Position;
  speed: number;
}
