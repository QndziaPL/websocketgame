import { FC, ReactElement } from "react";
import "./HorizontalBarWithGraphicalIndicator.css";
import classNames from "classnames";

export enum HorizontalBarMainColor {
  RED_HEALTH_BAR = "redHealthBar",
  EXPERIENCE_BAR = "experienceBar",
}

export interface HorizontalBarWithGraphicalIndicatorProps {
  backgroundColor: string;
  mainColor: HorizontalBarMainColor;
  height: number;
  actualValue: number;
  maximumValue: number;
  additionalContent?: ReactElement;
}

export const HorizontalBarWithGraphicalIndicator: FC<
  HorizontalBarWithGraphicalIndicatorProps
> = ({
  height,
  actualValue,
  maximumValue,
  backgroundColor,
  mainColor,
  additionalContent,
}) => {
  const indicationWidth = `${(actualValue / maximumValue) * 100}%`;
  return (
    <div className="barContainer" style={{ backgroundColor, height }}>
      <div
        className={classNames("barContainerIndicator", {
          [mainColor]: true,
        })}
        style={{ width: indicationWidth, backgroundColor: mainColor }}
      />
      {additionalContent && (
        <div className="additionalContent">{additionalContent}</div>
      )}
    </div>
  );
};
