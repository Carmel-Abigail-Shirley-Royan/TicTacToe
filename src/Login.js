// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login({ setPlayerX, setPlayerO }) {
//   const [nameX, setNameX] = useState("");
//   const [nameO, setNameO] = useState("");
//   const navigate = useNavigate();

//   const handleStart = () => {
//     if (nameX && nameO) {
//       setPlayerX(nameX);
//       setPlayerO(nameO);
//       navigate("/game");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Enter Player Names</h1>
//       <input
//         type="text"
//         placeholder="Player X Name"
//         value={nameX}
//         onChange={(e) => setNameX(e.target.value)}
//         style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
//       />
//       <br />
//       <input
//         type="text"
//         placeholder="Player O Name"
//         value={nameO}
//         onChange={(e) => setNameO(e.target.value)}
//         style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
//       />
//       <br />
//       <button
//         onClick={handleStart}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           fontSize: "18px",
//           cursor: "pointer",
//         }}
//       >
//         Start Game
//       </button>
//     </div>
//   );
// }

// export default Login;
