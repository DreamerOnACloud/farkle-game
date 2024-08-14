import React, { useState, useEffect } from 'react';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';
import { calculateScore, getDiceValues, getDice } from './gameLogic';
import './App.css';

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
  const [scoreHistory, setScoreHistory] = useState([]);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    if (isScoreUpdated) {
      rollDice();
      setIsScoreUpdated(false);
    }
  }, [isScoreUpdated]);

  useEffect(() => {
    if (isPlayerChanged) {
      rollDice();
      setIsPlayerChanged(false);
    }
  }, [isPlayerChanged]);

  useEffect(() => {
    // Check if the current player's score exceeds or meets the winning threshold
    if (player1Score >= 4000 || player2Score >= 4000) {
      setScoreDetails(`Player ${currentPlayer} wins! Final score: ${currentPlayer === 1 ? player1Score : player2Score}`);
      setGameOver(true);
    }
  }, [player1Score, player2Score, currentPlayer]);

  useEffect(() => {
    // Log the correct player after the state has been updated
    if (isPlayerChanged) {
      setScoreDetails(`Now it is Player ${currentPlayer}'s turn.`);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (scoreDetails) {
      setScoreHistory(prevHistory => [...prevHistory, scoreDetails]);
    }
  }, [scoreDetails]);

  const rollDice = () => {
    const newDice = turnDiceState.map(die => {
      if (die.active) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1 };
      }
      return die;
    });
    setTurnDiceState(newDice);
  };

  const calculateTurnScore = () => {
    const { score, scoreMessage, scoringDice, newDiceState } = calculateScore(turnDiceState);

    if (score === 0) {
      setTurnScore(0);
      alternatePlayer();
      return;
    }

    setTurnDiceState(newDiceState);
    setTurnScore(score);
    setScoreDetails(`Turn score: ${score}. ${scoreMessage}\n Scoring dice: ${scoringDice}`);
  };

  const endGame = () => {
    setGameOver(true);
  };

  const updateScore = () => {
    const newTotalScore = currentPlayer === 1 ? player1Score + turnScore : player2Score + turnScore;
    const activeDice = turnDiceState.filter(die => die.active);

    if (currentPlayer === 1) {
      setPlayer1Score(newTotalScore);
    } else {
      setPlayer2Score(newTotalScore);
    }

    setTurnScore(0);
    setScoreDetails("");

    if (activeDice.length === 0) {
      setTurnDiceState(initialDiceState);
      setScoreDetails(`You may reroll all dice!`);
    } else {
      setTurnDiceState(activeDice);
    }
    setIsScoreUpdated(true);
  };

  const alternatePlayer = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setTurnDiceState(initialDiceState);
    setIsPlayerChanged(true);
  };

  const scoreAndReroll = () => {
    updateScore();
  };

  const scoreAndHold = () => {
    updateScore();
    alternatePlayer();
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
    setScoreHistory([]);
  };

  const restartGame = () => {
    resetState();
    rollDice();
  };

  return (
    <div className="App">
      <div className="scores">
        <div className={`player-score player-1-score ${currentPlayer === 1 ? 'active-player' : ''}`}>
          Player 1 Score: {player1Score}
        </div>
        <div className={`player-score player-2-score ${currentPlayer === 2 ? 'active-player' : ''}`}>
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
        scoreAndReroll={scoreAndReroll}
        scoreAndHold={scoreAndHold}
        gameOver={gameOver}
        currentPlayer={currentPlayer}
      />
      <div className="score-details">
        {scoreDetails}
      </div>
      <div className="logs">
        <h3 className="logs-header">Logs</h3>
        <div className="score-history">
          {scoreHistory.map((detail, index) => (
            <div key={index}>{detail}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
