import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../styles.css";

function ManagerLogin() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />

      <div className="form-page">

        <div className="form-card">

          <h2>Manager Login</h2>

          <input placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button onClick={handleLogin}>Login</button>

          <p>
            New manager?
            <span onClick={() => navigate("/signup")}> Signup</span>
          </p>

        </div>

      </div>
    </>
  );
}

export default ManagerLogin;