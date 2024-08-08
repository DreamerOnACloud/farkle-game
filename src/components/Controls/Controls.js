import React from 'react';
import './Controls.css';

const Controls = ({
  resetState,
  calculateTurnScore,
  rollDice,
  scoreAndHold,
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
        <button onClick={scoreAndReroll}>Score & Reroll</button>
        <button onClick={scoreAndHold}>scoreAndHold</button>
        <button onClick={resetState}>Reset State</button>
      </>
    )}
  </div>
);

export default Controls;
