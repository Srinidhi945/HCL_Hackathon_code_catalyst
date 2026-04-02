import "../styles/hero.css";
import logo from "../assets/Order_nest_logo.png";
import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (

    <div className="hero container">

      <div className="hero-text">

        <h1>
          Order Food <span>Faster</span>
        </h1>

        <p>
          Fresh meals delivered instantly from your favourite brands.
        </p>

        <button
          className="cta-button"
          onClick={() => navigate("/dashboard")}
        >
          Shop Now
        </button>

      </div>

      <div>

        <img
          src={logo}
          alt="OrderNest Logo"
          className="hero-logo floating-logo"
        />

      </div>

    </div>

  );

}

export default Hero;