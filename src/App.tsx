import "./App.css";
import { Chessboard } from "react-chessboard";
import useChessGame from "./hooks/useChessGame";
import type { Chess, Square } from "chess.js";

function getGameStatus(game: Chess) {
  if (game.isGameOver()) {
    if (game.isCheckmate()) {
      return "Checkmate!";
    } else if (game.isDraw()) {
      return "Draw!";
    } else if (game.isStalemate()) {
      return "Stalemate!";
    } else {
      return "Game Over!";
    }
  } else {
    if (game.turn() === "w") {
      return "White's Turn";
    } else {
      return "Black's Turn";
    }
  }
}

// Converts react-chessboard Piece ('wQ') to chess.js PieceSymbol ('q')
function getPieceSymbol(piece: string) {
  if (piece.length > 1) {
    return piece[1].toLowerCase();
  }
  return undefined;
}

function App() {
  const [game, fen] = useChessGame("example-game", (game) => game.reset());

  const makeMove = (
    sourceSquare: Square,
    targetSquare: Square,
    piece: string
  ) => {
    try {
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: getPieceSymbol(piece),
      });
    } catch (e) {
      return false;
    }
    return true;
  };

  const makeRandomMove = () => {
    if (!game.isGameOver()) {
      const moves = game.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      game.move(move);
    }
  };

  const resetGame = () => {
    game.reset();
  };

  return (
    <>
      <h1>Basic Chess App</h1>
      <strong>Status: {getGameStatus(game)}</strong>
      <Chessboard position={fen} onPieceDrop={makeMove} />
      <br />
      <button onClick={makeRandomMove} disabled={game.isGameOver()}>
        Random Move
      </button>{" "}
      <button onClick={resetGame}>Reset Game</button>
    </>
  );
}

export default App;
