import React, { FC, useEffect, useState } from "react";
import GameCanvas from "../GameCanvas/GameCanvas";
import { draw } from "../../draw/draw";
import grassTile from "../../assets/tiles/grassTile.bmp";
import { useGameAssets } from "../../assets/useGameAssets";
import { IMAGES_TO_LOAD } from "../../consts/images";
import { GameData } from "@websocketgame/shared/dist/types/game";

export interface GameProps {
  gameData?: GameData;
}

const Game: FC<GameProps> = ({ gameData }) => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const images = useGameAssets(IMAGES_TO_LOAD);

  const [backgroundImagePattern, setBackgroundImagePattern] =
    useState<CanvasPattern>();

  useEffect(() => {
    const img = new Image();
    img.src = grassTile;
    img.onload = () => {
      const pattern = canvasContext?.createPattern(img, "repeat");
      if (pattern) setBackgroundImagePattern(pattern);
    };
  }, [canvasContext]);

  if (!gameData) return <>no game data</>;

  return (
    <>
      <GameCanvas
        size={windowSize}
        setSize={setWindowSize}
        draw={(ctx) =>
          draw({
            ctx,
            // backgroundPattern: backgroundImagePattern,
            images,
            gameData,
          })
        }
        setCanvasContext={setCanvasContext}
        canvasContext={canvasContext}
      />
    </>
  );
};

export default Game;
