// import React, { useState, useEffect } from "react";
// import io from 'socket.io-client';

// let playerWins=0;
// let computerWins=0;
// function Mains() {
//   const initialBoard = [
//     ["1", "2", "3"],
//     ["4", "5", "6"],
//     ["7", "8", "9"],
//   ];

//   const [board, setBoard] = useState(initialBoard);
//   const [gameOver, setGameOver] = useState(false);
//   const [message, setMessage] = useState("");
//   const socket = io("http://localhost:5000");

//   useEffect(() => {
//     // Listen for move events from the server
//     socket.on('move', (moveData) => {
//       const newBoard = [...board];
//       newBoard[moveData.row][moveData.col] = moveData.player;
//       setBoard(newBoard);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   });
//   const displayBoard = () => {
//     return board.map((row, rowIndex) => (
//       <div key={rowIndex} style={{ display: "flex", justifyContent: "center" }}>
//         {row.map((cell, colIndex) => (
//           <div
//             key={colIndex}
//             style={{
//               width: "100px",
//               height: "100px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               border: "1px solid black",
//               fontSize: "30px",
//               backgroundColor: "white",
//               cursor: "pointer",
//               borderRadius: "10px",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//               margin: "3px",
//               color: cell === "X" ? "red" : cell === "O" ? "green" : "black",
//               fontWeight: "bold",
//               transition: "0.3s"
//             }}
//             onClick={() => !gameOver && enterMove(rowIndex, colIndex)}
//             onMouseOver={(e) => !gameOver && (e.target.style.backgroundColor = "#e8f4fa")}
//             onMouseOut={(e) => !gameOver && (e.target.style.backgroundColor = "#f9f9f9")}
//           >
//             {cell === "X" || cell === "O" ? cell : ""}
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   const enterMove = (row, col) => {
//     if (board[row][col] === "X" || board[row][col] === "O" || gameOver) {
//       return;
//     }

//     const newBoard = [...board];
//     newBoard[row][col] = "O";
//     setBoard(newBoard);

//     // Emit the move to the backend
//     socket.emit('move', { row, col, player: 'O' });

//     if (victoryFor(newBoard, "O")) {
//       setGameOver(true);
//       setMessage("You Won!");
//       playerWins+=1;
//       return;
//     }

//     if (makeListOfFreeFields(newBoard).length === 0) {
//       setGameOver(true);
//       setMessage("It's a draw!");
//       return;
//     }

//     setTimeout(() => {
//       drawMove(newBoard);
//     }, 1000);
//   };


//   const makeListOfFreeFields = (board) => {
//     let freecells = [];
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         if (board[i][j] !== "X" && board[i][j] !== "O") {
//           freecells.push([i, j]);
//         }
//       }
//     }
//     return freecells;
//   };

//   const victoryFor = (board, sign) => {
//     for (let i = 0; i < 3; i++) {
//       let rowCheck = true;
//       let colCheck = true;
//       for (let j = 0; j < 3; j++) {
//         if (board[i][j] !== sign) rowCheck = false;
//         if (board[j][i] !== sign) colCheck = false;
//       }
//       if (rowCheck || colCheck) return true;
//     }
//     let left = true;
//     let right = true;
//     for (let i = 0; i < 3; i++) {
//       if (board[i][i] !== sign) left = false;
//       if (board[2 - i][i] !== sign) right = false;
//     }
//     return left || right;
//   };

//   // const drawMove = (currBoard) => {
//   //   const freecells = makeListOfFreeFields(currBoard);
//   //   if (freecells.length > 0) {
//   //     const randomMove = freecells[Math.floor(Math.random() * freecells.length)];
//   //     const newBoard = [...currBoard];
//   //     newBoard[randomMove[0]] = [...currBoard[randomMove[0]]];
//   //     newBoard[randomMove[0]][randomMove[1]] = "X";
//   //     setBoard(newBoard);

//   //     if (victoryFor(newBoard, "X")) {
//   //       setGameOver(true);
//   //       setMessage("Computer Won!");
//   //     }
//   //   }
//   // };
//   const drawMove = (currBoard) => {
//     // First, try to win
//     let move = findWinningMove(currBoard, "X");
//     if (move) {
//       currBoard[move[0]][move[1]] = "X";
//       setBoard([...currBoard]);
//       if (victoryFor(currBoard, "X")) {
//         setGameOver(true);
//         setMessage("Computer Won!");
//         computerWins+=1;
//         return;
//       }
//       return;
//     }

//     // Second, block player's winning move
//     move = findWinningMove(currBoard, "O");
//     if (move) {
//       currBoard[move[0]][move[1]] = "X";
//       setBoard([...currBoard]);
//       return;
//     }

//     // If no win/block, pick a random move (or you can improve this part)
//     const freecells = makeListOfFreeFields(currBoard);
//     if (freecells.length > 0) {
//       const randomMove = freecells[Math.floor(Math.random() * freecells.length)];
//       currBoard[randomMove[0]][randomMove[1]] = "X";
//       setBoard([...currBoard]);
//     }
//   };

//   // Helper function to find a winning move or a blocking move
//   const findWinningMove = (board, sign) => {
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         if (board[i][j] !== "X" && board[i][j] !== "O") {
//           board[i][j] = sign;
//           if (victoryFor(board, sign)) {
//             board[i][j] = sign === "X" ? "X" : "O"; // Revert after check
//             return [i, j];
//           }
//           board[i][j] = ""; // Revert
//         }
//       }
//     }
//     return null;
//   };

//   const resetGame = () => {
//     setBoard(initialBoard);
//     setGameOver(false);
//     setMessage("");
//   }
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>Tic-Tac-Toe</h1>
//       <div style={{
//         borderRadius: "10px",
//         backgroundColor: "violet",
//         padding: "10px",
//         boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
//         border: "1px solid black",
//         display: "inline-block"
//       }}>{displayBoard()}</div>
//       <div>
//         {gameOver && <h2 style={{ color: "#333", fontSize: "24px" }}>{message}</h2>}

//         <button
//           onClick={resetGame}
//           style={{
//             padding: "10px 20px",
//             marginTop: "20px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             borderRadius: "10px",
//             fontSize: "16px", border: "none",
//             cursor: "pointer", transition: "0.3s",

//           }}
//         >Reset Game</button>
//       </div>
//       <div style={{
//   textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "20px",
//       color: "#333"
// }}>
//       <p style={{margin: "20px",
//   fontFamily: "Roboto, sans-serif"}}>Player Wins: {playerWins}</p>
//       <p style={{margin: "5px",
//   fontFamily: "Roboto, sans-serif"}}>Computer Wins: {computerWins}</p>
//     </div>

//     </div >
//   );
// }

// export default Mains;
