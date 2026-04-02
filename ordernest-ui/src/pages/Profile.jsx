import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile(){

  const user = JSON.parse(localStorage.getItem("user"));

  const [name,setName] = useState(user?.name || "");
  const [mobile,setMobile] = useState(user?.mobile || "");
  const [address,setAddress] = useState(user?.address || "");

  const saveProfile = () => {

    const updatedUser = {
      ...user,
      name,
      mobile,
      address
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Profile updated successfully");

  };

  return(

    <div className="form-container">

      <div className="form-card">

        <h2>Edit Profile</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />
        </div>

        <button
          className="form-button"
          onClick={saveProfile}
        >
          Save Changes
        </button>

      </div>

    </div>

  );

}