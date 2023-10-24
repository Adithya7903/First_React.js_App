// src/Game.js
import React, { useEffect, useState } from 'react';
import Board from './Board';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const xIsNext = stepNumber % 2 === 0;
  const current = history[stepNumber] || { squares: Array(9).fill(null) }; // Ensure there's a valid entry

  useEffect(() => {
    const winner = calculateWinner(current.squares);
    if (winner || history.length === 10) {
      setTimeout(() => resetGame(), 2000); // Automatically restart after 2 seconds
    }
  }, [current.squares, history]);

  const handleClick = (i) => {
    const currentSquares = current.squares.slice();
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(history.concat([{ squares: currentSquares }]));
    setStepNumber(history.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
  };

  const renderMoves = () => {
    return history.map((step, move) => {
      const desc = move ? `Move #${move}: ${getMoveCoordinates(move)}` : 'Game Restart';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });
  };

  const getMoveCoordinates = (move) => {
    const col = (move - 1) % 3 + 1;
    const row = Math.floor((move - 1) / 3) + 1;
    return `(${col}, ${row})`;
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
  };

  let status;
  if (calculateWinner(current.squares)) {
    status = `Winner: ${calculateWinner(current.squares)}`;
  } else if (history.length === 10) {
    status = 'It\'s a draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <div className="terminal-box">
          <strong>Move History</strong>
          <ul className="terminal-moves">{renderMoves()}</ul>
        </div>
      </div>
    </div>
  );
};

export default Game;
