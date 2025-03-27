import React from 'react';
import { PlayerScore, PlayerName, Score } from './PlayerScore.styles';

const formatScore = (score: number) => {
  return score < 10 ? `0${score}` : `${score}`;
};

const PlayerScores: React.FC<{ player: 'player1' | 'player2'; score: number }> = React.memo(({player, score}) => {
  return (
    <PlayerScore $player="player1">
      <PlayerName>Player {player === 'player1' ? '1' : '2'}</PlayerName>
      <Score>{formatScore(score)}</Score>
    </PlayerScore>
  );
});

export default PlayerScores;