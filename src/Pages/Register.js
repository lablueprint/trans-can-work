import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { registerWithEmailAndPassword, logout } from "../Components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Register.css";

const auth = getAuth();

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountType, setAccountType] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [displayName, setDisplayName] = useState("");
    useEffect(()=>{
      if (user)
        setDisplayName(user.displayName)
    },[user])
    
    
    
    return (
      <div> 
        
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
        <div className="registerForm">
          <input
            className="registerFormItem"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            className="registerFormItem"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <select name="accountType"
            className="registerFormItem"
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option disabled selected value> -- Select Account Type -- </option>
            <option value="administrator">Administrator</option>
            <option value="navigator">Navigator</option>
            <option value="jobseeker">Jobseeker</option>
          </select>
          <input
            className="registerFormItem"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            className="registerFormItem"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            className="registerFormItem"
            type="submit"
            onClick={() => registerWithEmailAndPassword(firstName, lastName, accountType, email, password)}
          />
          {/* <button
            onClick={() => registerWithEmailAndPassword(firstName, lastName, accountType, email, password)}
            >Register</button> */}
        </div>
        <div>
            Have an account? Sign in here!
            <Link to="/login">Login</Link>
          </div>
      </div>
    );
  }
  export default Register;