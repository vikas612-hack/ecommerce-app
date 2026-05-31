import {
  useEffect,
  useState,
  useContext
} from "react";

import { useParams } from "react-router-dom";

import { CartContext }
from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const { addToCart } =
    useContext(CartContext);

  useEffect(() => {

    fetch(
      `https://fakestoreapi.com/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data));

  }, [id]);

  /* LOADING */

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (

    <div className="details-page">

      <div className="details-card">

        <img
          src={product.image}
          alt={product.title}
        />

        <div className="details-info">

          <h1>{product.title}</h1>

          <h2>${product.price}</h2>

          <p>{product.description}</p>

          <h3>
            Category: {product.category}
          </h3>

          <button
            onClick={() =>
              addToCart(product)
            }
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;