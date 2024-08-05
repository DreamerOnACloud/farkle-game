import React, { useState, useEffect } from 'react';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';
import { calculateScore, getScoringDiceIndices } from './gameLogic';

// Initialize dice with value and active status
const initializeDice = () => Array(6).fill().map((_, index) => ({ index, value: Math.floor(Math.random() * 6) + 1, active: true }));

const App = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [turnScore, setTurnScore] = useState(0);
  const [dice, setDice] = useState(initializeDice());
  const [scoreDetails, setScoreDetails] = useState("");

  // Call restartGame to initialize the game state
  useEffect(() => {
    restartGame();
  }, []);

  const updateScores = (dice) => {
    const diceValues = dice.map(die => die.value);
    const { score, scoreMessage } = calculateScore(diceValues);
    setTurnScore(score);
    setScoreDetails(`Turn score: ${score}. ${scoreMessage}`);
  };

  const firstRoll = () => {
    const newDice = initializeDice();
    setDice(newDice);
    updateScores(newDice);
  };

  const reroll = () => {
    const scoringDiceIndices = getScoringDiceIndices(dice.map(die => die.value));
    console.log("Scoring Dice Indices: ", scoringDiceIndices);

    const newDice = dice.map((die) => {
      if (!scoringDiceIndices.includes(die.index + 1)) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1, active: true };
      }
      return { ...die, active: false };
    });

    console.log("New Dice Values: ", newDice);
    setDice(newDice);
    updateScores(newDice);
  };

  const score = () => {
    const { score, scoreMessage } = calculateScore(dice.map(die => die.value));
    setTurnScore(score);
    setScoreDetails(scoreMessage);
  };

  const checkForEndGame = (newTotalScore) => {
    if (newTotalScore >= 4000) {
      setScoreDetails(`You win! Final score: ${newTotalScore}`);
    }
  };

  const endTurn = () => {
    const newTotalScore = totalScore + turnScore;
    setTotalScore(newTotalScore);
    setTurnScore(0);
    setDice(initializeDice()); // Reset dice for the next turn
    setScoreDetails(""); // Clear score details
  };

  const restartGame = () => {
    setTotalScore(0);
    setTurnScore(0);
    const newDice = initializeDice();
    setDice(newDice);
    setScoreDetails("");
    firstRoll(); // Initial roll on game restart
  };

  const scoreAndReroll = () => {
    score();
    endTurn();
    const newTotalScore = totalScore + turnScore;
    checkForEndGame(newTotalScore);

    if (newTotalScore < 4000) {
      reroll();
    }
  };

  return (
    <div className="App">
      <div className="scores">
        <div className="total-score">Total Score: {totalScore}</div>
        <div className="turn-score">Turn Score: {turnScore}</div>
      </div>
      <Dice dice={dice} />
      <Controls
        reroll={reroll}
        score={score}
        endTurn={endTurn}
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
