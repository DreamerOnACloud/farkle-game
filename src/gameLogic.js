
export const calculateTripletScore = (count, index, diceState) => {
  // Create a new diceState to avoid side effects - adheres to the principles of functional programming and immutability
  const newDiceState = diceState.map(die => {
    if (die.value === index + 1) {
      return { ...die, active: false };
    }
    return die;
  });

  const tripletScore = index === 0 ? 
    1000 * (count === 3 ? 1 : 2 ** (count - 3)) : 
    (index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3));

  return { tripletScore, newDiceState };
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
  diceValues.forEach((die, index) => {
    if (die.value === 1 || die.value === 5 || diceValues.filter(v => v.value === die.value).length >= 3) {
      indices.push(die.index);
    }
  });
  return indices;
};

export const getNonScoringDiceIndices = (diceValues) => {
  const scoringIndices = getScoringDiceIndices(diceValues);
  return diceValues.map((_, index) => index).filter(index => !scoringIndices.includes(index));
};

export const calculateScore = (diceState) => {
  const countNumberAmounts = (diceValues) => {
    let counts = Array(6).fill(0);
    diceValues.forEach((value) => counts[value - 1]++);
    return counts;
  };

  let score = 0;
  let scoreMessage = "";
  let scoringDice = [];
  let nonScoringDiceIndices = [];

  const diceValues = diceState.map(die => die.value);
  let counts = countNumberAmounts(diceValues);

  let newDiceState = [...diceState];
  counts.forEach((count, index) => {
    if (count >= 3) {
      const { tripletScore, updatedDiceState } = calculateTripletScore(count, index, newDiceState);
      score += tripletScore;
      scoreMessage += `${count} "${index + 1}"s = ${tripletScore} points. `;
      newDiceState = updatedDiceState;
      scoringDice.push(...getScoringDiceIndices(diceValues.filter((_, i) => diceValues[i] === index + 1)));
    }
  });

  const singleScores = calculateSingleScores(counts, scoringDice);
  score += singleScores.score;
  scoreMessage += singleScores.scoreMessage;

  nonScoringDiceIndices = getNonScoringDiceIndices(diceValues);

  return { score, scoreMessage, scoringDice, nonScoringDiceIndices, newDiceState };
};


// New helper functions
export const getDiceValues = (diceState) => diceState.map(die => die.value);

export const getDice = (diceState) => diceState.map(die => ({ index: die.index, value: die.value, active: die.active }));
