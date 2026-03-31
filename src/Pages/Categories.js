import React from "react";
import Navbar from "../Components/Navbar";
import "../styles.css";

function Categories() {

  return (
    <>
      <Navbar managerName="Manager" />

      <div className="form-page">

        <div className="form-card">

          <h2>Categories</h2>

          <input placeholder="Category Name" />

          <button>Add Category</button>

          <div className="category-list">

            <div className="category-item">Pizza</div>
            <div className="category-item">Cold Drinks</div>
            <div className="category-item">Breads</div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Categories;