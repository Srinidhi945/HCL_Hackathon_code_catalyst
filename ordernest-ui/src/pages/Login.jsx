import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/api/auth/login", {
        email: email,
        password: password
      });

      const userData = res.data;

      // store user
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login successful");

      // ROLE BASED REDIRECT

      if (userData.role === "MANAGER") {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }

    } catch (err) {

      console.error(err);

      if (err.response) {

        toast.error(err.response.data.message || "Invalid email or password");

      } else {

        toast.error("Server not reachable");

      }

    }

  };

  return (

    <div className="form-container">

      <div className="form-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

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
            Login
          </button>

        </form>

        <div className="form-footer">

          Don't have an account?  
          <Link to="/signup"> Signup</Link>

        </div>

      </div>

    </div>

  );

}