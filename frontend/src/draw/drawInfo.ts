import { GameState } from "../types/types";

export const drawInfo = (
  ctx: CanvasRenderingContext2D,
  gameState: GameState
) => {
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = "#efefef";
  ctx.fillRect(5, 5, 290, 90);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "black";
  ctx.font = "15px Arial";
  ctx.fillText("Use W,S,A and D or Arrow Keys to move", 10, 20);
  ctx.fillText("Press X to change weapon", 10, 40);
  ctx.fillText("Click mouse to shoot", 10, 60);
  ctx.fillText(`Exp: ${gameState.player.exp}`, 10, 80);
  ctx.restore();
};
