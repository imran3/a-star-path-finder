export interface Cell {
  x: number;
  y: number;
  status: string;
  bgColor: string;
  cameFrom?: string;
}

export interface Dictionary {
  [key: string]: Cell;
}
