import React from 'react';
import './Controls.css';

const Controls = ({
  resetState,
  calculateTurnScore,
  rollDice,
  checkForEndGame,
  scoreAndEndTurn,
  restart,
  scoreAndReroll,
  gameOver
}) => (
  <div className="controls">
    {gameOver ? (
      <button onClick={resetState}>Reset State</button>
    ) : (
      <>
        <button onClick={rollDice}>Roll Dice</button>
        <button onClick={calculateTurnScore}>Calculate Turn Score</button>
        <button onClick={scoreAndEndTurn}>Score & End Turn</button>
        <button onClick={resetState}>Reset State</button>
      </>
    )}
  </div>
);

export default Controls;
