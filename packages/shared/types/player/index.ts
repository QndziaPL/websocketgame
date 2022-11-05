import { Position } from "../position";
import { Weapon } from "../weapons";

export interface Player {
  position: Position;
  id: string;
  nick: string;
  destination?: Position;
  speed: number;
  weapon: Weapon;
  level: number;
  exp: number;
}
