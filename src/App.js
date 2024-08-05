import React, { useState, useEffect } from 'react';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';
import { calculateScore, getScoringDiceIndices, initialDiceState, updateDiceState } from './gameLogic';


// Helper function to get dice values
const getDiceValues = (diceState) => diceState.map(die => die.value);

// Helper function to get dice object
const getDice = (diceState) => diceState.map(die => ({ index: die.index, value: die.value, active: die.active }));

const App = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [turnScore, setTurnScore] = useState(0);
  const [diceState, setDiceState] = useState(initialDiceState());
  const [scoreDetails, setScoreDetails] = useState("");

  // Call restartGame to initialize the game state
  useEffect(() => {
    restartGame();
  }, []);

  const updateScores = (diceState) => {
    const diceValues = getDiceValues(diceState);
    const { score, scoreMessage } = calculateScore(diceValues);
    setTurnScore(score);
    setScoreDetails(`Turn score: ${score}. ${scoreMessage}`);
  };

  const firstRoll = () => {
    const newDice = updateDiceState();
    setDiceState(newDice);
    updateScores(newDice);
  };

  const reroll = () => {
    const scoringDiceIndices = getScoringDiceIndices(getDiceValues(diceState));
    console.log("Scoring Dice Indices: ", scoringDiceIndices);

    const newDice = diceState.map((die) => {
      if (!scoringDiceIndices.includes(die.index + 1)) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1, active: true };
      }
      return { ...die, active: false };
    });

    console.log("New Dice Values: ", newDice);
    setDiceState(newDice);
    updateScores(newDice);
  };

  const score = () => {
    const { score, scoreMessage } = calculateScore(getDiceValues(diceState));
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
    setDiceState(updateDiceState()); // Reset dice for the next turn
    setScoreDetails(""); // Clear score details
  };

  const restartGame = () => {
    setTotalScore(0);
    setTurnScore(0);
    const newDice = updateDiceState();
    setDiceState(newDice);
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
      <Dice dice={getDice(diceState)} />
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
