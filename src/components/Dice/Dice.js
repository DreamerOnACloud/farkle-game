import React from 'react';
import './Dice.css';

const Dice = ({ dice }) => (
  <div className="dice-container">
    {dice.map((die) => (
      <div
        key={die.index}
        className={`dice ${die.active ? 'active' : 'inactive'}`}
      >
        {die.value}
      </div>
    ))}
  </div>
);

export default Dice;
