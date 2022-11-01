import { Weapon } from "../types/types";
import { AssetImageName } from "../assets/useGameAssets";

export const Sausage: Weapon = {
  name: "Sausage",
  speed: 3,
  projectileColor: "#88734b",
  projectileSize: { width: 160, height: 185 },
  fireRatePerSecond: 10,
  damage: 10,
  projectileDurability: 5,
  projectileImageName: AssetImageName.PROJECTILE_SAUSAGES,
  projectileImageScalingRatio: 0.4,
};
