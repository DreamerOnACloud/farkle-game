import React, { useState } from 'react';
import Scoreboard from './components/Scoreboard/Scoreboard.js';
import Dice from './components/Dice/Dice.js';

const calculateScore = (diceValues) => {
  let counts = Array(6).fill(0);
  let score = 0;
  let scoreMessage = "";

  // Count occurrences of each dice value
  diceValues.forEach(value => counts[value - 1]++);

  // Calculate score based on counts
  counts.forEach((count, index) => {
    if (count >= 3) {
      if (index === 0) {
        score += 1000 * (count === 3 ? 1 : 2 ** (count - 3)); // Special rule for 1s
        scoreMessage += `${count} "1"s = ${1000 * (count === 3 ? 1 : 2 ** (count - 3))} points. `;
      } else {
        score += (index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3));
        scoreMessage += `${count} "${index + 1}"s = ${(index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3))} points. `;
      }
      counts[index] -= 3;
    }
  });

  // Add scores for single 1s and 5s
  score += counts[0] * 100;
  scoreMessage += counts[0] ? `${counts[0]} single "1"s = ${counts[0] * 100} points. ` : "";
  score += counts[4] * 50;
  scoreMessage += counts[4] ? `${counts[4]} single "5"s = ${counts[4] * 50} points. ` : "";

  return { score, scoreMessage };
};

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [scoreDetails, setScoreDetails] = useState("");
  
  const updateScore = (diceValues) => {
    const { score, scoreMessage } = calculateScore(diceValues);
    setPlayerScore(prevScore => prevScore + score);
    setScoreDetails(`New score is ${playerScore + score}: ${scoreMessage}`);
  };

  return (
    <div className="App">
      <Scoreboard playerScore={playerScore} opponentScore={0} />
      <Dice onScoreUpdate={updateScore} />

      <div className="border p-4 mt-4 bg-gray-100 rounded">
        {scoreDetails}
      </div>
    </div>
  );
}

export default App;
