import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./Contexts/CartContext.jsx";
import { WishlistProvider } from "./Contexts/WishListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <App />

          <Toaster position="top-right" reverseOrder={false} />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
