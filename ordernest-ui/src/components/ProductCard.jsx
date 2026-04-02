import { useState } from "react";
import "../styles/cards.css";

import margherita from "../assets/products/Margherita.jfif";
import pepperoni from "../assets/products/pepperoni.jfif";
import veggie from "../assets/products/Veggie_Supreme.jfif";
import farmhouse from "../assets/products/Farmhouse.jfif";
import paneer from "../assets/products/Paneer_tikka.jfif";
import garlicBread from "../assets/products/garlic_bread.jfif";
import coke from "../assets/products/coco_cola.jfif";
import pepsi from "../assets/products/pepsi.jfif";

export default function ProductCard({ product, addToCart }) {

  const [qty,setQty] = useState(1);

  const increase = () => setQty(qty + 1);

  const decrease = () => {
    if(qty > 1) setQty(qty - 1);
  };

  const getImage = () => {

    const name = product.name.toLowerCase();

    if (name.includes("margherita")) return margherita;
    if (name.includes("pepperoni")) return pepperoni;
    if (name.includes("veggie")) return veggie;
    if (name.includes("farmhouse")) return farmhouse;
    if (name.includes("paneer")) return paneer;
    if (name.includes("garlic")) return garlicBread;
    if (name.includes("cola")) return coke;
    if (name.includes("pepsi")) return pepsi;

    return margherita;

  };

  const getDescription = () => {

    const name = product.name.toLowerCase();

    if(name.includes("margherita"))
      return "Classic mozzarella pizza with fresh tomato sauce.";

    if(name.includes("pepperoni"))
      return "Loaded with spicy pepperoni and melted cheese.";

    if(name.includes("veggie"))
      return "Fresh vegetables with rich mozzarella topping.";

    if(name.includes("farmhouse"))
      return "Delicious mix of veggies and herbs.";

    if(name.includes("paneer"))
      return "Paneer cubes with spicy tikka flavors.";

    if(name.includes("garlic"))
      return "Buttery garlic bread baked to perfection.";

    if(name.includes("cola"))
      return "Chilled Coca Cola to refresh your meal.";

    if(name.includes("pepsi"))
      return "Cold Pepsi drink with fizzy refreshment.";

    return "Delicious food item freshly prepared.";

  };

  const isVeg = product.foodType === "VEG";

  return (

    <div className="product-card">

      <div className="product-image">
        <img src={getImage()} alt={product.name}/>
      </div>

      <h3 className="product-name">
        {product.name}
      </h3>

      <p className="product-desc">
        {getDescription()}
      </p>

      <p className="product-price">
        ₹{product.price}
      </p>

      <p className="product-brand">
        {product.brand?.name}
      </p>

      <span className={`food-tag ${isVeg ? "veg" : "nonveg"}`}>
        {product.foodType}
      </span>

      {/* Quantity Selector */}

      <div className="qty-container">

        <button
          className="qty-btn"
          onClick={decrease}
        >
          -
        </button>

        <span className="qty-value">
          {qty}
        </span>

        <button
          className="qty-btn"
          onClick={increase}
        >
          +
        </button>

      </div>

      <button
        className="product-btn"
        onClick={() => addToCart(product.id,qty)}
      >
        Add to Cart
      </button>

    </div>

  );

}