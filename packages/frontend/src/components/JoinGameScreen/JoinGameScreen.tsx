import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import "./JoinGameScreen.css";

export interface JoinGameScreenProps {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  configReady: boolean;
  setConfigReady: Dispatch<SetStateAction<boolean>>;
}

export const JoinGameScreen: FC<JoinGameScreenProps> = ({
  configReady,
  setConfigReady,
  setNickname,
  nickname,
}) => {
  const nicknameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nicknameRef.current) {
      nicknameRef.current.focus();
    }
  }, []);

  const handleJoin = () => {
    setConfigReady(true);
  };

  return (
    <div className="joinGameScreen">
      <form action="">
        <div className="configContainer">
          <h1>WPIERDOL, THE GAME</h1>
          <div className="configRow">
            <label htmlFor="nickname">nickname</label>
            <input
              ref={nicknameRef}
              type="text"
              name="nickname"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
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
    </div>
  );
};
