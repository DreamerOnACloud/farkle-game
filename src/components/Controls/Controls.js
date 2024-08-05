import React from 'react';
import './Controls.css';

const Controls = ({ reroll, score, endTurn, restart, scoreAndReroll }) => (
  <div className="controls">
    <button onClick={restart}>Restart</button>
    <button onClick={scoreAndReroll}>Score and Reroll</button>
  </div>
);

export default Controls;
