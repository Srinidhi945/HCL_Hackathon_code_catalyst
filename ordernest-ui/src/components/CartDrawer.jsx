import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function CartDrawer({ open, onClose }) {

  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const loadCart = () => {
    if (!user) return;

    API.get(`/api/cart/${user.id}`)
      .then(res => setCartItems(res.data))
      .catch(() => toast.error("Failed to load cart"));
  };

  useEffect(() => {
    if (open) loadCart();
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const removeItem = (id) => {
    API.delete(`/api/cart/${id}`)
      .then(() => {
        toast.success("Item removed from cart");
        loadCart();
      })
      .catch(() => toast.error("Failed to remove item"));
  };

  const placeOrder = () => {
    API.post(`/api/orders/place/${user.id}`)
      .then(() => {
        toast.success("Order placed successfully!");
        loadCart();
      })
      .catch(() => toast.error("Failed to place order"));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!open) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={drawerStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "15px" }}>Your Cart</h2>

        {cartItems.length === 0 && <p>Cart is empty</p>}

        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <h4>{item.product.name}</h4>
            <p>₹{item.product.price}</p>
            <p>Qty: {item.quantity}</p>

            <button
              style={removeBtnStyle}
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div>
            <h3 style={{ marginTop: "10px" }}>Total: ₹{total}</h3>

            <button
              style={checkoutBtnStyle}
              onClick={placeOrder}
            >
              Checkout
            </button>
          </div>
        )}

        <button style={closeBtnStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 9999
};

const drawerStyle = {
  width: "360px",
  height: "calc(100vh - 70px)",
  background: "white",
  padding: "20px",
  overflowY: "auto",
  boxShadow: "-5px 0 20px rgba(0,0,0,0.25)",
  borderTopLeftRadius: "12px",
  borderBottomLeftRadius: "12px",
  position: "fixed",
  right: 0,
  top: "70px",
  animation: "slideInCart 0.35s ease"
};

const removeBtnStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "5px"
};

const checkoutBtnStyle = {
  background: "linear-gradient(135deg,#7C3AED,#06B6D4)",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  width: "100%",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px"
};

const closeBtnStyle = {
  background: "#f59e0b",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  width: "100%",
  marginTop: "10px",
  cursor: "pointer"
};