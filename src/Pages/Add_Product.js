import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "../styles.css";

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    cost: "",
    stock: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log("Product Added:", product);
  };

  return (
    <>
      <Navbar managerName="Manager" />

      <div className="form-page">

        <div className="form-card">

          <h2>Add Product</h2>

          <input name="name" placeholder="Product Name" onChange={handleChange} />

          <input name="brand" placeholder="Brand" onChange={handleChange} />

          <input name="category" placeholder="Category" onChange={handleChange} />

          <input name="price" placeholder="Price" onChange={handleChange} />

          <input name="cost" placeholder="Cost" onChange={handleChange} />

          <input name="stock" placeholder="Stock Quantity" onChange={handleChange} />

          <button onClick={handleSubmit}>Add Product</button>

        </div>

      </div>
    </>
  );
}

export default AddProduct;