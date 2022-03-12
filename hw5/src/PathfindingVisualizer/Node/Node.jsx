import React from "react";

import "./Node.css";

// BEGIN PART 3

const Node = ({col,
              isFinish,
              isStart,
              isWall,
              onMouseDown,
              onMouseEnter,
              onMouseUp,
              row}) => {

    const extraClassName = isFinish
        ? "node-finish"
        : isStart
        ? "node-start"
        : isWall
        ? "node-wall"
        : "";

  return <div
      className={`node ${extraClassName}`}
      id={`node-${row}-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp()}
      onMouseEnter={() => onMouseEnter(row, col)}
  />;
};

// END PART 3

export default Node;
