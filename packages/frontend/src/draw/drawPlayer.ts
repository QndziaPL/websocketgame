import { Player } from "../types/types";
import { AssetImageLoaded, AssetImageName } from "../assets/useGameAssets";

export const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  player: Player,
  images: AssetImageLoaded[]
) => {
  const img = images.find(
    ({ name }) => name === AssetImageName.PLAYER_SKIN_GANDALF
  )?.img;
  if (!img) return;
  const { height, width } = player.size;
  const { x, y } = player.position;
  const { weapons, activeWeaponIndex } = player;
  ctx.save();
  ctx.font = "30px Arial";
  ctx.fillText(weapons[activeWeaponIndex].name, x - width / 2, y - height / 2);
  ctx.drawImage(img, x - width / 2, y - height / 2);
  ctx.restore();
};
