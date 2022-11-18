import { FunctionWithSavedRotationOfProjectile, Size } from "../../types/types";
import { AssetImageLoaded, AssetImageName } from "../../assets/useGameAssets";
import { Position } from "@websocketgame/shared/dist/types/position";

export const createProjectileShape: FunctionWithSavedRotationOfProjectile = (
  projectilePosition, // when shoot these values are just center of player
  mousePosition,
  projectileSize,
  projectileColor = "#000000",
  projectileImageName,
  projectileImageScalingRatio
) => {
  const angle =
    Math.atan2(
      projectilePosition.y - mousePosition.y,
      projectilePosition.x - mousePosition.x
    ) +
    -90 * (Math.PI / 180);

  return (
    ctx: CanvasRenderingContext2D,
    projectilePosition: Position,
    images: AssetImageLoaded[]
  ) =>
    createShapeBasedOnSavedRotation(
      angle,
      ctx,
      projectilePosition,
      projectileSize,
      projectileColor,
      images,
      projectileImageName,
      projectileImageScalingRatio
    );
};

const createShapeBasedOnSavedRotation = (
  rotationInRadians: number,
  ctx: CanvasRenderingContext2D,
  projectilePosition: Position,
  projectileSize: Size,
  projectileColor: string,
  images: AssetImageLoaded[],
  projectileImageName?: AssetImageName,
  projectileImageScalingRatio: number = 1
) => {
  if (projectileImageName) {
    const img = images.find(({ name }) => name === projectileImageName)?.img;
    if (!img) return;
    ctx.save();
    ctx.translate(projectilePosition.x, projectilePosition.y);
    ctx.rotate(rotationInRadians);
    ctx.translate(-projectilePosition.x, -projectilePosition.y);
    ctx.drawImage(
      img,
      projectilePosition.x -
        (projectileSize.width * projectileImageScalingRatio) / 2,
      projectilePosition.y -
        (projectileSize.height * projectileImageScalingRatio) / 2,
      projectileSize.width * projectileImageScalingRatio,
      projectileSize.height * projectileImageScalingRatio
    );
    ctx.restore();
  } else {
    const topLeftX = projectilePosition.x - projectileSize.width / 2;
    const topLeftY = projectilePosition.y - projectileSize.height / 2;
    ctx.save();
    ctx.translate(projectilePosition.x, projectilePosition.y);
    ctx.rotate(rotationInRadians);
    ctx.translate(-projectilePosition.x, -projectilePosition.y);
    ctx.fillStyle = projectileColor;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect(topLeftX, topLeftY, projectileSize.width, projectileSize.height);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(topLeftX, topLeftY);
    ctx.lineTo(
      topLeftX + projectileSize.width / 2,
      topLeftY - projectileSize.height / 2
    );
    ctx.lineTo(topLeftX + projectileSize.width, topLeftY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
};
