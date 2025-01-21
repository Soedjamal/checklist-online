// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { useState } from "react";
// import { auth, db } from "./firebase";
// import { addDoc, collection } from "firebase/firestore";

// const App = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [item, setItem] = useState("");

//   const handleSignUp = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("User Registered");
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("User Logged in");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleAddItem = async () => {
//     if (item) {
//       await addDoc(collection(db, "items"), { name: item });
//       setItem("");
//     }
//   };

//   return (
//     <>
//       <div>
//         <h1>Firebase Auth</h1>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleSignUp}>Sign Up</button>
//         <button onClick={handleLogin}>Login</button>

//         <h2>Add Item</h2>
//         <input
//           type="text"
//           name="item"
//           placeholder="Add items"
//           value={item}
//           onChange={(e) => setItem(e.target.value)}
//         />
//         <button onClick={handleAddItem}>Add</button>
//       </div>
//     </>
//   );
// };

// export default App;

import "./App.css";
import Checklist from "./Checklist.jsx";

const App = () => {
  return (
    <>
      <Checklist />
    </>
  );
};

export default App;
