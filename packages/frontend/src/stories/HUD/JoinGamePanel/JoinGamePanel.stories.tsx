import { JoinGamePanel } from "./JoinGamePanel";
import { ComponentMeta } from "@storybook/react";
import { useRef, useState } from "react";

export default {
  title: "JoinGamePanel",
  component: JoinGamePanel,
  argTypes: {},
} as ComponentMeta<typeof JoinGamePanel>;

export const Primary = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState("");
  const handleJoin = () => {
    console.log(`joining as ${nickname}`);
  };

  return (
    <JoinGamePanel
      nickname={nickname}
      setNickname={setNickname}
      ref={ref}
      handleJoin={handleJoin}
    />
  );
};
