import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

export default function Landing() {

  return (

    <div className="container">

      <Hero />

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to OrderNest
      </motion.h1>

      <p>Your Smart Retail Ordering Platform</p>

      <div className="landing-buttons">

        <Link to="/login">
          <button className="cta-button">Login</button>
        </Link>

        <Link to="/signup">
          <button className="cta-button">Signup</button>
        </Link>

      </div>

    </div>

  );

}