import "./App.css";
import { Chessboard } from "react-chessboard";
import useChessGame from "./hooks/useChessGame";
import type { Chess } from "chess.js";

const getGameStatus = (chess: Chess) => {
  if (chess.isGameOver()) {
    if (chess.isCheckmate()) {
      return "Checkmate!";
    } else if (chess.isDraw()) {
      return "Draw!";
    } else if (chess.isStalemate()) {
      return "Stalemate!";
    } else {
      return "Game Over!";
    }
  } else {
    if (chess.turn() === "w") {
      return "White's Turn";
    } else {
      return "Black's Turn";
    }
  }
};

function App() {
  const [chess, fen] = useChessGame("example-game", (chess) => chess.reset());

  const makeRandomMove = () => {
    if (!chess.isGameOver()) {
      const moves = chess.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      chess.move(move);
    }
  };

  return (
    <>
      <h1>Basic Chess App</h1>
      <strong>Status: {getGameStatus(chess)}</strong>
      <Chessboard position={fen} />
      <br />
      <button onClick={makeRandomMove} disabled={chess.isGameOver()}>
        Random Move
      </button>
    </>
  );
}

export default App;
