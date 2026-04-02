import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

import { Toaster } from "react-hot-toast";

import "./styles/global.css";

function App() {

  const [cartOpen,setCartOpen] = useState(false);

  return (

    <Router>

      <div className="app-background">

        <Toaster position="top-right"/>

        <Navbar openCart={()=>setCartOpen(true)} />

        <Routes>

          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/profile" element={<Profile />} />
          <Route
              path="/admin"
              element={
                JSON.parse(localStorage.getItem("user"))?.role === "MANAGER"
                  ? <AdminDashboard/>
                  : <navigate to="/dashboard"/>
              }
            />

        </Routes>

        <CartDrawer
          open={cartOpen}
          onClose={()=>setCartOpen(false)}
        />

      </div>

    </Router>

  );

}

export default App;