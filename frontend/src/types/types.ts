import { GameMap } from "../map/types";
import { AssetImageLoaded, AssetImageName } from "../assets/useGameAssets";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface PlayerMovementKeys {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export interface Projectile {
  position: Position;
  speed: number;
  damage: number;
  directionMoveFactor: Position;
  size: Size;
  color: string;
  createShape: RenderProjectileFromSavedRotation;
  durability: number;
}

export type FunctionWithSavedRotationOfProjectile = (
  projectilePosition: Position,
  mousePosition: Position,
  projectileSize: Size,
  projectileColor?: string,
  projectileImageName?: AssetImageName,
  projectileImageScalingRatio?: number
) => RenderProjectileFromSavedRotation;

export type RenderProjectileFromSavedRotation = (
  ctx: CanvasRenderingContext2D,
  projectilePosition: Position,
  images: AssetImageLoaded[]
) => void;

export enum GameStatus {
  RUNNING = 1,
  PAUSED = 2,
  OVER = 3,
}

export interface GameState {
  status: GameStatus;
  lastTimePlayerShot: number;
  player: Player;
  playerProjectiles: Projectile[];
  enemies: Enemy[];
  lastTimeEnemiesGenerated: number;
  enemiesGeneratingInterval: number;
  map: GameMap;
}

export interface Player {
  level: number;
  position: Position;
  hp: number;
  size: Size;
  speed: number;
  weapons: Weapon[];
  activeWeaponIndex: number;
  exp: number;
}

export interface ObjectColors {
  main: string;
  secondary?: string;
  additional?: string[];
}

export interface Enemy {
  position: Position;
  name: string;
  speed: number;
  hp: number;
  damage: number;
  size: Size;
  exp: number;
  color: ObjectColors;
}

export interface Weapon {
  fireRatePerSecond: number;
  speed: number;
  name: string;
  projectileSize: Size;
  projectileColor: string;
  damage: number;
  projectileDurability: number;
  projectileImageName?: AssetImageName;
  projectileImageScalingRatio?: number;
}
