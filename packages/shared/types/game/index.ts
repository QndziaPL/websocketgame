import { CharactersData } from "../characters";

export interface GameData {
  charactersData: CharactersData;
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
