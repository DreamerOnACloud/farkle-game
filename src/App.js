import React, { useState, useEffect } from 'react';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';
import { calculateScore, getDiceValues, getDice } from './gameLogic';

const initialTotalScore = 0;
const initialTurnScore = 0;

// Define the initial state of dice with all values set to 0 and active status
const initialDiceState = [
  { index: 0, value: 0, active: true },
  { index: 1, value: 0, active: true },
  { index: 2, value: 0, active: true },
  { index: 3, value: 0, active: true },
  { index: 4, value: 0, active: true },
  { index: 5, value: 0, active: true }
];

const initialScoreDetails = "";

const App = () => {
  const [totalScore, setTotalScore] = useState(initialTotalScore);
  const [turnScore, setTurnScore] = useState(initialTurnScore);
  const [diceState, setDiceState] = useState(initialDiceState);
  const [scoreDetails, setScoreDetails] = useState(initialScoreDetails);

  useEffect(() => {
    restartGame();
  }, []);

  // Roll only active dice
  const rollDice = () => {
    console.log("Rolling dice...");
    const newDice = diceState.map(die => {
      if (die.active) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1 };
      }
      return die;
    });
    console.log("New Dice Values after roll: ", newDice);
    setDiceState(newDice);
  };

  // Update dice state based on scoring dice indices
  const updateDiceState = (scoringDiceIndices, diceState) => {
    console.log("Updating dice state...");
    const updatedDiceState = diceState.map((die, index) => ({
      ...die,
      active: !scoringDiceIndices.includes(index)
    }));
    console.log("Updated Dice State: ", updatedDiceState);
    setDiceState(updatedDiceState);
  };

  // Calculate turn score and update dice state
  const calculateTurnScore = () => {
    console.log("Calculating turn score...");
    const { score, scoreMessage, scoringDice, newDiceState } = calculateScore(diceState);
    console.log("Turn Score: ", score);
    console.log("Score Message: ", scoreMessage);
    console.log("Scoring Dice Indices: ", scoringDice);
    console.log("Updated Dice State after scoring: ", newDiceState);

    setDiceState(newDiceState);
    setTurnScore(score);
    setScoreDetails(`Turn score: ${score}. ${scoreMessage}\n Scoring dice: ${scoringDice}`);
  };

  // Update total score and reset turn score
  const score = () => {
    const newTotalScore = totalScore + turnScore;
    console.log("Updating total score to: ", newTotalScore);
    setTotalScore(newTotalScore);
    setTurnScore(0);
    setScoreDetails("");
  };

  // Calculate score and end the turn
  const scoreAndEndTurn = () => {
    score();
  };

  // Calculate score, check for end game, and reroll if game is not over
  const scoreAndReroll = () => {
    calculateTurnScore();
    const newTotalScore = totalScore + turnScore;
    checkForEndGame(newTotalScore);
    if (newTotalScore < 4000) {
      rollDice();
    }
  };

  // Check if the game has ended
  const checkForEndGame = (newTotalScore) => {
    if (newTotalScore >= 4000) {
      setScoreDetails(`You win! Final score: ${newTotalScore}`);
    }
  };

  // Reset the game state
  const resetState = () => {
    setTotalScore(initialTotalScore);
    setTurnScore(initialTurnScore);
    setDiceState(initialDiceState);
    setScoreDetails(initialScoreDetails);
  };

  // Restart the game
  const restartGame = () => {
    resetState();
    rollDice();
  };

  return (
    <div className="App">
      <div className="scores">
        <div className="total-score">Total Score: {totalScore}</div>
        <div className="turn-score">Turn Score: {turnScore}</div>
      </div>
      <Dice dice={getDice(diceState)} />
      <Controls
        resetState={resetState}
        calculateTurnScore={calculateTurnScore}
        rollDice={rollDice}
        checkForEndGame={checkForEndGame}
        scoreAndEndTurn={scoreAndEndTurn}
        restart={restartGame}
        scoreAndReroll={scoreAndReroll}
      />
      <div className="score-details">
        {scoreDetails}
      </div>
    </div>
  );
};

export default App;
