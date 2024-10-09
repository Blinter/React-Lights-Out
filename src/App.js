import React from "react";
import Board from "./Board";
import "./App.css";

/**
 * The App component serves as the main entry point for rendering the application.
 *
 * @returns {JSX.Element} A JSX element representing the application structure,
 * containing a `div` element with a `Board` component rendered inside it.
 */
function App() {
  return (
      <div className="App">
        <Board
          nrows={5}
          ncols={5}
          targetMoves={-1}
         />
      </div>
  );
}

export default App;
