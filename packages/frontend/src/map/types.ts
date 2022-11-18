import { Size } from "../types/types";
import { AssetImageLoaded } from "../assets/useGameAssets";
import { Position } from "@websocketgame/shared/dist/types/position";

export enum MapObjectType {
  OBSTACLE = 1,
  TREASURE = 2,
}

export interface GameMap {
  squares: MapSquare[];
  actualViewRange: {
    topLeft: Position;
    bottomRight: Position;
  };
}

export interface MapObject {
  position: Position;
  size: Size;
  type: MapObjectType;
  render: (ctx: CanvasRenderingContext2D, image: AssetImageLoaded[]) => void;
}

export interface Obstacle extends MapObject {
  destroyable: boolean;
  type: MapObjectType.OBSTACLE;
  hp: number;
}

export interface MapSquare {
  objects: MapObject[];
  position: Position;
  /** initial positions of 9 MapSquares
     [-1,-1][0,-1][1,-1]
     [-1,0 ][0,0 ][1,0 ]
     [-1,1 ][0,1 ][1,1 ]
     */
}

export type CreateObstacleFunction = (position: Position) => Obstacle;
