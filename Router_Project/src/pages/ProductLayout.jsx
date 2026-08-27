import { Outlet } from "react-router-dom";

function ProductsLayout() {
  return (
    <div>
      <h1>Products Section</h1>

      <p>Choose a product category:</p>

      <Outlet />
    </div>
  );
}

export default ProductsLayout;