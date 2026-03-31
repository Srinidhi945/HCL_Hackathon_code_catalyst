import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function Navbar({ managerName }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="navbar">

      <div className="logo">
        OrderNest
      </div>

      {managerName && (
        <div className="nav-right">

          <span className="manager-name">
            {managerName}
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default Navbar;