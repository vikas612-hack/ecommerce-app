import { useContext, useState } from "react";

import emailjs from "@emailjs/browser";

import { CartContext }
from "../context/CartContext";

function Checkout() {

  const { cart } =
    useContext(CartContext);

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      address: "",
      phone: ""

    });

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });



  };

  /* TOTAL PRICE */

  const totalPrice = cart.reduce(

    (total, item) =>

      total +
      item.price * item.quantity,

    0

  );

  /* PLACE ORDER */

  const handleSubmit = (e) => {

    e.preventDefault();

    /* PRODUCT LIST */

    const productList = cart.map(

      (item) =>

        `${item.title}
        x ${item.quantity}`

    ).join(", ");

    /* TEMPLATE DATA */

    const templateParams = {

      user_name: formData.name,

      user_email: formData.email,

      address: formData.address,

      products: productList,

      total: totalPrice.toFixed(2),

      email: formData.email

    };

    /* SEND EMAIL */

    emailjs.send(

      "ecommerce1",

      "template_lsqmwfb",

      templateParams,

      "bH7BOxMDVC4OEVfz8"

    )

    .then(() => {

      alert(
        "Order placed successfully!"
      );
      
    })

    .catch((error) => {

      console.log(error);

      alert("Email failed");

    });

  };

  return (

    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* FORM */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <button type="submit">
            Place Order
          </button>

        </form>

        {/* ORDER SUMMARY */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              key={item.id}
              className="summary-item"
            >

              <p>{item.title}</p>

              <p>
                {item.quantity} ×
                ${item.price}
              </p>

            </div>

          ))}

          <h2>
            Total:
            ${totalPrice.toFixed(2)}
          </h2>

        </div>

      </div>

    </div>

  );
}

export default Checkout;