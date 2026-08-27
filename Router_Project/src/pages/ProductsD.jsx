import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.js";

function ProductD() {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <button onClick={() => navigate("/products")}>
          GO BACK TO MY PRODUCTS PAGE
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Product Details</h1>

      <p>Category: {category}</p>

      <h2>{product.name}</h2>

      <p>Price: ₹{product.price}</p>

      <button onClick={() => navigate("/products")}>
        GO BACK TO MY PRODUCTS PAGE
      </button>
    </div>
  );
}

export default ProductD;