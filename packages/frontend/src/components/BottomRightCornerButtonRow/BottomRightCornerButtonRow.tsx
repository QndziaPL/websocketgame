import React, { FC, MouseEvent } from "react";
import "./BottomRightCornerButtonRow.css";

export interface BottomRightCornerButtonRowProps {
  kickAll: () => void;
  joinGame: () => void;
}

export const BottomRightCornerButtonRow: FC<
  BottomRightCornerButtonRowProps
> = ({ kickAll, joinGame }) => {
  const handleClick = (e: MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };
  return (
    <div className="bottomRightCornerButtonRow">
      <button onClick={(e) => handleClick(e, kickAll)}>kick all players</button>
      <button onClick={(e) => handleClick(e, joinGame)}>re-join game</button>
    </div>
  );
};
