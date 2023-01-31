import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../Components/firebase";
import "./Reset.css"
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  
  return (
    <div>
      <div className="reset">
        <input
          type="text"
          className="resetInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="resetInput"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;