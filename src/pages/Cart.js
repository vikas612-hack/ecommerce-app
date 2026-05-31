import { useContext } from "react";

import { CartContext }
from "../context/CartContext";

function Cart() {

  const {

    cart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty

  } = useContext(CartContext);

  /* TOTAL PRICE */

  const totalPrice = cart.reduce(

    (total, item) =>

      total +
      item.price * item.quantity,

    0

  );

  return (

    <div>

      <h1>Cart Page</h1>

      <h2 className="total">
        Total: ${totalPrice.toFixed(2)}
      </h2>

      {cart.length === 0 ? (

        <h2>Cart is Empty</h2>

      ) : (

        cart.map((item) => (

          <div
            key={item.id}
            className="cart-item"
          >

            <img
              src={item.image}
              alt={item.title}
              width="100"
            />

            <div>

              <h3>{item.title}</h3>

              <p>${item.price}</p>

              <h4>
                Quantity:
                {item.quantity}
              </h4>

              {/* QUANTITY BUTTONS */}

              <div className="qty-buttons">

                <button
                  onClick={() =>
                    increaseQty(item.id)
                  }
                >
                  +
                </button>

                <button
                  onClick={() =>
                    decreaseQty(item.id)
                  }
                >
                  -
                </button>

              </div>

            </div>

            {/* REMOVE */}

            <button
              className="remove-btn"
              onClick={() =>
                removeFromCart(item.id)
              }
            >
              ✖
            </button>

          </div>

        ))

      )}

      {cart.length > 0 && (

        <button
          className="clear-btn"
          onClick={clearCart}
        >
          Clear Cart
        </button>

      )}

    </div>
  );
}

export default Cart;