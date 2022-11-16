import { CharactersBaseData } from "../characters";
import { EnemiesBaseData } from "../enemy";

export interface GameData {
  charactersBaseData: CharactersBaseData;
  enemiesBaseData: EnemiesBaseData;
}

export enum MessageToFrontendType {
  BASIC,
}

export interface MessageToFrontend {
  id: string;
  content: string;
  date: number;
  type: MessageToFrontendType;
}
