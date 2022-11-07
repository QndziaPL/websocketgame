import { Player } from "@websocketgame/shared/dist/player";
import { Position } from "@websocketgame/shared/dist/position";
import { SimpleBow } from "@websocketgame/shared/dist/weapons/weapons";
import { SkillButton } from "@websocketgame/shared/dist/input";
import { sampleSkillSet } from "@websocketgame/shared/dist/skills";
import { WeaponType } from "@websocketgame/shared/dist/weapons";
import Projectiles from "./Projectiles";
import { v4 } from "uuid";
import {
  moveObjectByVector,
  objectMovement,
} from "../objectMovement/objectMovement";
import { getExperienceForLevelUpSteps } from "@websocketgame/shared/dist/player/levels";

export default class Players {
  private players: Player[] = [];
  private readonly addMessage: (content: string) => void;
  private projectiles: Projectiles;

  constructor(addMessage: (content: string) => void, projectiles: Projectiles) {
    this.addMessage = addMessage;
    this.projectiles = projectiles;
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
      expForNextLevel: getExperienceForLevelUpSteps()[0],
      level: 1,
      skillSet: sampleSkillSet,
      isAttacking: false,
      lastTimeAttacked: 0,
      collisionRadius: 15,
      hp: 10,
      maxHp: 10,
    });
    const message = `Added ${id} to players`;
    this.addMessage(message);
    console.log(message);
  }

  performBaseAttack = (id: string, vector: Position) => {
    const player = this.getPlayer(id);
    if (player) {
      const { weapon, position } = player;
      if (player.weapon.type === WeaponType.RANGED) {
        this.projectiles.addProjectile({
          position: position,
          speed: weapon.speed,
          destination: moveObjectByVector(player.position, vector), // TODO: probably wrong!!!
          id: v4(),
          damage: weapon.damage,
          range: weapon.range,
          initialPosition: position,
          collisionRadius: weapon.collisionRadius,
        });
      }
    }
  };

  movePlayers() {
    for (let i = 0; i < this.players.length; i++) {
      const { destination, position, speed } = this.players[i];
      if (destination) {
        const { newPosition, isDestination } = objectMovement(
          destination,
          position,
          speed
        );

        if (isDestination) {
          this.players[i].position = destination;
          this.players[i].destination = undefined;
        } else {
          this.players[i].position = newPosition;
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
    const newDestination = moveObjectByVector(player.position, vector);
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
