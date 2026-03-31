import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "../styles.css";

function ManageProducts() {

  const [products, setProducts] = useState([
    {
      name: "Pizza",
      brand: "FoodCo",
      category: "Food",
      price: 200,
      cost: 150,
      stock: 50
    }
  ]);

  const handleChange = (index, field, value) => {

    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);

  };

  const deleteProduct = (index) => {

    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);

  };

  return (
    <>
      <Navbar managerName="Manager" />

      <div className="table-page">

        <h2>Manage Products</h2>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product, index) => (

              <tr key={index}>

                <td>
                  <input
                    value={product.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={product.brand}
                    onChange={(e) =>
                      handleChange(index, "brand", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={product.category}
                    onChange={(e) =>
                      handleChange(index, "category", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={product.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={product.cost}
                    onChange={(e) =>
                      handleChange(index, "cost", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={product.stock}
                    onChange={(e) =>
                      handleChange(index, "stock", e.target.value)
                    }
                  />
                </td>

                <td>

                  <button className="save-btn">
                    Save
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(index)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default ManageProducts;