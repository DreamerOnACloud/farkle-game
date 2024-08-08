import React, { useState, useEffect } from 'react';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';
import { calculateScore, getDiceValues, getDice } from './gameLogic';

const initialTotalScore = 0;
const initialTurnScore = 0;

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
  const [turnDiceState, setTurnDiceState] = useState(initialDiceState);
  const [scoreDetails, setScoreDetails] = useState(initialScoreDetails);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    restartGame();
  }, []);

  const rollDice = () => {
    console.log("Rolling dice...");
    const newDice = turnDiceState.map(die => {
      if (die.active) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1 };
      }
      return die;
    });
    console.log("New Dice Values after roll: ", newDice);
    setTurnDiceState(newDice);
  };

  const calculateTurnScore = () => {
    console.log("Calculating turn score...");
    const { score, scoreMessage, scoringDice, newDiceState } = calculateScore(turnDiceState);

    if (score === 0) {
      endGame();
      return;
    }
    console.log("Turn Score: ", score);
    console.log("Score Message: ", scoreMessage);
    console.log("Scoring Dice Indices: ", scoringDice);
    console.log("Updated Dice State after scoring: ", newDiceState);

    setTurnDiceState(newDiceState);
    setTurnScore(score);
    setScoreDetails(`Turn score: ${score}. ${scoreMessage}\n Scoring dice: ${scoringDice}`);
  };

  const endGame = () => {
    console.log("### Game over! ###");
    setScoreDetails("Game over!");
    setGameOver(true);
  };

  const updateScore = () => {
    const newTotalScore = totalScore + turnScore;
    const activeDice = turnDiceState.filter(die => die.active);

    console.log("Updating total score to: ", newTotalScore);
    setTotalScore(newTotalScore);
    setTurnScore(0);
    setScoreDetails("");

    if (activeDice.length === 0) {
      setTurnDiceState(initialDiceState);
      setScoreDetails(`You may reroll all dice!`);
    } else {
      setTurnDiceState(activeDice);
    }
  };

  const scoreAndReroll = () => {
    updateScore();
    rollDice();
  };

  const scoreAndEndTurn = () => {
    updateScore();
  };

  const checkForEndGame = (newTotalScore) => {
    if (newTotalScore >= 4000) {
      setScoreDetails(`You win! Final score: ${newTotalScore}`);
      endGame();
    }
  };

  const resetState = () => {
    setTotalScore(initialTotalScore);
    setTurnScore(initialTurnScore);
    setDiceState(initialDiceState);
    setTurnDiceState(initialDiceState);
    setScoreDetails(initialScoreDetails);
    setGameOver(false);
  };

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
      <Dice dice={getDice(turnDiceState)} />
      <Controls
        resetState={resetState}
        calculateTurnScore={calculateTurnScore}
        rollDice={rollDice}
        checkForEndGame={checkForEndGame}
        scoreAndReroll={scoreAndReroll}
        scoreAndEndTurn={scoreAndEndTurn}
        restart={restartGame}
        gameOver={gameOver}
      />
      <div className="score-details">
        {scoreDetails}
      </div>
    </div>
  );
};

export default App;
