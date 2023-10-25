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

The game state is persisted between page loads via localstorage.
