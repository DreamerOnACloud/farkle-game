export const calculateTripletScore = (count, index) => {
  if (index === 0) { // Special case for 1s
    return 1000 * (count === 3 ? 1 : 2 ** (count - 3));
  } else {
    return (index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3));
  }
};

export const addSingleScores = (counts, scoringDice) => {
  let score = 0;
  let scoreMessage = "";

  if (counts[0] < 3) { // Single 1s
    score += counts[0] * 100;
    if (counts[0]) scoreMessage += `${counts[0]} single "1"s = ${counts[0] * 100} points. `;
    scoringDice.push(...Array(counts[0]).fill(1));
  }

  if (counts[4] < 3) { // Single 5s
    score += counts[4] * 50;
    if (counts[4]) scoreMessage += `${counts[4]} single "5"s = ${counts[4] * 50} points. `;
    scoringDice.push(...Array(counts[4]).fill(5));
  }

  return { score, scoreMessage };
};

export const getScoringDiceIndices = (diceValues) => {
  let indices = [];
  diceValues.forEach((value, index) => {
    if (value === 1 || value === 5 || diceValues.filter(v => v === value).length >= 3) {
      indices.push(index);
    }
  });
  return indices;
};

export const calculateScore = (diceValues) => {
  let counts = Array(6).fill(0);
  let score = 0;
  let scoreMessage = "";
  let scoringDice = [];

  diceValues.forEach((value) => counts[value - 1]++);

  counts.forEach((count, index) => {
    if (count >= 3) {
      if (index === 0) {
        score += 1000 * (count === 3 ? 1 : 2 ** (count - 3));
        scoreMessage += `${count} "1"s = ${1000 * (count === 3 ? 1 : 2 ** (count - 3))} points. `;
      } else {
        score += (index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3));
        scoreMessage += `${count} "${index + 1}"s = ${(index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3))} points. `;
      }
      scoringDice.push(...getScoringDiceIndices(diceValues, index + 1));
    }
  });

  const singleScores = addSingleScores(counts, scoringDice);
  score += singleScores.score;
  scoreMessage += singleScores.scoreMessage;

  return { score, scoreMessage, scoringDice };
};
