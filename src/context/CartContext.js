import {
  createContext,
  useState,
  useEffect
} from "react";

import { toast } from "react-toastify";

export const CartContext = createContext();

function CartProvider({ children }) {

  /* CART */

  const [cart, setCart] = useState(() => {

    const savedCart =
      localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  /* WISHLIST */

  const [wishlist, setWishlist] =
    useState([]);

  /* SAVE CART */

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  /* ADD TO CART */

  const addToCart = (product) => {

    const existingProduct =
      cart.find(
        (item) => item.id === product.id
      );

    if (existingProduct) {

      const updatedCart = cart.map(
        (item) =>

          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

    toast.success("Added To Cart");
  };

  /* REMOVE PRODUCT */

  const removeFromCart = (id) => {

    const updatedCart =
      cart.filter(
        (item) => item.id !== id
      );

    setCart(updatedCart);
  };

  /* CLEAR CART */

  const clearCart = () => {
    setCart([]);
  };

  /* INCREASE QTY */

  const increaseQty = (id) => {

    const updatedCart = cart.map(
      (item) =>

        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1
            }
          : item
    );

    setCart(updatedCart);
  };

  /* DECREASE QTY */

  const decreaseQty = (id) => {

    const updatedCart = cart
      .map((item) =>

        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity - 1
            }
          : item
      )
      .filter(
        (item) => item.quantity > 0
      );

    setCart(updatedCart);
  };

  /* WISHLIST */

  const addToWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) return;

    setWishlist([
      ...wishlist,
      product
    ]);

    toast.success(
      "Added To Wishlist"
    );
  };

  return (

    <CartContext.Provider
      value={{

        cart,
        wishlist,

        addToCart,
        removeFromCart,
        clearCart,

        increaseQty,
        decreaseQty,

        addToWishlist

      }}
    >

      {children}

    </CartContext.Provider>

  );
}

export default CartProvider;