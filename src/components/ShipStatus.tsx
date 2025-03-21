import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/useAppSelector';
import { ShipTypes } from '../types';
import carrierImage from '../assets/Carrier Shape.png';
import battleshipImage from '../assets/Battleship Shape.png';
import cruiserImage from '../assets/Cruiser Shape.png';
import submarineImage from '../assets/Submarine Shape.png';
import aircraftImage from '../assets/Aircraft Shape.png';
import hitSmallImage from '../assets/Hit small.png';
import missSmallImage from '../assets/Miss small.png';

const StatusContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  margin: 20px auto 0; // double margin (top) - oh well, CSS is forgiving
  
  @media (max-width: 480px) {
    margin-top: 15px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    margin: 0;
    width: 66.6%; /* 2/3 of the width for tablet */
    max-width: none;
    margin-left: 0;
    padding-left: 0;
  }
`;

const StatusHeader = styled.h3`
  color: #FF8C00; // orange matches the theme
  margin: 10px 0;
  text-align: center;
  
  @media (min-width: 481px) and (max-width: 768px) {
    margin: 5px 0;
    font-size: 1rem;
    text-align: left;
    padding-left: 10px;
  }
`;

const ShipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  // smaller gap on mobile
  @media (max-width: 480px) {
    gap: 8px;
  }
  
  // even smaller on tablet
  @media (min-width: 481px) and (max-width: 768px) {
    gap: 5px;
    padding-right: 10px;
  }
`;

const ShipRow = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: white;
  
  // tighter padding on mobile & tablet
  @media (max-width: 480px) {
    padding: 6px 10px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 4px 8px;
  }
`;

const ShipImage = styled.img`
  height: 20px;
  margin-right: 10px;
  
  @media (max-width: 480px) {
    height: 16px;
    margin-right: 8px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    height: 14px;
    margin-right: 6px;
  }
`;

const HealthBar = styled.div`
  display: flex;
  gap: 4px;
  flex: 1;
  
  @media (max-width: 480px) {
    gap: 2px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    gap: 2px;
  }
`;

const HealthDot = styled.div<{ isHit: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

const DotIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SunkLabel = styled.div`
  margin-left: 10px;
  color: #FF8C00;
  font-weight: bold;
  
  @media (min-width: 481px) and (max-width: 768px) {
    margin-left: 6px;
    font-size: 0.8rem;
  }
`;
// ToDO fix -> found mistake in the ship types, destroyer is actually the aircraft carrier
const shipPics = {
  destroyer: aircraftImage,
  battleship: battleshipImage,
  cruiser: cruiserImage,
  submarine: submarineImage,
  carrier: carrierImage
};

const shipDisplayOrder = ['destroyer', 'battleship', 'cruiser', 'submarine', 'carrier'] as const;

const ShipStatus: React.FC = () => {
  const ships = useAppSelector(state => state.game.shipStates);
  
  const renderShip = (shipType: keyof ShipTypes) => {
    const ship = ships[shipType];
    const hits = ship.hits.map(pos => `${pos[0]},${pos[1]}`);
    
    
    return (
      <ShipRow key={shipType}>
        <ShipImage src={shipPics[shipType]} alt={shipType} />
        <HealthBar>
          {ship.positions.map((pos, i) => {
            const posKey = `${pos[0]},${pos[1]}`;
            const wasHit = ship.isSunk && hits.includes(posKey);
            
            return (
              <HealthDot key={i} isHit={wasHit}>
                <DotIcon 
                  src={wasHit ? hitSmallImage : missSmallImage} 
                  alt={wasHit ? "Hit" : "OK"} 
                />
              </HealthDot>
            );
          })}
        </HealthBar>
        {ship.isSunk && <SunkLabel>SUNK</SunkLabel>}
      </ShipRow>
    );
  };

  return (
    <StatusContainer>
      <StatusHeader>Ship Status</StatusHeader>
      <ShipsContainer>
        {shipDisplayOrder.map(shipType => 
          renderShip(shipType)
        )}
      </ShipsContainer>
    </StatusContainer>
  );
};

export default ShipStatus; 