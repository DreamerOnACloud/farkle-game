import React from 'react';
import './Controls.css';

const Controls = ({ roll, reroll, score, endTurn, restart, scoreAndReroll }) => (
  <div className="controls">
    <button onClick={reroll}>Reroll</button>
    <button onClick={score}>Score</button>
    <button onClick={endTurn}>End Turn</button>
    <button onClick={restart}>Restart</button>
    <button onClick={scoreAndReroll}>Score and Reroll</button>
  </div>
);

export default Controls;
