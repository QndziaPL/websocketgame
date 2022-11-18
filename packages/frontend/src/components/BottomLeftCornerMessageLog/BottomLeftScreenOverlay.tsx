import { FC, useState } from "react";
import { MessageToFrontend } from "@websocketgame/shared/dist/types/game";
import "./BottomLeftCornerMessageLog.css";
import classNames from "classnames";

interface BottomLeftCornerMessageLogProps {
  messages: MessageToFrontend[];
}

export const BottomLeftScreenOverlay: FC<BottomLeftCornerMessageLogProps> = ({
  messages,
}) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      className={classNames("bottomLeftCornerMessageLog", {
        expandedMessageLog: expanded,
      })}
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(!expanded);
      }}
    >
      {messages.map(({ id, date, content, type }) => (
        <div key={id} style={{ display: "flex", gap: 10 }}>
          <div>{new Date(date).toLocaleTimeString()}</div>
          <div style={{ flex: 1 }}>{content}</div>
        </div>
      ))}
    </div>
  );
};
