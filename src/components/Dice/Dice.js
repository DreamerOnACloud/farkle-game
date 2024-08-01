import React from 'react';
import './Dice.css';

const Dice = ({ diceValues }) => (
  <div className="dice-container">
    {diceValues.map((value, index) => (
      <div key={index} className="dice">{value}</div>
    ))}
  </div>
);

export default Dice;
