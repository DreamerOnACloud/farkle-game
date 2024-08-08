# Farkle Game

This is a React-based implementation of the popular dice game Farkle. The game involves rolling six dice to accumulate points based on various combinations.

## Features

- Roll dice and accumulate points based on specific rules.
- End turn and score points.
- Reroll only active (scoring) dice.
- Reset game state and restart the game.
- Check for game over conditions.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/farkle-game.git
    cd farkle-game
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Game Rules

- A turn involves rolling six dice.
- Points are scored based on combinations of dice rolled:
  - 1s and 5s are worth points individually.
  - Three or more of a kind are worth points.
  - A full list of scoring rules is implemented in the `gameLogic.js` file.
- Players can continue rolling the active (scoring) dice or end their turn to score the accumulated points.
- The game ends when a player reaches a specified score (default: 4000 points).

## File Structure

- `src/App.js`: Main component managing game state and rendering the UI.
- `src/components/Dice/Dice.js`: Component for displaying dice.
- `src/components/Controls/Controls.js`: Component for displaying control buttons.
- `src/gameLogic.js`: Contains all the game logic functions including score calculation and dice state updates.

## Usage

### Rolling Dice

The `rollDice` function rolls the active dice and updates their values.

### Calculating Score

The `calculateTurnScore` function calculates the score for the current turn based on the dice values and updates the dice state.

### Ending Turn

The `scoreAndEndTurn` function scores the current turn and updates the dice state for the next turn.

### Restarting Game

The `restartGame` function resets all game states and starts a new game.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.

## Acknowledgements

- React documentation for guidance on building components.
- Any other resources or libraries used in the project.

