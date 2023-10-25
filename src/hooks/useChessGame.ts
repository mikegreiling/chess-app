import { Chess } from 'chess.js';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const storedGames = new Map();

/**
 * A hook that returns a tuple with a chess.js game object whose
 * mutation methods will automatically update our state, and the
 * current fen and pgn values for the game.
 *
 * @param key A unique key for the game.
 */
export default function useChessGame(
  key: string
): [WatchableChess, string, string] {
  // maintain our game state in local storage
  const [pgn, setPgn] = useLocalStorage(key + '-pgn', '');

  let game: WatchableChess;

  if (storedGames.has(key)) {
    game = storedGames.get(key);
  } else {
    game = new WatchableChess();
    if (pgn) game.loadPgn(pgn);
    storedGames.set(key, game);
  }

  const [fen, setFen] = useState(game.fen());

  game.setMutateHook((game) => {
    setPgn(game.pgn());
    setFen(game.fen());
  });

  return [game, fen, pgn];
}

/**
 * A wrapper around the chess.js library that adds a mutation hook
 * so that we can trigger react to update whenever the game state
 * changes.
 */
export class WatchableChess extends Chess {
  private onMutate?: (game: WatchableChess) => void;

  clear(...args: Parameters<Chess['clear']>) {
    return this.mutateHook(super.clear(...args));
  }
  load(...args: Parameters<Chess['load']>) {
    return this.mutateHook(super.load(...args));
  }
  loadPgn(...args: Parameters<Chess['loadPgn']>) {
    return this.mutateHook(super.loadPgn(...args));
  }
  move(...args: Parameters<Chess['move']>) {
    return this.mutateHook(super.move(...args));
  }
  put(...args: Parameters<Chess['put']>) {
    return this.mutateHook(super.put(...args));
  }
  remove(...args: Parameters<Chess['remove']>) {
    return this.mutateHook(super.remove(...args));
  }
  reset(...args: Parameters<Chess['reset']>) {
    return this.mutateHook(super.reset(...args));
  }
  undo(...args: Parameters<Chess['undo']>) {
    return this.mutateHook(super.undo(...args));
  }
  mutateHook<T>(value: T): T {
    this.onMutate?.(this);
    return value;
  }
  setMutateHook(onMutate: (game: WatchableChess) => void) {
    this.onMutate = onMutate;
  }
}
