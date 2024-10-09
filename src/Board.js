import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";
import "./Board.css";
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents the game board.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {number} props.nrows - Number of rows in the board.
 * @param {number} props.ncols - Number of columns in the board.
 * @param {number} props.targetMoves - Target moves for the board generation.
 *
 * @returns {JSX.Element} The rendered board component.
 */
function Board({ nrows, ncols, targetMoves }) {
  const [board, setBoard] = useState(
    createBoard(
      nrows,
      ncols,
      targetMoves
    )
  );

  const [gameWon, setGameWon] = useState(false);

  /**
   * Creates a game board with specified dimensions and populates it with target moves.
   *
   * @param {number} [sizeX=5] - Number of columns.
   * @param {number} [sizeY=5] - Number of rows.
   * @param {number} [targetMoves=15] - Number of moves to generate.
   *
   * @returns {boolean[][]} The initialized board.
   */
  function createBoard(sizeX = 5, sizeY = 5, targetMoves = 15) {
    const tempGrid = Array.from({ length: sizeY }, () =>
      Array.from({ length: sizeX }, () => false));
    const numMoves = targetMoves === -1 ?
      Math.floor(Math.random() * (sizeX * sizeY)) + 1 :
      targetMoves;
    for (let i = 0; i < numMoves; i++)
      flipCellsGenerate(
        tempGrid,
        Math.floor(Math.random() * sizeX),
        Math.floor(Math.random() * sizeY));
    return tempGrid;
  }

  /**
   * Flips cells around a given cell in the board.
   *
   * @param {boolean[][]} board - The board with cells.
   * @param {number} row - The row index of the cell.
   * @param {number} col - The column index of the cell.
   */
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

  /**
   * Checks if the board has been completely solved (all cells are true).
   *
   * @param {boolean[][]} boardCopy - The board to check.
   * @returns {boolean} True if all cells are true, otherwise false.
   */
  const hasWon = boardCopy =>
    boardCopy.every(row => row.every(cell => cell));

  /**
   * Toggles cells around a given coordinate on the board.
   *
   * @param {string} coord - The cell coordinate in "x-y" format.
   */
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

  useEffect(() => {
    if (gameWon) {
      alert("You won!");
    }
  }, [gameWon]);

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