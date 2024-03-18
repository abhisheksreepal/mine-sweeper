# mine-sweeper

Initial Requirements:

Game Board Generation:

Generate a game board grid dynamically based on user-defined dimensions (rows and columns).
The user should be able to specify the number of mines to be placed on the board.
Ensure that mines are placed randomly on the board.
Gameplay Mechanics:

Implement left-click functionality to reveal a cell. If the revealed cell contains a mine, the game ends.
If the revealed cell doesn't contain a mine, it should display the number of adjacent cells containing mines (0-8).
Implement right-click functionality to flag a cell as potentially containing a mine. Right-clicking again should remove the flag.
Include a counter for the number of remaining mines, updating as flags are placed or removed.
Game End Conditions:

If the player clicks on a cell containing a mine, reveal all mines on the board and display a game over message.
If the player reveals all cells without mines, display a victory message.
User Interface:

Design and style the game interface using CSS to make it visually appealing and intuitive.
Ensure the game is responsive and playable on both desktop and mobile devices.
Additional Features (Optional):

Timer: Implement a timer to track the duration of the game.
Difficulty Levels: Allow the user to select different difficulty levels (e.g., easy, medium, hard) which determine the size of the board and the number of mines.
High Scores: Store and display high scores based on completion time.
Accessibility: Ensure the game is accessible to users with disabilities by implementing appropriate keyboard navigation and ARIA attributes.

# Game

1. Click on Launch Game button
2. Enter Game Configuration like no of rows and column
3. Select Game difficulty level OR Custom
4. Click Start button to start a game
5. Click History to see your old Game Scores

# Technical draft

yarn is used as package manager
React UI lib
Webpack - Bundler
Babel - Transpiling tool
TypeScript - For Better compile time support , Tool autocomplete etc
Jest - Unit testing/Coverage
MobX - State Management tool
Emotion/React -> CSS IN JS library to manage scoped styles

# Dev Requirement

- Require node >=v21.6.2
- Use Yarn package manager

# Build/Compile/Run/Deploy

`yarn local` -> For Running locally (http://localhost:9000/mine-sweeper)
`yarn deploy` -> Deploying it to Github pages [To Deploy prod build, Modify predeploy to `yarn prod` and Dev build `yarn dev`]
`yarn test` -> Running Unit test cases
