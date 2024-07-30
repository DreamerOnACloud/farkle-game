// src/components/Dice.js
import React, { useState } from 'react';
import './Dice.css'; // Import your CSS file

const Dice = () => {
  const [diceValues, setDiceValues] = useState(Array(6).fill(1));

  const rollDice = () => {
    const newDiceValues = diceValues.map(() => Math.floor(Math.random() * 6) + 1);
    setDiceValues(newDiceValues);
  
    // Trigger animation
    const diceElements = document.querySelectorAll('.dice');
    diceElements.forEach(die => {
      die.classList.add('roll');
      setTimeout(() => die.classList.remove('roll'), 300); // Match the duration with CSS
    });
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
