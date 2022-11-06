import { Player } from "@websocketgame/shared/dist/player";
import { Position } from "@websocketgame/shared/dist/position";
import { SimpleBow } from "@websocketgame/shared/dist/weapons/weapons";
import {
  movePlayerByVector,
  numberToFixed,
} from "../playerMovement/playerMovement";
import { SkillButton } from "@websocketgame/shared/dist/input";
import { sampleSkillSet } from "@websocketgame/shared/dist/skills";

export default class Players {
  private players: Player[] = [];
  private readonly addMessage: (content: string) => void;

  constructor(addMessage: (content: string) => void) {
    this.addMessage = addMessage;
  }

  getPlayers() {
    return [...this.players];
  }

  addNewPlayer(id: string, nick: string, speed: number) {
    if (this.players.find((player) => player.id === id)) {
      const message = `Player with id '${id}' is already in game`;
      this.addMessage(message);
      console.log(message);
      return;
    }
    this.players.push({
      id,
      nick,
      speed,
      position: { x: 100, y: 100 },
      weapon: SimpleBow,
      exp: 0,
      level: 1,
      skillSet: sampleSkillSet,
    });
    const message = `Added ${id} to players`;
    this.addMessage(message);
    console.log(message);
  }

  performBaseAttack = (id: string, vector: Position) => {};

  movePlayers() {
    for (let i = 0; i < this.players.length; i++) {
      const { destination, position, speed } = this.players[i];
      if (destination) {
        if (destination.x !== position.x && destination.y !== position.y) {
          const xDif = destination.x - position.x;
          const yDif = destination.y - position.y;
          const stepLength = numberToFixed(
            Math.sqrt(xDif * xDif + yDif * yDif),
            4
          );
          const xStepValue = numberToFixed((xDif / stepLength) * speed, 4);
          const yStepValue = numberToFixed((yDif / stepLength) * speed, 4);
          const nextX = numberToFixed(position.x + xStepValue, 4);
          const nextY = numberToFixed(position.y + yStepValue, 4);
          if (
            Math.abs(destination.x - nextX) < 5 &&
            Math.abs(destination.y - nextY) < 5
          ) {
            this.players[i].position = destination;
            this.players[i].destination = undefined;
          } else {
            this.players[i].position = {
              x: numberToFixed(position.x + xStepValue, 4),
              y: numberToFixed(position.y + yStepValue, 4),
            };
          }
        } else {
          this.players[i].destination = undefined;
        }
      }
    }
  }

  private updatePlayerPositionField(
    id: string,
    newPosition: Position,
    field: "position" | "destination"
  ) {
    const index = this.players.findIndex((player) => player.id === id);
    if (index !== -1) {
      this.players[index][field] = newPosition;
    }
  }

  getPlayer(id: string): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  updatePlayerDestination(id: string, vector: Position) {
    const player = this.getPlayer(id);
    if (!player) return;
    const newDestination = movePlayerByVector(player.position, vector);
    this.updatePlayerPositionField(id, newDestination, "destination");
  }

  useSkill = (button: SkillButton) => {};

  removeAllPlayers = () => {
    this.players = [];
  };

  removePlayer(id: string, reason: string) {
    const newPlayers = [...this.players];
    const removed = newPlayers.splice(
      this.players.findIndex((player) => player.id === id),
      1
    );
    if (removed.length) {
      this.players = newPlayers;
      console.log(`Removed player with id '${id}' with reason: '${reason}'`);
    }
  }
}
