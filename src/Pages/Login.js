import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, logout } from "../Components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const login = async () => {
      const loggedIn = await logInWithEmailAndPassword(email.toLowerCase(), password)
      if (loggedIn)
      window.location.reload(true)
    }
    return (
      <div >
        {user !== null &&
          <div>
            <div>
              Hello {user.displayName}
              <button onClick={() => logout()}>Sign Out</button>
            </div>
          </div>
          
        }
        {user === null && <div>
          <div>
            Hello
          </div>
          </div>}
        <div className="login">
          <input
            className="loginInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="loginInput"
            onClick={() => login()}
          >
            Login
          </button>
          <div>
            <Link to="/reset">Forgot Password?</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    );
  }
  export default Login;