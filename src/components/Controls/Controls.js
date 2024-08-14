import React from "react";
import "./Controls.css";

const Controls = ({ 
  resetState, 
  calculateTurnScore, 
  rollDice, 
  scoreAndReroll, 
  scoreAndHold, 
  gameOver, 
  currentPlayer 
}) => (
  <div className="controls">
    {gameOver ? (
      <button
        className={`control-button ${currentPlayer === 1 ? "player-1-button" : "player-2-button"}`}
        onClick={resetState}
      >
        Reset State
      </button>
    ) : (
      <>
        <button
          className={`control-button ${currentPlayer === 1 ? "player-1-button" : "player-2-button"}`}
          onClick={rollDice}
        >
          Roll Dice
        </button>
        <button
          className={`control-button ${currentPlayer === 1 ? "player-1-button" : "player-2-button"}`}
          onClick={calculateTurnScore}
        >
          Calculate Turn Score
        </button>
        <button
          className={`control-button ${currentPlayer === 1 ? "player-1-button" : "player-2-button"}`}
          onClick={scoreAndReroll}
        >
          Score & Reroll
        </button>
        <button
          className={`control-button ${currentPlayer === 1 ? "player-1-button" : "player-2-button"}`}
          onClick={scoreAndHold}
        >
          scoreAndHold
        </button>
        <button
          className={`control-button ${currentPlayer === 1 ? "player-1-button" : "player-2-button"}`}
          onClick={resetState}
        >
          Reset State
        </button>
      </>
    )}
  </div>
);

export default Controls;
