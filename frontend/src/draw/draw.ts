import { GameState, Position } from "../types/types";
import { drawPlayer } from "./drawPlayer";
import { drawPlayerProjectiles } from "./drawPlayerProjectiles";
import { drawInfo } from "./drawInfo";
import { drawEnemies } from "./drawEnemies";
import { drawMapObjects } from "./drawMapObjects";
import { AssetImageLoaded } from "../assets/useGameAssets";
import { drawFloor } from "./drawFloor";

export interface DrawProps {
  ctx: CanvasRenderingContext2D;
  mousePosition: Position;
  mouseDown: boolean;
  gameState: GameState;
  backgroundPattern?: CanvasPattern;
  images: AssetImageLoaded[];
}

export const draw: (props: DrawProps) => void = ({
  gameState,
  ctx,
  mousePosition,
  mouseDown,
  backgroundPattern,
  images,
}) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clears canvas before new frame render
  drawFloor(ctx, gameState.map, backgroundPattern);
  drawPlayer(ctx, gameState.player, images);
  drawPlayerProjectiles(ctx, gameState.playerProjectiles, images);
  drawEnemies(ctx, gameState.enemies);
  drawMapObjects(ctx, gameState.map.squares, images); // probably need to optimize it, only render active screens
  drawInfo(ctx, gameState);
};
