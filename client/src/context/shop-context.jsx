import React, { createContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
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

export const ShopContext = createContext({
  loading: true,
  error: null,
  cartItems: {},
  addToCart: () => {},
  updateCartItemCount: () => {},
  removeFromCart: () => {},
  getTotalCartAmount: () => 0,
  checkout: () => {},
  products: [],
});

export const ShopContextProvider = (props) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const getDefaultCart = () => {
    if (!data || !data.products) return {};

    return data.products.reduce((cart, product) => {
      cart[product._id] = 0;
      return cart;
    }, {});
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    if (!loading && data && data.products) {
      setCartItems(getDefaultCart());
    }
  }, [loading, data]);

  const getTotalCartAmount = () => {
    if (!data || !data.products) return 0;

    return Object.entries(cartItems).reduce((totalAmount, [itemId, count]) => {
      const itemInfo = data.products.find((product) => product._id === itemId);

      if (itemInfo && count > 0) {
        totalAmount += count * itemInfo.price;
      }

      return totalAmount;
    }, 0);
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    loading,
    error,
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    products: data ? data.products : [],
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};