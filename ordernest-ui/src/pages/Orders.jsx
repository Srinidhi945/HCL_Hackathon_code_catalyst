import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import "../styles/orders.css";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadOrders = () => {

    API.get(`/api/orders/user/${user.id}`)
      .then(res => {

        const sortedOrders = res.data.sort(
          (a,b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);

      })
      .catch(() => toast.error("Failed to load orders"));

  };

  useEffect(() => {
    loadOrders();
  }, []);

  const reorder = (order) => {

    const requests = order.items.map(item => {

      return API.post("/api/cart/add",{
        userId: user.id,
        product: { id: item.product.id },
        quantity: item.quantity
      });

    });

    Promise.all(requests)
      .then(() => toast.success("Items added to cart"))
      .catch(() => toast.error("Failed to reorder"));

  };

  return (

    <div className="container">

      <h2>Your Orders</h2>

      {orders.length === 0 && (
        <p>No orders placed yet.</p>
      )}

      {orders.map(order => (

        <div key={order.id} className="order-card">

          <div className="order-header">

            <span>
              Order #{order.id}
            </span>

            <span>
              {new Date(order.createdAt).toLocaleString("en-IN",{
                day:"numeric",
                month:"short",
                year:"numeric",
                hour:"2-digit",
                minute:"2-digit"
              })}
            </span>

          </div>

          <div className="order-items">

            {order.items.map(item => (

              <div key={item.id} className="order-item">

                <span className="order-product">
                  {item.product.name} <b>x{item.quantity}</b>
                </span>

                <span className="order-price">
                  ₹{item.price * item.quantity}
                </span>

              </div>

            ))}

          </div>

          <div className="order-footer">

            <span className="order-total">
              Total: ₹{order.totalPrice}
            </span>

            <button
              className="reorder-btn"
              onClick={() => reorder(order)}
            >
              Reorder
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}