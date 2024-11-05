import { useState, useEffect } from "react";
import "./styles.css";

const winningCombinations = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ], // Top row
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ], // Middle row
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ], // Bottom row
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ], // Left column
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ], // Center column
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ], // Right column
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ], // Main diagonal
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ], // Anti-diagonal
];

export default function App() {
  const [game, setGame] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [user, setUser] = useState("X");
  const [result, setResult] = useState({
    x: [],
    o: [],
  });

  const [isComplete, setIsComplete] = useState(false);
  const [winner, setWinner] = useState(null);

  function checkWin(playerMoves) {
    return winningCombinations.some((combination) =>
      combination.every(([row, col]) =>
        playerMoves.some(([r, c]) => r === row && c === col)
      )
    );
  }

  useEffect(() => {
    console.log(result.x.length, result.o.length);

    if (result.x.length < 2 || result.o.length < 2) return;

    let winnerX = checkWin(result.x);
    let winnerO = checkWin(result.o);
    if (winnerX) {
      setIsComplete(true);
      setWinner("X Won!");
    } else if (winnerO) {
      setIsComplete(true);
      setWinner("O Won!");
    }
    // console.log(result, winnerX, winnerO);
    if (result.x.length + result.o.length === 9 && !winnerX && !winnerO) {
      setIsComplete(true);
      setWinner("It's Tie!");
    }
  }, [result]);

  const handleClick = (rowIndex, colIndex) => {
    if (isComplete) return;

    let isRepeatX = result.x.some(([r, c]) => r === rowIndex && c === colIndex);
    let isRepeatO = result.o.some(([r, c]) => r === rowIndex && c === colIndex);
    if (isRepeatO || isRepeatX) return;

    setResult(
      user === "X"
        ? { ...result, x: [...result.x, [rowIndex, colIndex]] }
        : { ...result, o: [...result.o, [rowIndex, colIndex]] }
    );
    const newGame = game.map((item, idx) =>
      idx === rowIndex
        ? item.map((x, id) => (id === colIndex ? user : x))
        : item
    );
    setGame(newGame);
    setUser(user === "X" ? "O" : "X");
  };

  const handleNewGame = () => {
    setIsComplete(false);
    setGame([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setResult({
      x: [],
      o: [],
    });
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Tic-Tac-Toe </h1>
      <h2>Start Playing OX to see some magic happen!</h2>
      <h2>
        {isComplete ? `Game over, ${winner}` : `${user}, it's Your turn!`}
      </h2>
      <div className="box-container">
        {game &&
          Object.values(game).map((item, rowIndex) =>
            item.map((value, colIndex) => (
              <button
                key={colIndex.toString() + rowIndex.toString()}
                onClick={() => handleClick(rowIndex, colIndex)}
                className="box"
              >
                {value}
              </button>
            ))
          )}
      </div>
      {isComplete ? (
        <button onClick={handleNewGame} className="new-game-btn">
          New Game
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
