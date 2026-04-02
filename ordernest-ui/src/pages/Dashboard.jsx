import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

import "../styles/dashboard.css";

export default function Dashboard() {

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("ALL");
  const [brandFilter, setBrandFilter] = useState("ALL");

  useEffect(() => {

    if (!category) return;

    API.get(`/api/products/category/${category}`)
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(() => toast.error("Failed to load products"));

  }, [category]);

  useEffect(() => {

    let temp = [...products];

    if (search) {
      temp = temp.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (foodType !== "ALL") {
      temp = temp.filter(p => p.foodType === foodType);
    }

    if (brandFilter !== "ALL") {
      temp = temp.filter(p => p.brand?.name === brandFilter);
    }

    setFilteredProducts(temp);

  }, [search, foodType, brandFilter, products]);

  const addToCart = (productId, quantity) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast("Please login first");
      window.location.href = "/login";
      return;
    }

    API.post("/api/cart/add", {
      userId: user.id,
      product: { id: productId },
      quantity: quantity
    })
      .then(() => toast.success("Added to cart"))
      .catch(() => toast.error("Failed to add item"));

  };

  const brands = [...new Set(products.map(p => p.brand?.name))];

  return (

    <div className="dashboard-container">

      <h2 className="dashboard-title">OrderNest</h2>

      {/* CATEGORY CARDS */}

      <div className="category-grid">

        <div
          className={category === 1 ? "category-card active-category" : "category-card"}
          onClick={() => setCategory(1)}
        >
          <div className="category-icon">🍕</div>
          <span>Pizza</span>
        </div>

        <div
          className={category === 2 ? "category-card active-category" : "category-card"}
          onClick={() => setCategory(2)}
        >
          <div className="category-icon">🥖</div>
          <span>Breads</span>
        </div>

        <div
          className={category === 3 ? "category-card active-category" : "category-card"}
          onClick={() => setCategory(3)}
        >
          <div className="category-icon">🥤</div>
          <span>Cold Drinks</span>
        </div>

      </div>

      {!category && (

        <div className="dashboard-hero">

          <h3>Welcome to OrderNest</h3>

          <p>Select a category to start shopping</p>

          <div className="dashboard-icons">
            🍕 🥤 🥖
          </div>

        </div>

      )}

      {category && (

        <div>

          {/* SEARCH */}

          <input
            className="search-bar"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {/* FILTERS */}

          <div className="filters">

            <button
              className={foodType === "ALL" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFoodType("ALL")}
            >
              All
            </button>

            <button
              className={foodType === "VEG" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFoodType("VEG")}
            >
              Veg
            </button>

            <button
              className={foodType === "NON_VEG" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFoodType("NON_VEG")}
            >
              Non-Veg
            </button>

            <select
              className="brand-filter"
              onChange={e => setBrandFilter(e.target.value)}
            >
              <option value="ALL">All Brands</option>

              {brands.map(b => (
                <option key={b}>{b}</option>
              ))}

            </select>

          </div>

          {/* PRODUCT GRID */}

          <div className="product-grid">

            {filteredProducts.map(product => (

              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />

            ))}

          </div>

        </div>

      )}

    </div>

  );

}