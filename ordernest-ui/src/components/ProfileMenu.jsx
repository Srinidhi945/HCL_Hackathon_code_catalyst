import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function ProfileMenu({ user, onLogout }) {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const menuRef = useRef();

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (

    <div className="profile-container" ref={menuRef}>

      <div
        className="profile-avatar"
        onClick={() => setOpen(!open)}
      >
        {user.email?.charAt(0).toUpperCase()}
      </div>

      {open && (

        <div className="profile-dropdown">

          <div className="profile-name">
            {user.name || "User"}
          </div>

          <div className="profile-email">
            {user.email}
          </div>

          {user.mobile && (
            <div className="profile-mobile">
              📱 {user.mobile}
            </div>
          )}

          {user.address && (
            <div className="profile-address">
              📍 {user.address}
            </div>
          )}

          <hr />

          <button
            className="edit-profile-btn"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>

          <button
            className="logout-btn"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

      )}

    </div>

  );

}