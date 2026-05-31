import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {

  return (

    <BrowserRouter>

      <nav className="nav">

        <Link to="/">Home</Link>

        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>

      </nav>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;