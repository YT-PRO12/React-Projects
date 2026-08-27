import { useSearchParams } from "react-router-dom";
import products from "../data/products";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");

  const filteredProducts = category
    ? products.filter(
        (product) => product.category === category
      )
    : products;

  return (
    <div>
      <h2>All Products</h2>

      <button
        onClick={() =>
          setSearchParams({ category: "electronics" })
        }
      >
        Electronics
      </button>

      <button
        onClick={() =>
          setSearchParams({ category: "shoes" })
        }
      >
        Shoes
      </button>

      <button
        onClick={() => setSearchParams({})}
      >
        All Products
      </button>

      <hr />

      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <p>{product.category}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;