import { AssetImageLoaded, AssetImageName } from "../assets/useGameAssets";
import { BasePlayer } from "@websocketgame/shared/dist/types/characters";

export const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  player: BasePlayer,
  images: AssetImageLoaded[]
) => {
  const img = images.find(
    ({ name }) => name === AssetImageName.PLAYER_SKIN_GANDALF
  )?.img;
  if (!img) return;
  // const { height, width } = player.size;
  const width = 40,
    height = 40;
  const { x, y } = player.position;
  // const { weapons, activeWeaponIndex } = player;
  ctx.save();
  ctx.font = "30px Arial";
  // ctx.fillText(weapons[activeWeaponIndex].name, x - width / 2, y - height / 2);
  ctx.drawImage(img, x, y);
  // ctx.drawImage(img, x - width / 2, y - height / 2);
  ctx.restore();
};
