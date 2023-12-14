import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { ShopContext } from '../../context/shop-context';
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";

// Define your GraphQL query
const GET_PRODUCT = gql`
query {
  products {
    _id
    name
    description
    price
    category
    imageUrls
  }
}
`;


export const Cart = () => {
  const { getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  // Fetch cart items using Apollo Client's useQuery hook
  const { loading, error, data } = useQuery(GET_PRODUCT, navigate);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure data and data.cartItems are defined before mapping over it
  const cartItems = data && data.cartItems ? data.cartItems : [];

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {cartItems.map((item) => (
          <CartItem key={item.id} data={item} />
        ))}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={() => { checkout(); navigate("/checkout"); }}>
            Checkout
          </button>
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};