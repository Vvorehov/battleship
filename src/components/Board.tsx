import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fireShot } from '../store/gameSlice';
import { BOARD_SIZE } from '../types';
import Cell from './Cell';
import ShipStatus from './ShipStatus';
import PlayerScore from './PlayerScore';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_SIZE}, 1fr);
  grid-template-rows: repeat(${BOARD_SIZE}, 1fr);
  gap: 2px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: white;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid #FF8C00;
  
  @media (max-width: 480px) {
    gap: 1px; // smaller gap on mobile
    padding: 2px;
  }
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 10px;
  padding: 0 5px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 5px;
  }
`;

const HeaderText = styled.h2`
  color: #FF8C00;
  margin: 0;
  
  @media (max-width: 480px) {
    margin-bottom: 5px;
  }
`;

const ResponsiveContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 10px auto 0;
  
  /* Big screens - vertical layout */
  @media (min-width: 769px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Tablet - horizontal layout */
  @media (min-width: 481px) and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    max-width: 700px;
    margin: 15px auto 0;
  }
  
  /* Phone - vertical stack */
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

const ScoreSection = styled.div`
  /* Desktop */
  @media (min-width: 769px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  /* Tablet - 1/3 width */
  @media (min-width: 481px) and (max-width: 768px) {
    width: 33.3%;
    padding-right: 15px;
  }
  
  /* Mobile - full width */
  @media (max-width: 480px) {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

const ShipSection = styled.div`
  /* Desktop */
  @media (min-width: 769px) {
    width: 100%;
  }
  
  /* Tablet - 2/3 width */
  @media (min-width: 481px) and (max-width: 768px) {
    width: 66.6%;
  }
  
  /* Mobile */
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ScoreRow = styled.div`
  display: flex;
  gap: 20px;
  
  /* Desktop */
  @media (min-width: 769px) {
    flex-direction: row;
  }
  
  /* Tablet - stack vertically */
  @media (min-width: 481px) and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  
  /* Mobile - side by side */
  @media (max-width: 480px) {
    flex-direction: row;
    width: 100%;
    gap: 0;
  }
`;

const ResetButton = styled.button`
  background-color: transparent;
  border: none;
  color: #999;
  font-size: 0.8rem;
  margin-top: 5px;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #FF8C00;
  }
  
  @media (max-width: 480px) {
    margin-top: 10px;
    width: 100%;
    max-width: 500px;
    text-align: center;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    margin-top: 15px;
    
    &.tablet-hidden {
      display: none;
    }
  }
  
  &.tablet-visible {
    @media (min-width: 481px) and (max-width: 768px) {
      display: block;
      width: 100%;
      max-width: 500px;
      text-align: center;
      margin: 15px auto 0;
    }
    
    @media (min-width: 769px), (max-width: 480px) {
      display: none;
    }
  }
`;

const GameOverText = styled.div`
  color: #FF8C00;
  font-weight: bold;
  margin-top: 5px;
`;

const SectionTitle = styled.h3`
  color: #FF8C00;
  margin: 0 0 10px 0;
  font-size: 1rem;
  
  @media (min-width: 481px) and (max-width: 768px) {
    text-align: center;
  }
  
  /* Hide on mobile and desktop */
  @media (max-width: 480px), (min-width: 769px) {
    display: none;
  }
`;

interface PlayerScores {
  player1: number;
  player2: number;
}

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(state => state.game.board);
  const gameOver = useAppSelector(state => state.game.gameOver);
  
  const [scores, setScores] = useState<PlayerScores>(() => {
    const savedScores = localStorage.getItem('battleshipScores');
    return savedScores ? JSON.parse(savedScores) : { player1: 0, player2: 0 };
  });
  
  useEffect(() => {
    if (gameOver) {
      setScores(prev => {
        const updated = {
          ...prev,
          player1: prev.player1 + 1
        };
        localStorage.setItem('battleshipScores', JSON.stringify(updated));
        return updated;
      });
    }
  }, [gameOver]);

  const handleCellClick = useCallback((row: number, col: number) => {
    dispatch(fireShot([row, col]));
  }, [dispatch]);


  const resetScores = () => {
    const newScores = { player1: 0, player2: 0 };
    setScores(newScores);
    localStorage.setItem('battleshipScores', JSON.stringify(newScores));
  };

  const renderBoard = useMemo(() => {
    const cells = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        cells.push(
          <Cell
            key={`${row}-${col}`}
            state={board[row][col]}
            row={row}
            col={col}
            onClick={handleCellClick}
          />
        );
      }
    }
    return cells;
  }, [board, handleCellClick]);

  return (
    <div>
      <BoardHeader>
        <HeaderText>Battleship</HeaderText>
        {gameOver && <GameOverText>Game Over!</GameOverText>}
      </BoardHeader>
      
      <BoardContainer>
        {renderBoard}
      </BoardContainer>
      
      <ResponsiveContainer>
        <ScoreSection>
          <SectionTitle>Scores</SectionTitle>
          <ScoreRow>
            <PlayerScore player="player1" score={scores.player1} />
            <PlayerScore player="player2" score={scores.player2} />
          </ScoreRow>
          <ResetButton onClick={resetScores} className="tablet-hidden">Reset Scores</ResetButton>
        </ScoreSection>
        
        <ShipSection>
          <ShipStatus />
        </ShipSection>
      </ResponsiveContainer>
      
      <ResetButton 
        onClick={resetScores} 
        className="tablet-visible"
      >
        Reset Scores
      </ResetButton>
    </div>
  );
};

export default Board; 