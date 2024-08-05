import React, { useState, useEffect } from 'react';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';
import { calculateScore, getScoringDiceIndices, updateDiceState, getDiceValues, getDice } from './gameLogic';

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

  const rollDice = () => {
    const newDice = diceState.map(die => {
      if (die.active) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1 };
      }
      return die;
    });
    setDiceState(newDice);
    // updateTurnScore(newDice);
  };

  const updateTurnScore = (diceState) => {
    const diceValues = diceState.map(die => die.value);
    const { score, scoreMessage, scoringDice } = calculateScore(diceValues);
    setTurnScore(score);
    setScoreDetails(`Turn score: ${score}. ${scoreMessage}\n Scoring dice: ${scoringDice}`);
  };

  const score = () => {
    const newTotalScore = totalScore + turnScore;
    setTotalScore(newTotalScore);
    setTurnScore(0);
    setScoreDetails("");
  }

  const scoreAndEndTurn = () => {
    score();
    // update playable dice
  };

  const scoreAndReroll = () => {
    updateTurnScore();
    const newTotalScore = totalScore + turnScore;
    checkForEndGame(newTotalScore);
    if (newTotalScore < 4000) {
      rollDice();
    }
  };

  const checkForEndGame = (newTotalScore) => {
    if (newTotalScore >= 4000) {
      setScoreDetails(`You win! Final score: ${newTotalScore}`);
    }
  };

  const resetState = () => {
    setTotalScore(initialTotalScore);
    setTurnScore(initialTurnScore);
    setDiceState(initialDiceState);
    setScoreDetails(initialScoreDetails);
  };

  const restartGame = () => {
    resetState();
    rollDice();
  };

  useEffect(() => {
    restartGame();
  }, []);

  return (
    <div className="App">
      <div className="scores">
        <div className="total-score">Total Score: {totalScore}</div>
        <div className="turn-score">Turn Score: {turnScore}</div>
      </div>
      <Dice dice={getDice(diceState)} />
      <Controls
        resetState={resetState}
        updateTurnScore={() => updateTurnScore(diceState)}
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
