import { useEffect, useState } from "react";

export enum AssetImageName {
  PLAYER_SKIN_GANDALF = 1,
  OBSTACLE_ROCK = 2,
  OBSTACLE_TREE = 3,
  PROJECTILE_SAUSAGES = 4,
}

export interface AssetImageToLoad {
  name: AssetImageName;
  url: string;
}

export interface AssetImageLoaded {
  name: AssetImageName;
  img: HTMLImageElement;
}

export const useGameAssets = (images: AssetImageToLoad[]) => {
  const [loadedImages, setLoadedImages] = useState<AssetImageLoaded[]>([]);

  useEffect(() => {
    images.forEach(({ url, name }) => {
      const img = new Image();
      img.src = url;
      setLoadedImages((prev) => [...prev, { name, img }]);
    });
  }, [images]);

  return loadedImages;
};
