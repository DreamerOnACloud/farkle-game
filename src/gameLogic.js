export const calculateTripletScore = (count, index, diceState) => {
  const newDiceState = diceState.map(die => {
    if (die.value === index + 1 && die.active) {
      return { ...die, active: false };
    }
    return die;
  });

  const tripletScore = index === 0 ? 
    1000 * (count === 3 ? 1 : 2 ** (count - 3)) : 
    (index + 1) * 100 * (count === 3 ? 1 : 2 ** (count - 3));

  return { tripletScore, newDiceState };
};

export const calculateSingleScores = (counts, diceState) => {
  let score = 0;
  let scoreMessage = "";
  const newDiceState = [...diceState];

  if (counts[0] < 3) { // Single 1s
    score += counts[0] * 100;
    if (counts[0]) scoreMessage += `${counts[0]} single "1"s = ${counts[0] * 100} points. `;
    newDiceState.forEach(die => {
      if (die.value === 1 && die.active) {
        die.active = false;
      }
    });
  }

  if (counts[4] < 3) { // Single 5s
    score += counts[4] * 50;
    if (counts[4]) scoreMessage += `${counts[4]} single "5"s = ${counts[4] * 50} points. `;
    newDiceState.forEach(die => {
      if (die.value === 5 && die.active) {
        die.active = false;
      }
    });
  }

  return { score, scoreMessage, newDiceState };
};

export const calculateScore = (diceState) => {
  const activeDice = diceState.filter(die => die.active);
  const countNumberAmounts = (diceValues) => {
    let counts = Array(6).fill(0);
    diceValues.forEach((value) => counts[value - 1]++);
    return counts;
  };

  let score = 0;
  let scoreMessage = "";
  let scoringDice = [];

  const diceValues = getDiceValues(activeDice);
  let counts = countNumberAmounts(diceValues);

  let newDiceState = [...diceState];
  counts.forEach((count, index) => {
    if (count >= 3) {
      const { tripletScore, newDiceState: updatedDiceState } = calculateTripletScore(count, index, newDiceState);
      score += tripletScore;
      scoreMessage += `${count} "${index + 1}"s = ${tripletScore} points. `;
      newDiceState = updatedDiceState;
    }
  });

  const singleScores = calculateSingleScores(counts, newDiceState);
  score += singleScores.score;
  scoreMessage += singleScores.scoreMessage;
  newDiceState = singleScores.newDiceState;

  scoringDice = newDiceState.filter(die => !die.active).map(die => die.index);

  console.log('Updated Dice State after scoring: ', newDiceState); // Log the updated dice state
  return { score, scoreMessage, scoringDice, newDiceState };
};

// New helper functions
export const getDiceValues = (diceState) => diceState.map(die => die.value);

export const getDice = (diceState) => diceState.map(die => ({ index: die.index, value: die.value, active: die.active }));