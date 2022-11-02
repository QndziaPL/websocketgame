import { Enemy } from "../types/types";

export const drawEnemies = (
  ctx: CanvasRenderingContext2D,
  enemies: Enemy[]
) => {

  ctx.save();
  enemies.forEach(({ position: { x, y }, size, color}) => {
    ctx.beginPath();
    ctx.fillStyle = color.main;
    ctx.rect(x - size.width / 2, y - size.height / 2, size.width, size.height);
    ctx.fill();
    ctx.closePath();
  });
  ctx.restore();
};
