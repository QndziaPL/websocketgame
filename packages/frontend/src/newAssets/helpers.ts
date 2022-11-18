import poop from "./poop.png";
import playerArcher from "./playerArcher.png";
import skull from "./skull.png";

export enum ImageName {
  POOP = 1,
  PLAYER_ARCHER = 2,
  SKULL = 3,
}

export interface ImageToLoad {
  name: ImageName;
  url: string;
}

export const imagesToLoad: ImageToLoad[] = [
  { name: ImageName.POOP, url: poop },
  { name: ImageName.PLAYER_ARCHER, url: playerArcher },
  { name: ImageName.SKULL, url: skull },
];

export type LoadedImages = {
  [key in keyof typeof ImageName]: HTMLImageElement;
};

export const loadImages = (): LoadedImages => {
  const images = {} as LoadedImages;
  imagesToLoad.forEach(({ name, url }) => {
    const image = new Image();
    image.src = url;
    images[name] = image;
  });
  return images;
};
