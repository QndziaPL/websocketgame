import { GameMap } from "../map/types";

export const drawFloor = (
  ctx: CanvasRenderingContext2D,
  gameMap: GameMap,
  backgroundPattern?: CanvasPattern
) => {
  if (!backgroundPattern) return;
  const { topLeft, bottomRight } = gameMap.actualViewRange;
  ctx.save();
  ctx.fillStyle = backgroundPattern;
  ctx.fillRect(
    topLeft.x,
    topLeft.y,
    bottomRight.x - topLeft.x,
    bottomRight.y - topLeft.y
  );
  ctx.restore();
};
