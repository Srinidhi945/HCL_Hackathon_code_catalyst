import { useState, useEffect } from "react";
import ProductManager from "../components/ProductManager";
import BrandManager from "../components/BrandManager";
import CategoryManager from "../components/CategoryManager";
import OrderManager from "../components/OrderManager";
import API from "../services/api";
import "../styles/admin.css";

export default function AdminDashboard(){

  const [section,setSection] = useState(null);

  const [stats,setStats] = useState({
    orders:0,
    revenue:0,
    products:0,
    categories:0
  });

  useEffect(()=>{

    Promise.all([
      API.get("/api/admin/orders"),
      API.get("/api/admin/products"),
      API.get("/api/admin/categories")
    ])
    .then(([ordersRes,productsRes,categoriesRes])=>{

      const orders = ordersRes.data;

      const revenue = orders.reduce(
        (sum,o)=>sum + (o.totalPrice || 0),0
      );

      setStats({
        orders:orders.length,
        revenue:revenue,
        products:productsRes.data.length,
        categories:categoriesRes.data.length
      });

    })
    .catch(()=>console.log("Dashboard stats load failed"));

  },[]);

  return(

    <div style={container}>

      {/* SIDEBAR */}

      <div style={sidebar}>

        <h3>Manager Panel</h3>

        <button onClick={()=>setSection("products")}>
          Products
        </button>

        <button onClick={()=>setSection("brands")}>
          Brands
        </button>

        <button onClick={()=>setSection("categories")}>
          Categories
        </button>

        <button onClick={()=>setSection("orders")}>
          Orders
        </button>

      </div>

      {/* CONTENT */}

      <div style={content}>

        {section === null && (

          <div>

            <h2>Dashboard Overview</h2>

            <div style={cards}>

              <div style={card}>
                <div style={icon}>📦</div>
                <h2>{stats.orders}</h2>
                <p>Total Orders</p>
              </div>

              <div style={card}>
                <div style={icon}>💰</div>
                <h2>₹{stats.revenue}</h2>
                <p>Total Revenue</p>
              </div>

              <div style={card}>
                <div style={icon}>🍕</div>
                <h2>{stats.products}</h2>
                <p>Products</p>
              </div>

              <div style={card}>
                <div style={icon}>📂</div>
                <h2>{stats.categories}</h2>
                <p>Categories</p>
              </div>

            </div>

          </div>

        )}

        {section === "products" && <ProductManager />}
        {section === "brands" && <BrandManager />}
        {section === "categories" && <CategoryManager />}
        {section === "orders" && <OrderManager />}

      </div>

    </div>

  )
}

/* LAYOUT */

const container={
  display:"flex",
  height:"100vh"
}

const sidebar={
  width:"220px",
  borderRight:"1px solid #ddd",
  padding:"20px",
  display:"flex",
  flexDirection:"column",
  gap:"12px"
}

const content={
  flex:1,
  padding:"30px"
}

/* DASHBOARD CARDS */

const cards={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
  gap:"20px",
  marginTop:"30px"
}

const card={
  background:"white",
  padding:"25px",
  borderRadius:"12px",
  boxShadow:"0 10px 20px rgba(0,0,0,0.08)",
  textAlign:"center"
}

const icon={
  fontSize:"28px",
  marginBottom:"10px"
}