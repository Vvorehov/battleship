import React from 'react';
import styled from 'styled-components';
import { CellState } from '../types';
import hitImage from '../assets/Hit.png';
import missImage from '../assets/Miss.png';

interface CellProps {
  state: CellState;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
}

const CellContainer = styled.div<{ $state: CellState }>`
  width: 100%;
  height: 0;
  padding-bottom: 100%; // square hack
  position: relative;
  border: 1px solid #cccccc;
  background-color: ${props => {
    switch (props.$state) {
      case 'empty':
        return 'white';
      case 'hit':
        return 'white';
      case 'miss':
        return 'white';
      case 'sunk':
        return '#FFE4B5'; // orange-ish for sunk ships
      default:
        return 'white'; 
    }
  }};
  cursor: ${props => props.$state === 'empty' ? 'pointer' : 'default'};
  transition: background-color 0.3s ease;

  /* Hover effect only applies to empty cells */
  &:hover {
    background-color: ${props => props.$state === 'empty' ? '#f5f5f5' : undefined};
  }
`;

const CellContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; // clip the image if needed
`;

const HitMissImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  padding: 0;
  margin: 0;
  clip-path: inset(5% 5% 5% 5%); // trim off the annoying border
`;

const Cell: React.FC<CellProps> = ({ state, row, col, onClick }) => {
  const handleClick = () => {
    if (state === 'empty') {
      onClick(row, col);
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'hit':
        return <HitMissImage src={hitImage} alt="Hit" />;
      case 'miss':
        return <HitMissImage src={missImage} alt="Miss" />;
      case 'sunk':
        // NOTE: we use the hit image for sunk too, but with orange background
        return <HitMissImage src={hitImage} alt="Sunk" />;
      default:
        return null;
    }
  };

  return (
    <CellContainer 
      $state={state} 
      onClick={handleClick} 
      data-testid={`cell-${row}-${col}`}
    >
      <CellContent>
        {renderContent()}
      </CellContent>
    </CellContainer>
  );
};

export default Cell; 