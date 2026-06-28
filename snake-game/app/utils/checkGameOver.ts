import { Coordinate } from "../types/GestureEventType";

export const SNAKE_INITIAL_POSITION = [{x:5, y:5}];
export const FOOD_INITIAL_POSITION = {x:5, y:20};
export const GAME_BOUNDS = {xMin:0, xMax:35, yMin:0, yMax:63};
export const MOVE_INTERVAL = 50;
export const SCORE_INCREMENT = 10;

export const checkGameOver = (snakeHead: Coordinate, boundaries: any): boolean => {
 return (
  snakeHead.x < boundaries.xMin ||
  snakeHead.x > boundaries.xMax ||
  snakeHead.y < boundaries.yMin ||
  snakeHead.y > boundaries.yMax
 )
}