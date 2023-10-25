# Basic chess.js app

This app defines a simple hook for chess.js which allows a React
component to access and respond to mutations in the state of a game
of chess.

The `useChessGame` hook instantiates an extended `chess.js` object
which runs a callback on each method which mutates its state. We use
this in conjunction with `useState` internally to essentially make
the chess object "reactive".

The `useChessGame` returns a tuple consisting of the chess game
object, the current FEN state, and the current PGN state.

## Notes and testing plan

- The game state is persisted between page loads via localstorage.
- While I have not demonstrated this, one should be able to spin up
  multiple instances of the chess app using multiple unique keys for
  `useChessGame` and they will work independantly of each other.
- All valid chess logic should be implemented, including selecting
  a promotion piece when a pawn reaches the end of the board.
- If I had more time, I would create unit tests for `useChessGame`
  and I would set up playwright to handle integration tests for
  this component. Alternatively, I might opt to use Storybook
  for both integration testing and automated visual regression
  testing.
- I also would consider adding hover states to represent valid moves
  (as seen in the examples for `chessboard.js`) or adding some sort
  of user-frindly indication about why an attempted move is rejected
  ("It's not white's turn", or "You are in check", etc.)
