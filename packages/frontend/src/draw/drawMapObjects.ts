import { MapSquare } from "../map/types";
import { AssetImageLoaded } from "../assets/useGameAssets";

//TODO: this is super not efficient now
export const drawMapObjects = (
  ctx: CanvasRenderingContext2D,
  mapSquares: MapSquare[],
  images: AssetImageLoaded[]
) => {
  mapSquares.forEach(({ objects }) => {
    objects.forEach((object) => {
      object.render(ctx, images);
    });
  });
};
