import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { Login } from "./pages/login/login";
import { ShopContextProvider } from "./context/shop-context";
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Updated the Route for the root path */}
            <Route path="/" element={<ProductList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />

            {/* Optionally, you can keep the Shop component at a different route */}
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;