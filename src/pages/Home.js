import {
  useEffect,
  useState,
  useContext
} from "react";

import ProductCard from "../components/ProductCard";

import { CartContext } from "../context/CartContext";

function Home() {

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] =
    useState([]);

  const [search, setSearch] = useState("");

  const { cart, addToCart } =
    useContext(CartContext);

  useEffect(() => {

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

        setFilteredProducts(data);

      });

  }, []);

  const filterCategory = (category) => {

    if (category === "all") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (item) => item.category === category
    );

    setFilteredProducts(filtered);
  };

  return (

    <div>

      <h1>E-Commerce Store</h1>

      <h2 className="cart-count">
        Cart: {cart.length}
      </h2>

      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="buttons">

        <button
          onClick={() => filterCategory("all")}
        >
          All
        </button>

        <button
          onClick={() =>
            filterCategory("electronics")
          }
        >
          Electronics
        </button>

        <button
          onClick={() =>
            filterCategory("jewelery")
          }
        >
          Jewelery
        </button>

        <button
          onClick={() =>
            filterCategory("men's clothing")
          }
        >
          Men's
        </button>

        <button
          onClick={() =>
            filterCategory("women's clothing")
          }
        >
          Women's
        </button>

      </div>

      <div className="products">

        {filteredProducts
          .filter((item) =>
            item.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((item) => (

            <ProductCard
              key={item.id}
              product={item}
              addToCart={addToCart}
            />

          ))}

      </div>

    </div>
  );
}

export default Home;