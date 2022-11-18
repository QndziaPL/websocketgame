import "./InitializedGame.css";
import React, { FC } from "react";
import { useGame } from "./useGame";
import { BottomHUD } from "./components/BottomHUD/BottomHUD";

interface NewAppProps {
  nickname: string;
  goToConfig: () => void;
}

export const InitializedGame: FC<NewAppProps> = ({ nickname, goToConfig }) => {
  const { joinGame, kickAllPlayers, messagesToFrontend, myPlayer } = useGame({
    nickname,
    goToConfig,
  });

  // useEffect(() => {
  //   if (myPlayer.connected && !myPlayer.myPlayer) {
  //     goToConfig();
  //   }
  // }, [myPlayer.myPlayer]);

  return (
    <BottomHUD
      messages={messagesToFrontend}
      kickAll={kickAllPlayers}
      joinGame={joinGame}
      player={myPlayer.myPlayer}
    />
  );
};
