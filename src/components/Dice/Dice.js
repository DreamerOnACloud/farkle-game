import React from 'react';
import './Dice.css';

const Dice = ({ dice }) => (
  <div className="dice-container">
    {dice.map((die, index) => (
      <div key={index} className="dice">{die.value}</div>
    ))}
  </div>
);

export default Dice;
