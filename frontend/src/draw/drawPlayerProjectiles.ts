import { Projectile } from "../types/types";
import { AssetImageLoaded } from "../assets/useGameAssets";

export const drawPlayerProjectiles = (
  ctx: CanvasRenderingContext2D,
  projectiles: Projectile[],
  images: AssetImageLoaded[]
) => {
  projectiles.forEach(({ position, createShape }) => {
    createShape(ctx, position, images);
  });
};
