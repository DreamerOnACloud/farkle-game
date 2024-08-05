// Update dice state with random values
export const updateDiceState = (dice) => dice.map(die => ({ ...die, value: Math.floor(Math.random() * 6) + 1 }));

export const calculateTripletScore = (count, index) => {
  if (index === 0) { // Special case for 1s
    return 1000 * (count === 3 ? 1 : 2 ** (count - 3));
  } else {
    return (index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3));
  }
};

export const calculateSingleScores = (counts, scoringDice) => {
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

  // counts how many times each number appeared on the rolled dice
  const countNumberAmounts = (diceValues) => {
    let counts = Array(6).fill(0);
    diceValues.forEach((value) => counts[value - 1]++);
    return counts;
  };

  let score = 0;
  let tripletScore = 0;
  let scoreMessage = "";
  let scoringDice = [];

  let counts = countNumberAmounts(diceValues);
  
  counts.forEach((count, index) => {
    if (count >= 3) {
      tripletScore = calculateTripletScore(count, index);
      score += tripletScore;
      scoreMessage += `${count} "${index + 1}"s = ${tripletScore} points. `;
      scoringDice.push(...getScoringDiceIndices(diceValues.filter((_, i) => diceValues[i] === index + 1)));
    }
  });

  const singleScores = calculateSingleScores(counts, scoringDice);
  score += singleScores.score;
  scoreMessage += singleScores.scoreMessage;

  return { score, scoreMessage, scoringDice };
};

// New helper functions
export const getDiceValues = (diceState) => diceState.map(die => die.value);

export const getDice = (diceState) => diceState.map(die => ({ index: die.index, value: die.value, active: die.active }));
