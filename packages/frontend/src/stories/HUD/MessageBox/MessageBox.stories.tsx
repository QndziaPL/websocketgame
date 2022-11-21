import { BottomLeftScreenOverlay } from "../../../components/BottomLeftCornerMessageLog/BottomLeftScreenOverlay";
import { ComponentMeta } from "@storybook/react";
import { MessageToFrontend } from "@websocketgame/shared/dist/types/game";

export default {
  title: "MessageBox",
  component: BottomLeftScreenOverlay,
  argTypes: { messages: { control: "object" } },
} as ComponentMeta<typeof BottomLeftScreenOverlay>;

const sampleMessages: MessageToFrontend[] = [
  { id: "1", date: 12345676721, type: 0, content: "First message" },
  { id: "1", date: 23345676735, type: 0, content: "Second message" },
  { id: "1", date: 42345676788, type: 0, content: "Third message" },
  { id: "1", date: 7678485678, type: 0, content: "Fourth message" },
  { id: "1", date: 12354458785, type: 0, content: "Fifth message" },
  { id: "1", date: 774767490, type: 0, content: "Sixth message" },
];
const Primary = ({ messages }: { messages: MessageToFrontend[] }) => {
  return <BottomLeftScreenOverlay messages={messages} />;
};

export const Messages = Primary.bind({});
// @ts-ignore
Messages.args = {
  messages: sampleMessages,
};
