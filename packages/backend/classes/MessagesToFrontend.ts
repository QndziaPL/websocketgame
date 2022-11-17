import {
  MessageToFrontend,
  MessageToFrontendType,
} from "@websocketgame/shared/dist/types/game";
import { v4 } from "uuid";

const maxMessagesLength = 100;
export default class MessagesToFrontend {
  private messages: MessageToFrontend[] = [];

  addMessage = (content: string) => {
    if (this.messages.length >= maxMessagesLength) {
      const newMessages = [...this.messages];
      newMessages.splice(newMessages.length - 1, 1);
      this.messages = newMessages;
    }
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
