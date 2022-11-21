import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import "./JoinGameScreen.css";
import { JoinGamePanel } from "../../stories/HUD/JoinGamePanel/JoinGamePanel";

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
      <JoinGamePanel
        ref={nicknameRef}
        nickname={nickname}
        setNickname={setNickname}
        handleJoin={handleJoin}
      />
    </div>
  );
};
