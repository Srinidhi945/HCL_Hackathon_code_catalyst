import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/Landing_Page";
import ManagerLogin from "./Pages/Manager_login";
import ManagerSignup from "./Pages/Manager_signup";
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import AddProduct from "./Pages/Add_Product";
import ManageProducts from "./Pages/Manage_Products";
import ViewOrders from "./Pages/View_Orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<ManagerLogin />} />
        <Route path="/signup" element={<ManagerSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<ManageProducts />} />
        <Route path="/orders" element={<ViewOrders />} />
      </Routes>
    </Router>
  );
}

export default App;