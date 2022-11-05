import {
  MessageToFrontend,
  MessageToFrontendType,
} from "@websocketgame/shared/dist/game";
import { v4 } from "uuid";

export default class MessagesToFrontend {
  private messages: MessageToFrontend[] = [];

  addMessage = (content: string) => {
    this.messages.push({
      date: Date.now(),
      content,
      id: v4(),
      type: MessageToFrontendType.BASIC,
    });
  };

  getMessages() {
    return this.messages.sort((a, b) => (a.date > b.date ? -1 : 1));
  }
}
