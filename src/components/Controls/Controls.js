import React from 'react';
import './Controls.css';

const Controls = ({
  resetState,
  calculateTurnScore,
  rollDice,
  checkForEndGame,
  scoreAndEndTurn,
  restart,
  scoreAndReroll
}) => (
  <div className="controls">

    <button onClick={rollDice}>Roll Dice</button>
    <button onClick={calculateTurnScore}>Calculate Turn Score</button>

    {/* <button onClick={checkForEndGame}>Check for End Game</button> */}
    <button onClick={scoreAndEndTurn}>Score & End Turn</button>
    <button onClick={resetState}>Reset State</button>
    {/* <button onClick={restart}>Restart</button> */}
    {/* <button onClick={scoreAndReroll}>Score and Reroll</button> */}
  </div>
);

export default Controls;
