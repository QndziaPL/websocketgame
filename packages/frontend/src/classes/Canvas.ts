import { Projectile } from "@websocketgame/shared/dist/types/projectile";
import { BasePlayer } from "@websocketgame/shared/dist/types/characters";
import { ImageName, LoadedImages, loadImages } from "../newAssets/helpers";
import { BaseEnemy } from "@websocketgame/shared/dist/types/enemy";

export default class Canvas {
  private static instance: Canvas;
  private static canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  private projectiles: Projectile[] = [];
  private players: BasePlayer[] = [];
  private enemies: BaseEnemy[] = [];
  private ourId: string;
  private loadedImages: LoadedImages = loadImages();
  lastTimestamp: number = 0;

  constructor(clientId: string) {
    this.ourId = clientId;
    Canvas.canvas = document.querySelector("#mainCanvas");
    this.resize();
    if (Canvas.canvas) {
      this.ctx = Canvas.canvas.getContext("2d");
    }
    if (this.ctx == null) {
      throw new Error(`Unable to get 2d context from canvas`);
    }

    this.draw();
  }

  public static getInstance = (clientId: string): Canvas => {
    if (!Canvas.instance) {
      Canvas.instance = new Canvas(clientId);
    }
    return Canvas.instance;
  };

  setProjectiles = (projectiles: Projectile[]) => {
    this.projectiles = projectiles;
  };

  setPlayers = (players: BasePlayer[]) => {
    this.players = players;
  };

  setEnemies = (enemies: BaseEnemy[]) => {
    this.enemies = enemies;
  };

  resize() {
    if (Canvas.canvas) {
      Canvas.canvas.width = window.innerWidth;
      Canvas.canvas.height = window.innerHeight;
    }
  }

  draw = (timestamp?: number): void => {
    const timeSinceLastDraw = timestamp ?? 0 - this.lastTimestamp;
    if (timestamp) {
      this.lastTimestamp = timestamp;
    }
    if (timeSinceLastDraw >= 1000 / 60 || !timestamp) {
      this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.drawPlayers();
      this.drawProjectiles();
      this.drawEnemies();

      requestAnimationFrame(this.draw);
    }
  };

  private drawEnemies = () => {
    if (this.ctx) {
      this.enemies.forEach(
        ({
          position: { x, y },
          hp,
          maxHp,
          name,
          collisionRadius,
          lookingTowardsDegree,
          visionRadius,
        }) => {
          if (this.ctx) {
            const image = this.loadedImages[ImageName.SKULL];
            //TODO: extend image assets with information of how big is area for collisionRadius and then create function to scale it properly before drawing
            drawImage(this.ctx, image, x, y, lookingTowardsDegree, 0.45);
            drawHorizontalBar(
              this.ctx,
              "black",
              "red",
              x,
              y - collisionRadius - 10,
              5,
              60,
              hp,
              maxHp
            );

            this.ctx.beginPath();
            this.ctx.arc(x, y, visionRadius, 0, 2 * Math.PI);
            // this.ctx.strokeStyle = "black";
            this.ctx.stroke();
            this.ctx.closePath();

            this.ctx.textAlign = "center";
            this.ctx.fillText(name, x, y - collisionRadius - 20);
          }
        }
      );
    }
  };

  private drawProjectiles = () => {
    if (this.ctx) {
      this.projectiles.forEach(
        ({ position: { x, y }, collisionRadius, destination, speed }) => {
          this.ctx!.beginPath();
          this.ctx!.arc(x, y, collisionRadius, 0, 2 * Math.PI);
          this.ctx!.fill();
        }
      );
    }
  };

  private drawPlayers() {
    if (this.ctx) {
      this.players.forEach(
        ({
          position: { x, y },
          id,
          nick,
          destination,
          collisionRadius,
          hp,
          lookingTowardsDegree,
        }) => {
          if (hp > 0) {
            if (this.ctx) {
              drawImage(
                this.ctx,
                this.loadedImages[ImageName.PLAYER_ARCHER],
                x,
                y,
                lookingTowardsDegree,
                0.7
              );
            }
            this.ctx!.fillText(nick, x, y - collisionRadius - 5);
            if (id === this.ourId && destination) {
              this.ctx!.beginPath();
              this.ctx!.moveTo(x, y);
              this.ctx!.lineTo(destination.x, destination.y);
              this.ctx!.stroke();
            }
          } else {
            const poopSize = 40;
            this.ctx!.drawImage(
              this.loadedImages[ImageName.POOP],
              x - poopSize / 2,
              y - poopSize / 2,
              poopSize,
              poopSize
            );
          }
        }
      );
    }
  }
}

export const drawImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  angleInDegrees: number,
  scale: number = 1
) => {
  ctx.save();
  // ctx.translate(x, y);
  ctx.translate(x, y);
  ctx.rotate((angleInDegrees * Math.PI) / 180);
  // ctx.translate(-x, -y);
  ctx.translate(-x - (img.width * scale) / 2, -y - (img.height * scale) / 2);
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  ctx.restore();
};

export const drawHorizontalBar = (
  ctx: CanvasRenderingContext2D,
  background: string,
  color: string,
  x: number,
  y: number,
  height: number,
  width: number,
  value: number,
  maxValue: number
) => {
  const percentage = value / maxValue;
  ctx.save();
  ctx.fillStyle = background;
  ctx.fillRect(x - width / 2, y - height / 2, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(x - width / 2, y - height / 2, percentage * width, height);
  ctx.restore();
};
