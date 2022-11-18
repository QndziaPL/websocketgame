import { FC } from "react";
import "./BottomHUD.css";
import { BottomRightCornerButtonRow } from "../BottomRightCornerButtonRow/BottomRightCornerButtonRow";
import { MessageToFrontend } from "@websocketgame/shared/dist/types/game";
import { BottomLeftScreenOverlay } from "../BottomLeftCornerMessageLog/BottomLeftScreenOverlay";
import { BottomCenterOverlay } from "../BottomCenterOverlay/BottomCenterOverlay";
import { MyPlayerForFrontend } from "@websocketgame/shared/dist/types/characters";

export interface BottomHUDProps {
  kickAll: () => void;
  joinGame: () => void;
  messages: MessageToFrontend[];
  player?: MyPlayerForFrontend;
}

export const BottomHUD: FC<BottomHUDProps> = ({
  kickAll,
  joinGame,
  messages,
  player,
}) => {
  return (
    <div className="bottomHUD">
      <BottomLeftScreenOverlay messages={messages} />
      {player && <BottomCenterOverlay player={player} />}
      <BottomRightCornerButtonRow kickAll={kickAll} joinGame={joinGame} />
    </div>
  );
};
