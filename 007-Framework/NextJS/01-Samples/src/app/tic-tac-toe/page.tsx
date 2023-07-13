'use client'
import { useState } from 'react';

enum SquareType {
  Empty = '　',
  O = "Ｏ",
  X = "Ｘ"
}

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function NewGame({ onNewGameClick }) {
  return (
    <button
      className='new-game' onClick={onNewGameClick}>重新開始</button>
  )
}


export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squareCount, setSquareCount] = useState(0);
  const [squares, setSquares] = useState(Array(9).fill(SquareType.Empty));

  
  let status = "玩家: " + (xIsNext ? SquareType.X : SquareType.O);
  const winner = calculateWinner(squares);
  if (winner) {
    status = "勝利者: " + winner;
  }
  else if (squareCount === squares.length) {
    status = "和局";
  }

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (squares[i] === SquareType.Empty) {
      if (xIsNext) {
        nextSquares[i] = SquareType.X;
        
      } else {
        nextSquares[i] = SquareType.O;
      }
      setSquareCount(squareCount+1);
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }
    else {
      alert(`這格已經被玩家"${squares[i]}"下了`);
    }
  }

  function newGameClick() {
    setSquareCount(0);
    setSquares(Array(9).fill(SquareType.Empty));
    setXIsNext(true);
  }

  return <>
    <NewGame onNewGameClick={newGameClick} />
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
  </>;
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c] &&
        squares[a] != SquareType.Empty) {
      return squares[a];
    }
  }
  return null;
}