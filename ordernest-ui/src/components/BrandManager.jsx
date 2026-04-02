import { useEffect, useState } from "react";
import API from "../services/api";

export default function BrandManager(){

  const [brands,setBrands] = useState([]);
  const [name,setName] = useState("");

  const loadBrands = ()=>{
    API.get("/api/admin/brands")
      .then(res=>setBrands(res.data))
      .catch(()=>console.log("Brand load error"))
  }

  useEffect(()=>{
    loadBrands()
  },[])

  const addBrand = ()=>{

    if(!name.trim()) return;

    API.post("/api/admin/brands",{name})
      .then(()=>{
        setName("")
        loadBrands()
      })
  }

  const deleteBrand = (id)=>{
    API.delete(`/api/admin/brands/${id}`)
      .then(()=>loadBrands())
  }

  return(

    <div>

      <h2>Manage Brands</h2>

      <div style={form}>

        <input
          placeholder="Brand Name"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <button onClick={addBrand}>
          Add Brand
        </button>

      </div>

      {brands.map(b=>(

        <div key={b.id} style={card}>

          <span>{b.name}</span>

          <button style={deleteBtn}
            onClick={()=>deleteBrand(b.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  )

}

const form={
  display:"flex",
  gap:"10px",
  marginBottom:"20px"
}

const card={
  background:"white",
  padding:"12px",
  marginBottom:"10px",
  borderRadius:"8px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.08)",
  display:"flex",
  justifyContent:"space-between"
}

const deleteBtn={
  background:"#ef4444",
  border:"none",
  color:"white",
  padding:"6px 12px",
  borderRadius:"6px",
  cursor:"pointer"
}