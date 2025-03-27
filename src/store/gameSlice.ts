import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BOARD_SIZE, CellState, GameState, Position, ShipTypes, ShipLayout } from '../types';

// Initial game data with ship positions
const initialShipData = {
  shipTypes: {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
    submarine: { size: 3, count: 1 }
  },
  layout: [
    { ship: 'carrier', positions: [[2,9], [3,9], [4,9], [5,9], [6,9]] },
    { ship: 'battleship', positions: [[5,2], [5,3], [5,4], [5,5]] },
    { ship: 'cruiser', positions: [[8,1], [8,2], [8,3]] },
    { ship: 'submarine', positions: [[3,0], [3,1], [3,2]] },
    { ship: 'destroyer', positions: [[0,0], [1,0]] }
  ] as ShipLayout[]
};

// Initialize the empty board
const createEmptyBoard = (): CellState[][] => {
  return Array.from({ length: BOARD_SIZE }).fill(null).map(() => Array(BOARD_SIZE).fill('empty'));
};

// Initialize ship states
const initializeShipStates = (layout: ShipLayout[]) => {
  const shipStates: GameState['shipStates'] = {
    carrier: { positions: [], hits: [], isSunk: false },
    battleship: { positions: [], hits: [], isSunk: false },
    cruiser: { positions: [], hits: [], isSunk: false },
    destroyer: { positions: [], hits: [], isSunk: false },
    submarine: { positions: [], hits: [], isSunk: false }
  };

  // Populate positions from layout
  layout.forEach(ship => {
    shipStates[ship.ship].positions = [...ship.positions];
  });

  return shipStates;
};

// Initial state
const initialState: GameState = {
  board: createEmptyBoard(),
  shots: 0,
  hits: 0,
  shipStates: initializeShipStates(initialShipData.layout),
  gameOver: false
};

const isPositionOnShip = (position: Position, shipStates: GameState['shipStates']): keyof ShipTypes | null => {
  const [row, col] = position;
  
  for (const shipType of Object.keys(shipStates) as Array<keyof ShipTypes>) {
    const ship = shipStates[shipType];
    if (ship.positions.some(([r, c]) => r === row && c === col)) {
      return shipType;
    }
  }
  
  return null;
};

const checkGameOver = (shipStates: GameState['shipStates']): boolean => {
  return Object.values(shipStates).every(ship => ship.isSunk);
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Fire at a position
    fireShot: (state, action: PayloadAction<Position>) => {
      if (state.gameOver) {
        return;
      }
      const [row, col] = action.payload;

      if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
        console.error('Invalid position:', action.payload);
        return;
      }

      if (state.board[row][col] !== 'empty' || state.gameOver) {
        return;
      }
      
      state.shots += 1;
      const hitShipType = isPositionOnShip(action.payload, state.shipStates);
      
      if (hitShipType) {
        state.board[row][col] = 'hit';
        state.hits += 1;
        const ship = state.shipStates[hitShipType];
        ship.hits = [...ship.hits, action.payload];
        if (state.shipStates[hitShipType].hits.length === state.shipStates[hitShipType].positions.length) {
          state.shipStates[hitShipType].isSunk = true;
          state.shipStates[hitShipType].positions.forEach(([r, c]) => {
            state.board[r][c] = 'sunk';
          });
          state.gameOver = checkGameOver(state.shipStates);
        }
      } else {
        state.board[row][col] = 'miss';
      }
    },
    
    resetGame: () => ({
      ...initialState,
      board: createEmptyBoard(),
      shipStates: initializeShipStates(initialShipData.layout)
    })
  }
});

export const { fireShot, resetGame } = gameSlice.actions;
export default gameSlice.reducer;