import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { resetGame } from '../store/gameSlice';

const ControlsContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  
  @media (max-width: 480px) {
    margin: 15px auto;
  }
`;

const ResetButton = styled.button`
  background-color: #FF8C00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #E67E00;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const GameControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameOver = useAppSelector(state => state.game.gameOver);
  const shots = useAppSelector(state => state.game.shots);
  
  const handleReset = () => {
    dispatch(resetGame());
  };
  
  const hasStarted = shots > 0;
  
  return (
    <ControlsContainer>
      {(hasStarted || gameOver) && (
        <ResetButton onClick={handleReset}>
          {gameOver ? 'New Game' : 'Reset Game'}
        </ResetButton>
      )}
    </ControlsContainer>
  );
};

export default GameControls; 