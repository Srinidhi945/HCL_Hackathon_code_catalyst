import { useEffect, useState } from "react";
import API from "../services/api";

export default function OrderManager(){

  const [orders,setOrders] = useState([]);

  useEffect(()=>{

    API.get("/api/admin/orders")
      .then(res=>{

        const sortedOrders = res.data.sort(
          (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);

      })
      .catch(err=>console.log(err));

  },[]);

  return(

    <div>

      <h2>All Orders</h2>

      {orders.map(o=>(

        <div key={o.id} style={card}>

          <div style={header}>

            <span><b>Order #{o.id}</b></span>

            <span style={date}>
              {new Date(o.createdAt).toLocaleString("en-IN",{
                day:"numeric",
                month:"short",
                year:"numeric",
                hour:"2-digit",
                minute:"2-digit"
              })}
            </span>

          </div>

          <div style={items}>

            {o.items?.map(item=>(

              <div key={item.id} style={itemRow}>

                <span>
                  {item.product.name} x{item.quantity}
                </span>

                <span>
                  ₹{item.price * item.quantity}
                </span>

              </div>

            ))}

          </div>

          <div style={footer}>

            <span><b>Total: ₹{o.totalPrice}</b></span>

            <span style={status(o.status)}>
              {o.status}
            </span>

          </div>

        </div>

      ))}

    </div>

  )

}

/* CARD */

const card={
  background:"white",
  padding:"16px",
  borderRadius:"12px",
  marginBottom:"15px",
  boxShadow:"0 8px 20px rgba(0,0,0,0.08)"
}

/* HEADER */

const header={
  display:"flex",
  justifyContent:"space-between",
  marginBottom:"10px"
}

const date={
  color:"#64748b",
  fontSize:"13px"
}

/* ITEMS */

const items={
  borderTop:"1px solid #eee",
  borderBottom:"1px solid #eee",
  padding:"8px 0",
  marginBottom:"10px"
}

const itemRow={
  display:"flex",
  justifyContent:"space-between",
  fontSize:"14px",
  padding:"4px 0"
}

/* FOOTER */

const footer={
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
}

/* STATUS BADGE */

const status=(type)=>({

  padding:"4px 10px",
  borderRadius:"6px",
  fontSize:"12px",
  fontWeight:"600",

  background:
    type==="PLACED" ? "#dbeafe" :
    type==="DELIVERED" ? "#dcfce7" :
    "#fee2e2",

  color:
    type==="PLACED" ? "#2563eb" :
    type==="DELIVERED" ? "#16a34a" :
    "#dc2626"

});