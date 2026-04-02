import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import ProfileMenu from "./ProfileMenu";
import "../styles/navbar.css";

export default function Navbar(){

  const navigate = useNavigate();
  const [cartOpen,setCartOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isManager = user?.role === "MANAGER";

  return(

    <div className="navbar">

      {/* LOGO */}

      <h2
        className="logo"
        onClick={()=>navigate("/")}
      >
        {isManager ? "OrderNest Manager" : "OrderNest"}
      </h2>

      {/* USER NAVBAR */}

      {!isManager && user && (

        <div className="nav-center">

          <Link to="/dashboard">Shop</Link>

          <Link to="/orders">Orders</Link>

          <button
            className="cart-btn"
            onClick={()=>setCartOpen(true)}
          >
            Cart
          </button>

        </div>

      )}

      {/* RIGHT SIDE */}

      {user && (

        <div className="nav-right">

          <span className="nav-greeting">
            Hi, {user.name}
          </span>

          <ProfileMenu
            user={user}
            onLogout={logout}
          />

        </div>

      )}

      {/* CART DRAWER */}

      {!isManager && (

        <CartDrawer
          open={cartOpen}
          onClose={()=>setCartOpen(false)}
        />

      )}

    </div>

  );

}