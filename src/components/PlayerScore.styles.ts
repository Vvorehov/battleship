import { styled } from "styled-components";

export const PlayerScore = styled.div<{ $player: 'player1' | 'player2' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.$player === 'player1' ? '#FF8C00' : '#4CAF50'};
  
  /* Desktop */
  @media (min-width: 769px) {
    border-radius: 8px;
    padding: 8px 15px;
    min-width: 100px;
  }
  
  /* Tablet */
  @media (min-width: 481px) and (max-width: 768px) {
    border-radius: 8px;
    padding: 8px 15px;
    width: 100%;
    min-width: unset;
  }
  
  /* Mobile */
  @media (max-width: 480px) {
    border-radius: 0;
    padding: 10px 0;
    flex: 1;
    height: 100%;
    justify-content: center;
  }
`;

// Player name display
export const PlayerName = styled.div`
  font-weight: 600;
  color: white;
  
  /* Desktop & Tablet - name above score */
  @media (min-width: 481px) {
    margin-bottom: 4px;
    order: -1;
  }
  
  /* Mobile - name below score */
  @media (max-width: 480px) {
    margin-top: 4px;
    order: 1;
  }
`;

export const Score = styled.div`
  font-weight: 700;
  color: white;
  
  /* Desktop */
  @media (min-width: 769px) {
    font-size: 1.2rem;
    order: 1;
  }
  
  /* Tablet */
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.2rem;
    order: 1;
  }
  
  /* Mobile - make score bigger & show first */
  @media (max-width: 480px) {
    font-size: 1.4rem;
    order: -1;
  }
`;