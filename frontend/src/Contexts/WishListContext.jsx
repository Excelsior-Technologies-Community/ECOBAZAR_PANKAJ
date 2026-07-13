import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlistItems(data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };
  // add to wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/wishlist",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // remove from wishlist
  const removeWishlist = async (wishlistId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/wishlist/${wishlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleWishlist = async (product) => {
    const exists = wishlistItems.some((item) => item.productId === product.id);

    if (exists) {
      const wishlistItem = wishlistItems.find(
        (item) => item.productId === product.id,
      );

      await removeWishlist(wishlistItem.id);
    } else {
      await addToWishlist(product.id);
    }
  };
  // check if product exists
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.productId === productId);
  };
  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  const value = {
    wishlistItems,
    addToWishlist,
    removeWishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount,
    fetchWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
