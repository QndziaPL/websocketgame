import { Player } from "@websocketgame/shared/dist/types/player";
import { Position } from "@websocketgame/shared/dist/types/position";
import { SkillButton } from "@websocketgame/shared/dist/types/input";
import { WeaponType } from "@websocketgame/shared/dist/types/weapons";
import Projectiles from "../Projectiles";
import { v4 } from "uuid";
import {
  moveObjectByVector,
  objectMovement,
} from "../../objectMovement/objectMovement";
import { checkObjectCollision } from "../../objectMovement/objectCollision";
import { ProjectileSource } from "@websocketgame/shared/dist/types/projectile";
import { createNewPlayerObject, playerLevelUp } from "./helpers";

export default class Players {
  private players: Player[] = [];
  private readonly addMessage: (content: string) => void;
  private projectiles: Projectiles;

  constructor(addMessage: (content: string) => void, projectiles: Projectiles) {
    this.addMessage = addMessage;
    this.projectiles = projectiles;
  }

  updateWholePlayerObject = (player: Player) => {
    const newPlayers = [...this.players];
    const index = newPlayers.findIndex(
      (existingPlayer) => existingPlayer.id === player.id
    );
    newPlayers[index] = player;
    this.players = newPlayers;
  };

  getPlayers() {
    return [...this.players];
  }

  setPlayers = (players: Player[]) => {
    this.players = players;
  };

  addNewPlayer(id: string, nick: string, speed: number) {
    const existingPlayer = this.players.find((player) => player.id === id);
    if (existingPlayer) {
      if (existingPlayer.hp <= 0) {
        this.updateWholePlayerObject(
          createNewPlayerObject({ id, nick, speed })
        );
      } else {
        const message = `Player ${nick} is already in game`;
        this.addMessage(message);
        console.log(message);
        return;
      }
    } else {
      this.players.push(createNewPlayerObject({ id, nick, speed }));
      const message = `Player ${nick} joined!`;
      this.addMessage(message);
      console.log(message);
    }
  }

  performBaseAttack = (id: string, mouseClickPosition: Position) => {
    const player = this.getPlayer(id);
    if (player && player.hp > 0) {
      const vector = vectorFromMousePosition(
        mouseClickPosition,
        player.position
      );
      const { weapon, position } = player;
      if (player.weapon.type === WeaponType.RANGED) {
        this.addMessage(
          `player ${player.nick} shoot bullet with speed ${weapon.speed}`
        );
        // TODO: extend for melee attack
        this.projectiles.addProjectile({
          position: position,
          speed: weapon.speed,
          destination: moveObjectByVector(player.position, vector), // TODO: probably wrong!!!
          id: v4(),
          damage: weapon.damage,
          range: weapon.range,
          initialPosition: position,
          collisionRadius: weapon.collisionRadius,
          ownerId: player.id,
          durability: 1,
          source: ProjectileSource.PLAYER,
        });
      }
    }
  };

  playersGetExperience = (exp: number) => {
    this.players = this.players.map((player) =>
      this.playerGetExperience(player, exp)
    );
  };

  playerGetExperience = (player: Player, exp: number) => {
    player.exp.value += exp;
    if (player.exp.value >= player.exp.expForNextLevel) {
      return playerLevelUp(player);
    }
    return player;
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

  private updatePlayerLookingTowardsDegree = (id: string, degree: number) => {
    const index = this.players.findIndex((player) => player.id === id);
    if (index !== -1) {
      this.players[index].lookingTowardsDegree = degree;
    }
  };

  getPlayer(id: string): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  updatePlayerDestination(id: string, mouseClickPosition: Position) {
    const player = this.getPlayer(id);
    if (player && player.hp > 0) {
      const vector = vectorFromMousePosition(
        mouseClickPosition,
        player.position
      );
      const newDestination = moveObjectByVector(player.position, vector);

      const radians = Math.atan2(
        mouseClickPosition.x - player.position.x,
        mouseClickPosition.y - player.position.y
      );
      const degrees = radians * ((180 / Math.PI) * -1) + 180;
      this.updatePlayerLookingTowardsDegree(id, degrees);
      this.updatePlayerPositionField(id, newDestination, "destination");
    }
  }

  checkCollisions = () => {
    const newPlayers: Player[] = [];
    this.players.forEach((player) => {
      const newPlayer = { ...player };
      const projectileCollided = this.projectiles
        .getProjectiles()
        .find((projectile) =>
          checkObjectCollision(
            {
              position: player.position,
              collisionRadius: player.collisionRadius,
            },
            {
              position: projectile.position,
              collisionRadius: projectile.collisionRadius,
            }
          )
        );
      if (
        player.hp > 0 &&
        projectileCollided &&
        projectileCollided.ownerId !== player.id
      ) {
        this.projectiles.useDurability(projectileCollided.id);
        newPlayer.hp = newPlayer.hp - projectileCollided.damage;
        this.addMessage(`${player.nick} lost ${projectileCollided.damage}hp`);
      }

      newPlayers.push(newPlayer);

      if (newPlayer.hp <= 0 && !newPlayer.notifiedOfDeath) {
        this.addMessage(`Player ${newPlayer.nick} is a piece of shit`);
        newPlayer.notifiedOfDeath = true;
      }
    });
    this.players = newPlayers;
  };

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

const isAliveFilter = (player: Player) => player.hp > 0;

const vectorFromMousePosition = (
  mousePosition: Position,
  playerPosition: Position
): Position => {
  return {
    x: mousePosition.x - playerPosition.x,
    y: mousePosition.y - playerPosition.y,
  };
};
