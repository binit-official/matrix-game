import { useState } from "react";

export default function MatrixGame() {
  const [grid, setGrid] = useState(Array(3).fill().map(() => Array(3).fill("white")));
  const [clickSequence, setClickSequence] = useState([]);
  const [finalClick, setFinalClick] = useState(false);

  const handleClick = (row, col) => {
    if (finalClick || grid[row][col] === "green" || grid[row][col] === "orange") return;
    
    const newGrid = grid.map((r, i) => r.map((c, j) => (i === row && j === col ? "green" : c)));
    setGrid(newGrid);
    setClickSequence([...clickSequence, { row, col }]);
    
    if (clickSequence.length === 7) {
      setFinalClick(true);
    }
  };

  const changeToOrange = () => {
    if (!finalClick) return;
    clickSequence.forEach(({ row, col }, index) => {
      setTimeout(() => {
        setGrid(prevGrid => prevGrid.map((r, i) => r.map((c, j) => (i === row && j === col ? "orange" : c))));
      }, index * 500);
    });
  };

  return (
    <div className="container">
      <h1>Matrix Game</h1>
      <div className="grid-container">
        {grid.map((row, i) =>
          row.map((color, j) => (
            <div
              key={`${i}-${j}`}
              className="grid-cell"
              style={{ backgroundColor: color }}
              onClick={() => (finalClick ? changeToOrange() : handleClick(i, j))}
            />
          ))
        )}
      </div>
    </div>
  );
}
