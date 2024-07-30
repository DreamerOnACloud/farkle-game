// src/components/Scoreboard.js
import React from 'react';

const Scoreboard = ({ playerScore, opponentScore }) => {
  return (
    <div className="scoreboard">
      <div>Player: {playerScore}</div>
      <div>Opponent: {opponentScore}</div>
    </div>
  );
}

export default Scoreboard;
