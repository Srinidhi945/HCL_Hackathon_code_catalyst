import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/api/auth/signup", {
        name: name,
        email: email,
        password: password
      });

      console.log("Signup success:", res.data);

      alert("Account created successfully");

      navigate("/login");

    } catch (err) {

      console.error("Signup error:", err);

      if (err.response) {
        alert(err.response.data.message || "Signup failed");
      } else {
        alert("Server not reachable");
      }

    }

  };

  return (

    <div className="form-container">

      <div className="form-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>

          <div className="form-group">
            <label>Name</label>
            <input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="form-button">
            Signup
          </button>

        </form>

        <div className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>

    </div>

  );

}