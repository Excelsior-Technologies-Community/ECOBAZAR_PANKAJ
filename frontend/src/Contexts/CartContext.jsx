import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ===== Add to Cart =====
  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(data.cart);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  // ===== Remove from Cart =====
  const removeFromCart = async (cartId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // ===== Increase Quantity =====
  const increaseQty = async (cartId, currentQuantity) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/cart/${cartId}`,
        {
          quantity: currentQuantity + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // ===== Decrease Quantity =====
  const decreaseQty = async (cartId, currentQuantity) => {
    try {
      if (currentQuantity <= 1) return;

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/cart/${cartId}`,
        {
          quantity: currentQuantity - 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // ===== Clear Cart =====
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:5000/api/cart/clear/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  // ===== Total item count =====
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // ===== Subtotal =====
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    cartCount,
    cartSubtotal,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
