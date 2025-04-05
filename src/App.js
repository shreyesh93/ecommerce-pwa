import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommerceApp from "./EcommerceApp";
import CartPage from "./cartpage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EcommerceApp cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
