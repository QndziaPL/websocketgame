import { FC } from "react";
import "./BottomCenterOverlay.css";
import {
  HorizontalBarMainColor,
  HorizontalBarWithGraphicalIndicator,
} from "../HorizontalBarWithGraphicalIndicator/HorizontalBarWithGraphicalIndicator";
import { MyPlayerForFrontend } from "@websocketgame/shared/dist/types/characters";

export interface BottomCenterOverlayProps {
  player: MyPlayerForFrontend;
}

export const BottomCenterOverlay: FC<BottomCenterOverlayProps> = ({
  player: {
    weapon,
    exp: { expForCurrentLevel, expForNextLevel, value },
    level,
    hp,
    maxHp,
  },
}) => {
  return (
    <div className="bottomCenterOverlay">
      <div className="barWithLabel">
        <span className="bottomCenterHUDLabel">hp</span>
        <HorizontalBarWithGraphicalIndicator
          height={20}
          actualValue={hp}
          maximumValue={maxHp}
          backgroundColor={"black"}
          mainColor={HorizontalBarMainColor.RED_HEALTH_BAR}
          additionalContent={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              <span style={{ marginRight: 20 }}>{hp}</span>
              <span>{maxHp}</span>
            </div>
          }
        />
      </div>
      <div className="barWithLabel">
        <span className="bottomCenterHUDLabel">exp</span>
        <HorizontalBarWithGraphicalIndicator
          height={20}
          actualValue={value - expForCurrentLevel}
          maximumValue={expForNextLevel - expForCurrentLevel}
          backgroundColor={"black"}
          mainColor={HorizontalBarMainColor.EXPERIENCE_BAR}
          additionalContent={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              <span style={{ marginRight: 20 }}>level {level}</span>
              <span>
                exp {value}/{expForNextLevel}
              </span>
            </div>
          }
        />
      </div>

      <div>
        weapon: {weapon.name} ({weapon.damage})
      </div>
    </div>
  );
};
