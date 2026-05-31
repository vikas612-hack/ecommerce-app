import { Link } from "react-router-dom";

function ProductCard({
  product,
  addToCart
}) {

  return (

    <div className="card">

      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >

        <img
          src={product.image}
          alt={product.title}
        />

        <h3>{product.title}</h3>

      </Link>

      <p>${product.price}</p>

      <button
        onClick={() =>
          addToCart(product)
        }
      >
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;