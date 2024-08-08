import React, { useState, useEffect } from 'react';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';
import { calculateScore, getDiceValues, getDice } from './gameLogic';
import './App.css'; // Assuming you have a CSS file for styling

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
  const [turnScore, setTurnScore] = useState(initialTurnScore);
  const [diceState, setDiceState] = useState(initialDiceState);
  const [turnDiceState, setTurnDiceState] = useState(initialDiceState);
  const [scoreDetails, setScoreDetails] = useState(initialScoreDetails);
  const [gameOver, setGameOver] = useState(false);
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);
  const [isPlayerChanged, setIsPlayerChanged] = useState(false);

  // State for players
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    if (isScoreUpdated) {
      rollDice();
      setIsScoreUpdated(false); // Reset the flag after rolling dice
    }
  }, [isScoreUpdated]);

  useEffect(() => {
    if (isPlayerChanged) {
      rollDice();
      setIsPlayerChanged(false); // Reset the flag after rolling dice
    }
  }, [isPlayerChanged]);

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
      console.log("No score for this turn. Switching player...");
      setTurnScore(0);
      setScoreDetails(`No score for this turn. Switching to player ${currentPlayer === 1 ? 2 : 1}`);
      alternatePlayer();
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
    setGameOver(true);
  };

  const updateScore = () => {
    console.log("Executing updateScore...");
    const newTotalScore = currentPlayer === 1 ? player1Score + turnScore : player2Score + turnScore;
    const activeDice = turnDiceState.filter(die => die.active);

    if (currentPlayer === 1) {
      setPlayer1Score(newTotalScore);
    } else {
      setPlayer2Score(newTotalScore);
    }

    console.log("Updating total score for player ", currentPlayer, " to: ", newTotalScore);
    setTurnScore(0);
    setScoreDetails("");

    if (activeDice.length === 0) {
      console.log("No active dice, resetting to initial state.");
      setTurnDiceState(initialDiceState);
      setScoreDetails(`You may reroll all dice!`);
    } else {
      console.log("Setting active dice for next roll: ", activeDice);
      setTurnDiceState(activeDice);
    }

    // Check for end game condition after score update
    checkForEndGame(newTotalScore);

    // Indicate that score update is complete
    setIsScoreUpdated(true);
  };

  const alternatePlayer = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setTurnDiceState(initialDiceState);
    setIsPlayerChanged(true);
  };

  const scoreAndReroll = () => {
    console.log("Executing scoreAndReroll...");
    updateScore();
  };

  const scoreAndHold = () => {
    updateScore();
    alternatePlayer();
  };

  const checkForEndGame = (newTotalScore) => {
    if (newTotalScore >= 4000) {
      setScoreDetails(`Player ${currentPlayer} wins! Final score: ${newTotalScore}`);
      endGame();
    }
  };

  const resetState = () => {
    setTurnScore(initialTurnScore);
    setDiceState(initialDiceState);
    setTurnDiceState(initialDiceState);
    setScoreDetails(initialScoreDetails);
    setGameOver(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(1);
  };

  const restartGame = () => {
    resetState();
    rollDice();
  };

  return (
    <div className="App">
      <div className="scores">
        <div className={`player-score ${currentPlayer === 1 ? 'active-player' : ''}`}>
          Player 1 Score: {player1Score}
        </div>
        <div className={`player-score ${currentPlayer === 2 ? 'active-player' : ''}`}>
          Player 2 Score: {player2Score}
        </div>
        <div className="turn-score">Turn Score: {turnScore}</div>
        <div className="current-player">Current Player: {currentPlayer}</div>
      </div>
      <Dice dice={getDice(turnDiceState)} />
      <Controls
        resetState={resetState}
        calculateTurnScore={calculateTurnScore}
        rollDice={rollDice}
        checkForEndGame={checkForEndGame}
        scoreAndReroll={scoreAndReroll}
        scoreAndHold={scoreAndHold}
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
