import React from "react";
import Navbar from "../Components/Navbar";
import "../styles.css";

function ViewOrders() {

  const orders = [
    {
      id: "#101",
      customer: "John",
      product: "Pizza",
      quantity: 2,
      status: "Pending"
    },
    {
      id: "#102",
      customer: "Sarah",
      product: "Cold Drink",
      quantity: 3,
      status: "Delivered"
    }
  ];

  return (
    <>
      <Navbar managerName="Manager" />

      <div className="table-page">

        <h2>Orders</h2>

        <table>

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order, index) => (

              <tr key={index}>

                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default ViewOrders;