import { Dispatch, FC, RefObject, SetStateAction } from "react";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel";
import "./JoinGamePanel.css";

export interface JoinGamePanelProps {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  ref: RefObject<HTMLInputElement>;
  handleJoin: () => void;
}

export const JoinGamePanel: FC<JoinGamePanelProps> = ({
  handleJoin,
  ref,
  nickname,
  setNickname,
}) => {
  return (
    <form action="">
      <div className="joinGamePanel">
        <h1>WPIERDOL, THE GAME</h1>
        <InputWithLabel
          value={nickname}
          onChange={setNickname}
          ref={ref}
          name="nickname"
        />
        <button
          type="submit"
          className="configJoinButton"
          disabled={nickname.length < 3}
          onClick={handleJoin}
        >
          join
        </button>
      </div>
    </form>
  );
};
