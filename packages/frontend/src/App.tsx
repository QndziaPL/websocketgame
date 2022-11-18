import { FC, useState } from "react";
import { InitializedGame } from "./InitializedGame";
import { JoinGameScreen } from "./components/JoinGameScreen/JoinGameScreen";
import "./App.css";

export const App: FC = () => {
  const [configReady, setConfigReady] = useState(false);
  const [nickname, setNickname] = useState("");
  return (
    <div className="mainContainer">
      {configReady ? (
        <InitializedGame
          nickname={nickname}
          goToConfig={() => setConfigReady(false)}
        />
      ) : (
        <JoinGameScreen
          nickname={nickname}
          setNickname={setNickname}
          configReady={configReady}
          setConfigReady={setConfigReady}
        />
      )}
    </div>
  );
};
