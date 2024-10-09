import React from "react";
import PropTypes from "prop-types";
import "./Cell.css";

/**
 * A Cell component that changes appearance based on a boolean state `isLit`
 * and triggers a provided function `flipCells` when clicked.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.flipCells - Function to call when the cell is clicked.
 * @param {boolean} props.isLit - Determines the CSS class applied to the cell.
 * @returns {JSX.Element} A button element representing the cell.
 */
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
