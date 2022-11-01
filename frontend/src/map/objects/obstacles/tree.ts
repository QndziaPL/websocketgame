import { CreateObstacleFunction, MapObjectType } from "../../types";
import { Position, Size } from "../../../types/types";
import { randomNumberBetween } from "../../../helpers/helpers";
import {
  AssetImageLoaded,
  AssetImageName,
} from "../../../assets/useGameAssets";

export const renderTree = (
  ctx: CanvasRenderingContext2D,
  position: Position,
  size: Size,
  images: AssetImageLoaded[]
) => {
  const img = images.find(
    ({ name }) => name === AssetImageName.OBSTACLE_TREE
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
  ctx.restore();
};

export const Tree: CreateObstacleFunction = (position) => {
  const sizeFactor = randomNumberBetween(15, 8) / 10;
  const size = { width: 150 * sizeFactor, height: 187 * sizeFactor }; // based on bmp
  return {
    position,
    destroyable: true,
    size,
    type: MapObjectType.OBSTACLE,
    render: (ctx, images) => renderTree(ctx, position, size, images),
    hp: 5,
  };
};
