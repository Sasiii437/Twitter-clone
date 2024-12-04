// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserAuth } from "../../context/UserAuthContext";
// import "./ForgotPassword.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const { sendPasswordReset } = useUserAuth(); // Assuming the sendPasswordReset function is in the context

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
    
//     if (!email && !phone) {
//       setError("Please enter an email or phone number.");
//       return;
//     }

//     try {
//       await sendPasswordReset(email || phone);
//       setSuccess("Password reset email has been sent!");
//       setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
//     } catch (err) {
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="forgot-password-container">
//       <h2>Forgot Password</h2>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           className="input-field"
//           placeholder="Enter your email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           className="input-field"
//           placeholder="Or enter your phone number"
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <button type="submit" className="reset-btn">Reset Password</button>
//       </form>
//       <button onClick={() => navigate("/login")} className="back-btn">
//         Back to Login
//       </button>
//     </div>
//   );
// };

// export default ForgotPassword;

// twiller/src/Pages/ForgotPassword.jsx
// import React, { useState } from 'react';
// import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
// import { canRequestPasswordReset, logPasswordResetRequest } from '../../context/firebaseHelpers';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleResetPassword = async () => {
//         const auth = getAuth();
//         const canRequest = await canRequestPasswordReset(email);
//         if (canRequest) {
//             try {
//                 await sendPasswordResetEmail(auth, email);
//                 setMessage('Password reset email sent!');
//                 await logPasswordResetRequest(email);
//             } catch (error) {
//                 setMessage('Error sending password reset email.');
//             }
//         } else {
//             setMessage('You can only request a password reset once a day.');
//         }
//     };

//     return (
//         <div>
//             <h2>Forgot Password</h2>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//             />
//             <button onClick={handleResetPassword}>Reset Password</button>
//             <p>{message}</p>
//         </div>
//     );
// };

// export default ForgotPassword;

// import React, { useState } from "react";
// import { auth } from "../../context/firbase";

// //import { auth } from "../../context/firebase"; // Firebase configuration
// import { sendPasswordResetEmail } from "firebase/auth";
// import { canRequestPasswordReset, logPasswordResetRequest } from "../../context/firebaseHelpers";
// import { generateRandomPassword } from "../../context/utils";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");

//     const handlePasswordReset = async () => {
//         try {
//             // Check MongoDB to enforce the 24-hour restriction
//             const canReset = await canRequestPasswordReset(email);
//             if (!canReset) {
//                 setMessage("You can only request a password reset once a day.");
//                 return;
//             }

//             // Send password reset email using Firebase
//             await sendPasswordResetEmail(auth, email);
//             setMessage("Password reset email sent successfully.");

//             // Log the password reset request in MongoDB
//             await logPasswordResetRequest(email);
//         } catch (err) {
//             setError("An error occurred while processing your request.");
//             console.error(err);
//         }
//     };

//     return (
//         <div className="forgot-password-container">
//             <h2>Forgot Password</h2>
//             {message && <p className="message">{message}</p>}
//             {error && <p className="error">{error}</p>}
//             <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <button onClick={handlePasswordReset}>Reset Password</button>
//         </div>
//     );
// };

// export default ForgotPassword;

// import React, { useState } from "react";
// import axios from "axios";
// import "./ForgotPassword.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleForgotPassword = async () => {
//     try {
//       setMessage("");
//       setError("");
//       const response = await axios.post("http://localhost:5000/forgot-password", { email });
//       setMessage(response.data.message);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="forgot-password-container">
//       <h2>Forgot Password</h2>
//       {message && <p className="message">{message}</p>}
//       {error && <p className="error">{error}</p>}
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleForgotPassword}>Reset Password</button>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    try {
      setMessage("");
      setError("");
      const response = await axios.post("http://localhost:5000/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPassword;
