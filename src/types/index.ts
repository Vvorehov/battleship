export const BOARD_SIZE = 10;

export interface ShipType {
  size: number;
  count: number;
}

export interface ShipTypes {
  carrier: ShipType;
  battleship: ShipType;
  cruiser: ShipType;
  destroyer: ShipType;
  submarine: ShipType;
}

export type Position = [number, number];

export interface ShipLayout {
  ship: keyof ShipTypes;
  positions: Position[];
}

// Game data structure
export interface GameData {
  shipTypes: ShipTypes;
  layout: ShipLayout[];
}

// Cell state
export type CellState = 'empty' | 'hit' | 'miss' | 'sunk';

// Game state
export interface GameState {
  board: CellState[][];
  shots: number;
  hits: number;
  shipStates: Record<keyof ShipTypes, {
    positions: Position[];
    hits: Position[];
    isSunk: boolean;
  }>;
  gameOver: boolean;
} 