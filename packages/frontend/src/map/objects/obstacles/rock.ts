import { CreateObstacleFunction, MapObjectType } from "../../types";
import { Size } from "../../../types/types";
import { randomNumberBetween } from "../../../../../shared/helpers/helpers";
import {
  AssetImageLoaded,
  AssetImageName,
} from "../../../assets/useGameAssets";
import { Position } from "@websocketgame/shared/dist/types/position";

const renderRock = (
  ctx: CanvasRenderingContext2D,
  position: Position,
  size: Size,
  images: AssetImageLoaded[]
) => {
  const img = images.find(
    ({ name }) => name === AssetImageName.OBSTACLE_ROCK
  )?.img;
  if (!img) return;

  ctx.save();
  ctx.drawImage(
    img,
    position.x - size.width / 2,
    position.y - size.height / 2,
    size.width,
    size.height
  );
  ctx.strokeStyle = "black";

  ctx.restore();
};

export const Rock: CreateObstacleFunction = (position) => {
  const sizeFactor = randomNumberBetween(20, 3) / 10;
  const size = { width: 100 * sizeFactor, height: 77 * sizeFactor }; // based on bmp

  return {
    type: MapObjectType.OBSTACLE,
    position,
    destroyable: false,
    size,
    hp: 1,
    render: (ctx, images) => renderRock(ctx, position, size, images),
  };
};
