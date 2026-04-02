import { useEffect, useState } from "react";
import API from "../services/api";

export default function CategoryManager(){

  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");

  const loadCategories = ()=>{
    API.get("/api/admin/categories")
      .then(res=>setCategories(res.data))
  }

  useEffect(()=>{
    loadCategories()
  },[])

  const addCategory = ()=>{

    if(!name.trim()) return;

    API.post("/api/admin/categories",{name})
      .then(()=>{
        setName("")
        loadCategories()
      })

  }

  const deleteCategory = (id)=>{

    API.delete(`/api/admin/categories/${id}`)
      .then(()=>loadCategories())

  }

  return(

    <div>

      <h2>Manage Categories</h2>

      <div style={form}>

        <input
          placeholder="Category Name"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <button onClick={addCategory}>
          Add Category
        </button>

      </div>

      {categories.map(c=>(

        <div key={c.id} style={card}>

          <span>{c.name}</span>

          <button style={deleteBtn}
            onClick={()=>deleteCategory(c.id)}
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