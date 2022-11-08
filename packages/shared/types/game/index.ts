import { CharactersBaseData } from "../characters";

export interface GameData {
  charactersBaseData: CharactersBaseData;
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
