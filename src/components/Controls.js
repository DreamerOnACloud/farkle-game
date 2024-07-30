// src/components/Controls.js
import React from 'react';

const Controls = ({ onRoll, onHold }) => {
  return (
    <div className="controls">
      <button onClick={onRoll}>Roll</button>
      <button onClick={onHold}>Hold</button>
    </div>
  );
}

export default Controls;
