import { useCallback, useEffect, useMemo, useState } from "react";
import Canvas from "./classes/Canvas";
import SocketIO from "./singletons/SocketIO";
import {
  GameData,
  MessageToFrontend,
} from "@websocketgame/shared/dist/types/game";
import {
  ClientToServerEventType,
  ServerToClientEventType,
} from "@websocketgame/shared/dist/types/socket";
import {
  usePlayerInput,
  UsePlayerInputProps,
} from "./playerInputs/usePlayerInput";
import { SkillButton } from "@websocketgame/shared/dist/types/input";
import { Projectile } from "@websocketgame/shared/dist/types/projectile";
import { MyPlayerForFrontend } from "@websocketgame/shared/dist/types/characters";

interface MyPlayerWithConnectionStatus {
  connected: boolean;
  myPlayer?: MyPlayerForFrontend;
}

interface UseGameProps {
  nickname: string;
  goToConfig: () => void;
}

interface UseGameReturnType {
  kickAllPlayers: () => void;
  joinGame: () => void;
  messagesToFrontend: MessageToFrontend[];
  myPlayer: MyPlayerWithConnectionStatus;
}

export type UseGameType = (props: UseGameProps) => UseGameReturnType;

const socket = SocketIO.getInstance();
const canvas = Canvas.getInstance(socket.getId());

export const useGame: UseGameType = ({ nickname, goToConfig }) => {
  const [messagesToFrontend, setMessagesToFrontend] = useState<
    MessageToFrontend[]
  >([]);
  const [myPlayer, setMyPlayer] = useState<MyPlayerWithConnectionStatus>({
    connected: false,
    myPlayer: undefined,
  });

  const handleButtonPress: UsePlayerInputProps = useMemo(
    () => ({
      q: () =>
        socket.send(
          ClientToServerEventType.SKILL_BUTTON_PRESSED,
          SkillButton.q
        ),
      w: () =>
        socket.send(
          ClientToServerEventType.SKILL_BUTTON_PRESSED,
          SkillButton.w
        ),
      e: () =>
        socket.send(
          ClientToServerEventType.SKILL_BUTTON_PRESSED,
          SkillButton.e
        ),
      r: () =>
        socket.send(
          ClientToServerEventType.SKILL_BUTTON_PRESSED,
          SkillButton.r
        ),
    }),
    []
  );

  usePlayerInput(handleButtonPress);

  const kickAllPlayers = useCallback(() => {
    socket.send(ClientToServerEventType.KICK_ALL_PLAYERS);
  }, []);

  const joinGame = useCallback(() => {
    socket.send(ClientToServerEventType.JOIN_GAME, nickname);
  }, [nickname]);

  useEffect(() => {
    socket.subscribe<GameData>(
      ServerToClientEventType.CHARACTERS_DATA,
      ({
        charactersBaseData: { basePlayers },
        enemiesBaseData: { baseEnemies },
      }) => {
        canvas.setPlayers(basePlayers);
        canvas.setEnemies(baseEnemies);
      }
    );
    socket.subscribe<MessageToFrontend[]>(
      ServerToClientEventType.MESSAGES_TO_FRONTEND,
      (data) => {
        setMessagesToFrontend(() => data);
      }
    );
    socket.subscribe<Projectile[]>(
      ServerToClientEventType.PROJECTILES,
      (projectiles) => {
        canvas.setProjectiles(projectiles);
      }
    );

    socket.subscribe<MyPlayerForFrontend>(
      ServerToClientEventType.MY_PLAYER,
      (myPlayer) => {
        setMyPlayer((prev) => ({
          connected: true,
          myPlayer,
        }));
      }
    );

    joinGame();

    //TODO: add cleanups everywhere
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      canvas.resize();
    });

    window.addEventListener("click", (e) => {
      socket.send(ClientToServerEventType.LEFT_CLICK, {
        x: e.clientX,
        y: e.clientY,
      });
    });

    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      socket.send(ClientToServerEventType.RIGHT_CLICK, {
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  return {
    kickAllPlayers,
    joinGame,
    messagesToFrontend,
    myPlayer,
  };
};
