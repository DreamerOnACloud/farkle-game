import React, { useState, useEffect } from 'react';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';
import { calculateScore, getScoringDiceIndices, initialDiceState, updateDiceState, getDiceValues, getDice } from './gameLogic';

const App = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [turnScore, setTurnScore] = useState(0);
  const [diceState, setDiceState] = useState(initialDiceState());
  const [scoreDetails, setScoreDetails] = useState("");

  useEffect(() => {
    restartGame();
  }, []);

  const updateScores = (diceState) => {
    const diceValues = getDiceValues(diceState);
    const { score, scoreMessage } = calculateScore(diceValues);
    setTurnScore(score);
    setScoreDetails(`Turn score: ${score}. ${scoreMessage}`);
  };

  const rollDice = () => {
    const newDice = diceState.map(die => {
      if (die.active) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1 };
      }
      return die;
    });
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
    setDiceState(updateDiceState(initialDiceState())); // Reset dice for the next turn
    setScoreDetails("");
  };

  const restartGame = () => {
    setTotalScore(0);
    setTurnScore(0);
    initializeGame();
  };
  
  const initializeGame = () => {
    const newDice = updateDiceState(initialDiceState());
    setDiceState(newDice);
    setScoreDetails("");
    rollDice(newDice); // Initial roll on game restart
  };
  

  const scoreAndReroll = () => {
    score();
    endTurn();
    const newTotalScore = totalScore + turnScore;
    checkForEndGame(newTotalScore);
    if (newTotalScore < 4000) {
      rollDice();
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
        rollDice={rollDice}
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
