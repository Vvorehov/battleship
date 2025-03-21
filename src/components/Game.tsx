import React from 'react';
import styled from 'styled-components';
import Board from './Board';
import GameControls from './GameControls';
import carrierImage from '../assets/Carrier Shape.png';

const GameContainer = styled.div`
  padding: 20px;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    padding: 10px;
  }
  
  @media (min-width: 768px) {
    max-width: 800px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  
  @media (max-width: 480px) {
    margin-bottom: 15px;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #FF8C00;
  margin: 0;
  
  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 15px;
  
  @media (max-width: 480px) {
    height: 30px;
    margin-right: 0;
  }
`;

const Game: React.FC = () => {
  return (
    <GameContainer>
      <TitleContainer>
        <LogoImage src={carrierImage} alt="Battleship" />
        <Title>Battleship Game</Title>
      </TitleContainer>
      <Board />
      <GameControls />
    </GameContainer>
  );
};

export default Game; 