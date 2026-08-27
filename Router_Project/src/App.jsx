import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import HomeTemp from "./pages/HomeTemp";
import Products from "./pages/Products";
import CartTemp from "./pages/CartTemp";
import ProductDetails from "./pages/ProductsD.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductsLayout from "./pages/ProductLayout.jsx";
import Electronics from "./pages/Electronics";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<HomeTemp />} />

        {/* Products Parent Route */}
        <Route path="/products" element={<ProductsLayout />}>

          {/* /products */}
          <Route index element={<Products />} />

          {/* /products/electronics */}
          <Route path="electronics" element={<Electronics />} />

        </Route>

        {/* Cart */}
        <Route path="/cart" element={<CartTemp />} />

        {/* /products/:category/:id */}
        <Route path="/products/:category/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Unknown URL */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;