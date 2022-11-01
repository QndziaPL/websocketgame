import { useEffect, useState } from "react";
import { PlayerMovementKeys } from "../types/types";

export interface PlayerInputCallbacks {
  mousePosition: { x: number; y: number };
  mouseDown: boolean;
  playerMovementKeys: PlayerMovementKeys;
}

export interface PlayerInputProps {
  onPlayerMouseClick: () => void;
  onNextWeaponClick: () => void;
}

const LISTENED_KEYS_FOR_HOLDING = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "w",
  "s",
  "a",
  "d",
];

const LISTENED_KEYS_FOR_PRESSING = ["x"];

export const usePlayerInput: (
  props: PlayerInputProps
) => PlayerInputCallbacks = ({ onPlayerMouseClick, onNextWeaponClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const arrowKeys: PlayerMovementKeys = {
    up,
    down,
    left,
    right,
  };

  const onMouseDown = () => {
    setMouseDown(true);
  };

  const onMouseUp = () => {
    setMouseDown(false);
  };

  const onMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const onKeyboardAction = (event: KeyboardEvent, type: "up" | "down") => {
    if (!LISTENED_KEYS_FOR_HOLDING.includes(event.key)) return;
    const valueToSet = type === "down";
    switch (event.key) {
      case "ArrowUp": {
        setUp(valueToSet);
        break;
      }
      case "ArrowDown": {
        setDown(valueToSet);
        break;
      }
      case "ArrowLeft": {
        setLeft(valueToSet);
        break;
      }
      case "ArrowRight": {
        setRight(valueToSet);
        break;
      }
      case "w": {
        setUp(valueToSet);
        break;
      }
      case "s": {
        setDown(valueToSet);
        break;
      }
      case "a": {
        setLeft(valueToSet);
        break;
      }
      case "d": {
        setRight(valueToSet);
        break;
      }

      default:
        break;
    }
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (!LISTENED_KEYS_FOR_PRESSING.includes(event.key)) return;
    switch (event.key) {
      case "x": {
        onNextWeaponClick();
        break;
      }
      default: {
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", onPlayerMouseClick);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", (event) =>
      onKeyboardAction(event, "down")
    );
    window.addEventListener("keyup", (event) => onKeyboardAction(event, "up"));
    window.addEventListener("keypress", onKeyPress);
    return () => {
      window.removeEventListener("click", onPlayerMouseClick);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", (event) =>
        onKeyboardAction(event, "down")
      );
      window.removeEventListener("keyup", (event) =>
        onKeyboardAction(event, "up")
      );
    };
  }, []);

  return {
    playerMovementKeys: arrowKeys,
    mouseDown,
    mousePosition,
  };
};
