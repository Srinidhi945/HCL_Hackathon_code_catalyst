import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../styles.css";

function LandingPage() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="landing">

        <div className="landing-card">

          <h1 className="floating">OrderNest</h1>
          <p>Retail Management Portal</p>

          <button onClick={() => navigate("/signup")}>
            Manager Signup
          </button>

          <button onClick={() => navigate("/login")}>
            Manager Login
          </button>

        </div>

      </div>
    </>
  );
}

export default LandingPage;