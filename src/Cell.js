import React from "react";
import PropTypes from "prop-types";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCells: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCells
 *
 **/
const Cell = ({ flipCells, isLit }) => (
  <button
    className={`Cell ${isLit ? "Cell-lit" : ""}`}
    onClick={flipCells}
  />
);

Cell.propTypes = {
  flipCells: PropTypes.func.isRequired,
  isLit: PropTypes.bool.isRequired,
};

export default Cell;
