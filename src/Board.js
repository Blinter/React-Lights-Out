import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";
import "./Board.css";
import { v4 as uuidv4 } from 'uuid';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, targetMoves }) {
  const [board, setBoard] = useState(
    createBoard(
      nrows,
      ncols,
      targetMoves
    )
  );

  const [gameWon, setGameWon] = useState(false);

  function createBoard(sizeX = 5, sizeY = 5, targetMoves = 15) {
    const tempGrid = Array.from({ length: sizeY }, () =>
      Array.from({ length: sizeX }, () => false));
    const numMoves = targetMoves === -1 ?
      Math.floor(Math.random() * (nrows * ncols)) + 1 :
      targetMoves;
    for (let i = 0; i < numMoves; i++)
      flipCellsGenerate(
        tempGrid, 
        Math.floor(Math.random() * nrows), 
        Math.floor(Math.random() * ncols));
    return tempGrid;
  }

  function flipCellsGenerate(board, row, col) {
    [[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]].forEach(([x, y]) => {
      const newRow = row + x;
      const newCol = col + y;
      if (newRow >= 0 &&
        newRow < nrows &&
        newCol >= 0 &&
        newCol < ncols) {
        board[newRow][newCol] = !board[newRow][newCol];
      }
    });
  }

  // Random grid
  // chanceLightStartsOn = 0.5 input paramater (Default)
  // const tempGrid = [];
  // for (let i = 0; i < sizeX; i++) {
  //   tempGrid[i] = [];
  //   for (let j = 0; j < sizeY; j++)
  //     tempGrid[i][j] = Math.random() < chanceLightStartsOn;
  // }
  // return tempGrid;

  const hasWon = boardCopy =>
    boardCopy.every(row => row.every(cell => cell));

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [x, y] = coord.split("-").map(Number);
      const boardCopy = oldBoard.map(oldCell => [...oldCell]);

      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {

        //Flip cell
        boardCopy[y][x] = !boardCopy[y][x];

        //Flip left
        if (x - 1 >= 0)
          boardCopy[y][x - 1] = !boardCopy[y][x - 1];

        //Flip right
        if (x + 1 < ncols)
          boardCopy[y][x + 1] = !boardCopy[y][x + 1];

        //Flip top
        if (y + 1 < nrows)
          boardCopy[y + 1][x] = !boardCopy[y + 1][x];

        //Flip bottom
        if (y - 1 >= 0)
          boardCopy[y - 1][x] = !boardCopy[y - 1][x];
      }

      if (hasWon(boardCopy) && !gameWon) {
        setGameWon(true);
      }

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  useEffect(() => {
    if (gameWon) {
      alert("You won!");
    }
  }, [gameWon]);

  // make table board
  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) =>
          <tr key={uuidv4()}>
            {row.map((cell, x) => {
              return (
                <td key={uuidv4()}>
                  <Cell
                    isLit={cell}
                    flipCells={() => flipCellsAround(`${x}-${y}`)}
                  />
                </td>
              )
            })}
          </tr>
        )}

      </tbody>
    </table>
  );
}

Board.propTypes = {
  nrows: PropTypes.number.isRequired,
  ncols: PropTypes.number.isRequired,
  targetMoves: PropTypes.number.isRequired
};

export default Board;