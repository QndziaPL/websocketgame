import { GameState, GameStatus } from "../../../types/types";
import { Ak47 } from "../../../weapons/Ak47";
import { Pistol } from "../../../weapons/Pistol";
import { RPG } from "../../../weapons/RPG";
import { Uzi } from "../../../weapons/Uzi";
import { Minigun } from "../../../weapons/Minigun";
import { SniperRifle } from "../../../weapons/SniperRifle";
import { createInitialMap } from "../../../map/createInitialMap";
import { movePlayerUsingKeyboard } from "./actions/movePlayerUsingKeyboard";
import { playerShoot } from "./actions/playerShoot";
import { movePlayerProjectiles } from "./actions/movePlayerProjectiles";
import { generateEnemies } from "./actions/generateEnemies";
import { moveEnemies } from "./actions/moveEnemies";
import { detectCollisions } from "./actions/detectCollisions";
import { changeToNextWeapon } from "./actions/changeToNextWeapon";
import { movePlayerTo } from "./actions/movePlayerTo";
import { Sausage } from "../../../weapons/Sausage";

export const INITIAL_GAME_STATE: GameState = {
  map: createInitialMap(),
  status: GameStatus.RUNNING,
  player: {
    activeWeaponIndex: 0,
    hp: 10,
    level: 1,
    speed: 3,
    size: { width: 20, height: 31 }, // for now set with size of gandalf image
    position: { x: 0, y: 0 },
    weapons: [Ak47, Pistol, RPG, Uzi, Minigun, SniperRifle, Sausage],
    exp: 0,
  },
  enemies: [],
  lastTimePlayerShot: 0,
  playerProjectiles: [],
  lastTimeEnemiesGenerated: 0,
  enemiesGeneratingInterval: 5000,
};

export enum GameStateActionType {
  MOVE_PLAYER_TO = 1,
  CHANGE_TO_NEXT_WEAPON = 2,
  MOVE_PLAYER_USING_KEYBOARD = 3,
  PLAYER_SHOOT = 4,
  MOVE_PLAYER_PROJECTILES = 5,
  GENERATE_ENEMIES = 6,
  MOVE_ENEMIES = 7,
  DETECT_COLLISIONS = 8,
}

export interface GameStateAction {
  type: GameStateActionType;
  payload?: any;
}

export type ActionForReducer = (state: GameState, payload?: any) => GameState;

export const gameStateReducer: (
  state: GameState,
  action: GameStateAction
) => GameState = (state, { payload, type }) => {
  switch (type) {
    case GameStateActionType.MOVE_PLAYER_TO: {
      return movePlayerTo(state, payload);
    }
    case GameStateActionType.CHANGE_TO_NEXT_WEAPON: {
      return changeToNextWeapon(state, payload);
    }
    case GameStateActionType.MOVE_PLAYER_USING_KEYBOARD: {
      return movePlayerUsingKeyboard(state, payload);
    }
    case GameStateActionType.PLAYER_SHOOT: {
      return playerShoot(state, payload);
    }
    case GameStateActionType.MOVE_PLAYER_PROJECTILES: {
      return movePlayerProjectiles(state, payload);
    }
    case GameStateActionType.GENERATE_ENEMIES: {
      return generateEnemies(state, payload);
    }
    case GameStateActionType.MOVE_ENEMIES: {
      return moveEnemies(state, payload);
    }
    case GameStateActionType.DETECT_COLLISIONS: {
      return detectCollisions(state, payload);
    }
    //TODO: probably i will need action to change maps actualViewRange on screen resize
    default:
      return state;
  }
};
