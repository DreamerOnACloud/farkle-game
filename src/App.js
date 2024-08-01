import React, { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard/Scoreboard.js';
import Dice from './components/Dice/Dice.js';
import Controls from './components/Controls/Controls.js';

const calculateScore = (diceValues) => {
  let counts = Array(6).fill(0);
  let score = 0;
  let scoreMessage = "";
  let scoringDice = [];

  // Count occurrences of each dice value
  diceValues.forEach((value) => counts[value - 1]++);

  // Calculate score based on counts
  counts.forEach((count, index) => {
    if (count >= 3) {
      if (index === 0) {
        score += 1000 * (count === 3 ? 1 : 2 ** (count - 3));
        scoreMessage += `${count} "1"s = ${1000 * (count === 3 ? 1 : 2 ** (count - 3))} points. `;
      } else {
        score += (index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3));
        scoreMessage += `${count} "${index + 1}"s = ${(index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3))} points. `;
      }
      scoringDice.push(...Array(count).fill(index + 1));
    }
  });

  // TODO: Implement additional Farkle scoring combinations:
  // - Straight (1-2-3-4-5-6): 1500 points
  // - Three pairs: 1500 points
  // - Four of a kind: 2 * value * 100 points (except 1s = 2000 points)
  // - Five of a kind: 3 * value * 100 points (except 1s = 3000 points)
  // - Six of a kind: 4 * value * 100 points (except 1s = 4000 points)


  // Add scores for single 1s and 5s
  if (counts[0] < 3) {
    score += counts[0] * 100;
    if (counts[0]) scoreMessage += `${counts[0]} single "1"s = ${counts[0] * 100} points. `;
  }
  if (counts[4] < 3) {
    score += counts[4] * 50;
    if (counts[4]) scoreMessage += `${counts[4]} single "5"s = ${counts[4] * 50} points. `;
  }

  return { score, scoreMessage, scoringDice };
};

const App = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [turnScore, setTurnScore] = useState(0);
  const [diceValues, setDiceValues] = useState(Array(6).fill(1));
  const [scoreDetails, setScoreDetails] = useState("");

  // Call restartGame to initialize the game state
  useEffect(() => {
    restartGame();
  }, []);

  const updateScores = (newValues) => {
    const { score, scoreMessage } = calculateScore(newValues);
    setTurnScore(score);
    setScoreDetails(`Turn score: ${score}. ${scoreMessage}`);
  };

  const firstRoll = () => {
    const newValues = Array(6).fill().map(() => Math.floor(Math.random() * 6) + 1);
    setDiceValues(newValues);
    updateScores(newValues);
  };
  
  const reroll = () => {
    const { scoringDice } = calculateScore(diceValues);
    const newValues = diceValues.map((val, idx) => scoringDice.includes(idx + 1) ? val : Math.floor(Math.random() * 6) + 1);
    setDiceValues(newValues);
    updateScores(newValues);
  };
  

  const score = () => {
    const { score, scoreMessage } = calculateScore(diceValues);
    setTurnScore(score);
    setScoreDetails(scoreMessage);
  };

  const checkForEndGame = (newTotalScore) => {
    console.log("Checking end game condition. Total score:", newTotalScore);
    if (newTotalScore >= 4000) {
      setScoreDetails(`You win! Final score: ${newTotalScore}`);
      console.log("Game won! Final score set.");
    }
  };
  

  const endTurn = () => {
    const newTotalScore = totalScore + turnScore;
    console.log("End turn. New total score:", newTotalScore);
    setTotalScore(newTotalScore);
    setTurnScore(0);
    setDiceValues(Array(6).fill(1)); // Reset dice for the next turn
    setScoreDetails(""); // Clear score details
  };

  const restartGame = () => {
    setTotalScore(0);
    setTurnScore(0);
    setDiceValues(Array(6).fill(1));
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
      <Dice diceValues={diceValues} />
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
