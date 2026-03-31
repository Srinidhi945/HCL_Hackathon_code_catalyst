import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../styles.css";

function ManagerSignup() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="form-page">

        <div className="form-card">

          <h2>Manager Signup</h2>

          <input placeholder="Name" />
          <input placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <button>Signup</button>

          <p>
            Already have an account?
            <span onClick={() => navigate("/login")}> Login</span>
          </p>

        </div>

      </div>
    </>
  );
}

export default ManagerSignup;