import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../styles.css";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar managerName="Manager" />

      <div className="dashboard">

        <h1>Manager Dashboard</h1>

        <div className="dashboard-cards">

          <div className="card" onClick={() => navigate("/categories")}>
            Manage Categories
          </div>

          <div className="card" onClick={() => navigate("/add-product")}>
            Add Product
          </div>

          <div className="card" onClick={() => navigate("/products")}>
            Manage Products
          </div>

          <div className="card" onClick={() => navigate("/orders")}>
            View Orders
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;