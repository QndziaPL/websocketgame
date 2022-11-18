import { AssetImageLoaded } from "../assets/useGameAssets";
import { GameData } from "@websocketgame/shared/dist/types/game";

export interface DrawProps {
  ctx: CanvasRenderingContext2D;
  images: AssetImageLoaded[];
  gameData: GameData;
}

export const draw: (props: DrawProps) => void = ({ ctx, images, gameData }) => {
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clears canvas before new frame render
  // // drawFloor(ctx, gameState.map, backgroundPattern);
  // gameData.charactersBaseData.basePlayers.forEach((player) => {
  //   drawPlayer(ctx, player, images);
  // });
  // drawPlayer(ctx, gameState.player, images);
  // drawPlayerProjectiles(ctx, gameState.playerProjectiles, images);
  // drawEnemies(ctx, gameState.enemies);
  // drawMapObjects(ctx, gameState.map.squares, images);
  // drawInfo(ctx, gameState);
};
