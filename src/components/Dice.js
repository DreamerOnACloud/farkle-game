// src/components/Dice.js
import React, { useState } from 'react';

const Dice = () => {
  const [diceValues, setDiceValues] = useState(Array(6).fill(1));

  const rollDice = () => {
    setDiceValues(diceValues.map(() => Math.floor(Math.random() * 6) + 1));
  };

  return (
    <div>
      <div className="dice-container">
        {diceValues.map((value, index) => (
          <div key={index} className="dice">{value}</div>
        ))}
      </div>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default Dice;
