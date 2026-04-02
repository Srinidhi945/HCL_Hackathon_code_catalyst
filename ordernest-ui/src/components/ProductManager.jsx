import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductManager(){

  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [brands,setBrands] = useState([]);

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [stock,setStock] = useState("");
  const [foodType,setFoodType] = useState("VEG");
  const [categoryId,setCategoryId] = useState("");
  const [brandId,setBrandId] = useState("");
  const [rating,setRating] = useState("");

  const loadData = ()=>{

    API.get("/api/admin/products").then(res=>setProducts(res.data))
    API.get("/api/admin/categories").then(res=>setCategories(res.data))
    API.get("/api/admin/brands").then(res=>setBrands(res.data))

  }

  useEffect(()=>{
    loadData()
  },[])

  const addProduct = ()=>{

    if(!name || !price || !stock || !categoryId || !brandId) return;

    API.post("/api/admin/products",{
      name,
      price,
      stock,
      foodType,
      rating,
      category:{id:categoryId},
      brand:{id:brandId}
    })
    .then(()=>{
      clearForm()
      loadData()
    })

  }

  const deleteProduct = (id)=>{

    API.delete(`/api/admin/products/${id}`)
      .then(()=>loadData())

  }

  const clearForm = ()=>{

    setName("")
    setPrice("")
    setStock("")
    setRating("")
    setCategoryId("")
    setBrandId("")

  }

  return(

    <div>

      <h2>Manage Products</h2>

      <div style={form}>

        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input placeholder="Stock" value={stock} onChange={e=>setStock(e.target.value)} />

        <select value={foodType} onChange={e=>setFoodType(e.target.value)}>
          <option value="VEG">Veg</option>
          <option value="NON_VEG">Non Veg</option>
        </select>

        <select value={categoryId} onChange={e=>setCategoryId(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map(c=>(
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select value={brandId} onChange={e=>setBrandId(e.target.value)}>
          <option value="">Select Brand</option>
          {brands.map(b=>(
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <input placeholder="Rating" value={rating} onChange={e=>setRating(e.target.value)} />

        <button onClick={addProduct}>
          Add Product
        </button>

      </div>

      {products.map(p=>(

        <div key={p.id} style={card}>

          <div>

            <b>{p.name}</b>
            <p>₹{p.price}</p>
            <p>{p.brand?.name}</p>

          </div>

          <button style={deleteBtn}
            onClick={()=>deleteProduct(p.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  )

}

const form={
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
  gap:"12px",
  marginBottom:"20px"
}

const card={
  background:"white",
  padding:"14px",
  borderRadius:"10px",
  marginBottom:"10px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.08)",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
}

const deleteBtn={
  background:"#ef4444",
  border:"none",
  color:"white",
  padding:"6px 12px",
  borderRadius:"6px",
  cursor:"pointer"
}