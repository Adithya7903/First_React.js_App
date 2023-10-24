// src/Board.js
import React from 'react';

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <button key={index} onClick={() => onClick(index)}>
          {value}
        </button>
      ))}
    </div>
  );
};

export default Board;
