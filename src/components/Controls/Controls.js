import React from 'react';
import './Controls.css';

const Controls = ({ rollDice, score, endTurn, restart, scoreAndReroll }) => (
  <div className="controls">
    <button onClick={rollDice}>Roll Dice</button>
    <button onClick={endTurn}>Score & End Turn</button>
    <button onClick={scoreAndReroll}>Score and Reroll</button>
    <button onClick={restart}>Restart</button>
  </div>
);

export default Controls;
