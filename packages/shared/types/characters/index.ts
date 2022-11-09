import { Player } from "../player";

export interface CharactersBaseData {
  basePlayers: BasePlayer[];
}

export type BasePlayer = Pick<
  Player,
  | "position"
  | "id"
  | "nick"
  | "hp"
  | "maxHp"
  | "destination"
  | "collisionRadius"
  | "lookingTowardsDegree"
>;

export type MyPlayerForFrontend = Pick<
  Player,
  "hp" | "exp" | "expForNextLevel" | "maxHp" | "weapon" | "level"
>;
