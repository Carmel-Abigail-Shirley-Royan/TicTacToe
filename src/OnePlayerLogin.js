// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function OnePlayerLogin({ setPlayerX }) {
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   const handleStart = () => {
//     if (name) {
//       setPlayerX(name);
//       navigate("/game");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Enter Your Name</h1>
//       <input
//         type="text"
//         placeholder="Your Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         style={{ padding: "10px", fontSize: "16px" }}
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

// export default OnePlayerLogin;
