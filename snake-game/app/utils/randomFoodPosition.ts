import { Coordinate } from "../types/GestureEventType";

export const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
 const x: number = Math.floor(Math.random() * maxX) + 1;
 const y: number = Math.floor(Math.random() * maxY) + 1;
 return { x, y };
}