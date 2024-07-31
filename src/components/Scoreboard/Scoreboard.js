import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ playerScore, opponentScore }) => {
  return (
    <div className="scoreboard">
      <div className="score">
        <h2>Player</h2>
        <p>{playerScore}</p>
      </div>
      <div className="score">
        <h2>Opponent</h2>
        <p>{opponentScore}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
