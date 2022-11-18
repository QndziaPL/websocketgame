import { useEffect } from "react";

export type UsePlayerInputFunctionType = (props: UsePlayerInputProps) => void;

export interface UsePlayerInputProps {
  [key: string]: () => void;
}

export const usePlayerInput: UsePlayerInputFunctionType = (props) => {
  //DO WYJEBANIA, muszę to zrobić montując callbacki jednorazowo, ze state'm nie przejdize raczej

  const onKeyboardAction = (event: KeyboardEvent, type: "up" | "down") => {
    if (props[event.key] && type === "down") {
      props[event.key]();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) =>
      onKeyboardAction(event, "down")
    );
    window.addEventListener("keyup", (event) => onKeyboardAction(event, "up"));
    return () => {
      window.removeEventListener("keydown", (event) =>
        onKeyboardAction(event, "down")
      );
      window.removeEventListener("keyup", (event) =>
        onKeyboardAction(event, "up")
      );
    };
  }, []);
};
