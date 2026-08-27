import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <h2>MyStore</h2>

      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>

      {isLoggedIn ? (
        <NavLink to="/profile">Profile</NavLink>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}

export default Navbar;