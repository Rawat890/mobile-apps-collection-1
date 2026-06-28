import { Coordinate } from "../types/GestureEventType";

export const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
 const x: number = Math.floor(Math.random() * maxX);
 const y: number = Math.floor(Math.random() * maxY);
 return { x, y };
}