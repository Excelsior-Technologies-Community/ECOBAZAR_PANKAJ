import {
  MapPin,
  ChevronDown,
  Heart,
  ShoppingBag,
  Search,
  Menu,
  X,
  PhoneCall,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useCart } from "../Contexts/CartContext";
import { useWishlist } from "../Contexts/WishListContext";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  {
    label: "Pages",
    children: [
      { label: "FAQ", path: "/faq" },
      { label: "Settings", path: "/settings" },
    ],
  },
  { label: "Blog", path: "/blog" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? "text-[#00B207]" : "text-gray-200 hover:text-green-400"
  }`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const isAdmin = loggedInUser?.role === "admin";
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setLoggedInUser(null);
    setMobileMenuOpen(false); // mobile drawer bhi close ho jaye

    navigate("/");
    window.location.reload();
  };
  const { cartCount, cartSubtotal } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ================= TOP BAR ================= */}
      <div className="border-b border-gray-200 bg-white text-sm text-gray-500">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-2">
          {/* Left */}
          <div className="hidden items-center gap-2 sm:flex">
            <MapPin size={16} className="text-gray-400" />
            <p>Store Location: Lincoln- 344, Illinois, Chicago, USA</p>
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden cursor-pointer items-center gap-1 sm:flex">
              <span>Eng</span>
              <ChevronDown size={14} />
            </div>

            <div className="hidden cursor-pointer items-center gap-1 sm:flex">
              <span>USD</span>
              <ChevronDown size={14} />
            </div>

            <div className="hidden h-4 w-px bg-gray-300 sm:block"></div>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `hidden lg:block  text-sm font-medium transition ${
                    isActive
                      ? "text-[#00B207]"
                      : "text-gray-600 hover:text-green-400"
                  }`
                }
              >
                Admin Panel
              </NavLink>
            )}
            {loggedInUser ? (
              <div className=" items-center gap-3 sm:flex">
                <span className="text-gray-600">Hi, {loggedInUser.name}</span>

                <button
                  onClick={handleLogout}
                  className="text-gray-500 transition hover:text-green-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden text-gray-500 transition hover:text-green-600 sm:block"
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ================= MIDDLE BAR ================= */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-4 lg:py-5">
          {/* ---------- Desktop / Laptop ---------- */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center">
              <img src={logo} alt="EcoBazar Logo" className="h-10 w-auto" />
            </Link>

            {/* Search */}
            <div className="flex w-full max-w-[600px] overflow-hidden rounded-md border border-gray-300">
              <div className="flex flex-1 items-center px-3">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border-none px-3 py-3 text-sm outline-none"
                />
              </div>
              <button className="bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700">
                Search
              </button>
            </div>

            {/* Wishlist + Cart */}
            <div className="flex shrink-0 items-center justify-end gap-4">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative text-gray-700 transition hover:text-green-600"
              >
                <Heart size={28} strokeWidth={1.8} />
                {wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-medium text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <div className="h-7 w-px bg-gray-300"></div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-3 text-left"
              >
                <div className="relative text-gray-700">
                  <ShoppingBag size={28} strokeWidth={1.8} />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-medium text-white">
                      {cartCount}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-500">Shopping cart:</p>
                  <p className="text-base font-semibold text-gray-900">
                    ${cartSubtotal.toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* ---------- Mobile / Tablet ---------- */}
          <div className="flex flex-col gap-4 lg:hidden">
            {/* Row 1 */}
            <div className="flex items-center justify-between gap-3">
              <Link to="/">
                <img
                  src={logo}
                  alt="EcoBazar Logo"
                  className="h-8 w-auto sm:h-9"
                />
              </Link>

              <div className="flex items-center gap-3 sm:gap-4">
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `border-b border-white/10  text-sm font-medium transition ${
                        isActive
                          ? "text-[#00B207]"
                          : "text-gray-600 hover:text-green-400"
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                )}
                {loggedInUser ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600 sm:text-sm">
                      Hi, {loggedInUser.name}
                    </span>

                    <button
                      onClick={handleLogout}
                      className="text-xs font-medium text-gray-600 transition hover:text-green-600 sm:text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="text-xs font-medium text-gray-600 transition hover:text-green-600 sm:text-sm"
                  >
                    Sign In / Sign Up
                  </Link>
                )}

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="relative text-gray-700 transition hover:text-green-600"
                >
                  <Heart size={24} strokeWidth={1.8} />
                  {wishlistCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-medium text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative text-gray-700 transition hover:text-green-600"
                >
                  <ShoppingBag size={24} strokeWidth={1.8} />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-medium text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex w-full overflow-hidden rounded-md border border-gray-300">
              <div className="flex flex-1 items-center px-3">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border-none px-3 py-3 text-sm outline-none"
                />
              </div>
              <button className="bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 sm:px-6">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAVBAR ================= */}
      <div className="bg-[#333333] text-white">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4">
          {/* ===== Desktop Menu ===== */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div key={link.label} className="group relative">
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-200 transition hover:text-green-400">
                      {link.label}
                      <ChevronDown size={16} />
                    </button>

                    {/* Dropdown */}
                    <div className="invisible absolute left-0 top-full z-30 mt-3 min-w-[200px] translate-y-2 rounded-[10px] border border-[#E6E6E6] bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.label}
                          to={child.path}
                          className={({ isActive }) =>
                            `block rounded-md px-4 py-2.5 text-sm transition ${
                              isActive
                                ? "bg-[#F2FFF2] font-medium text-[#00B207]"
                                : "text-[#1A1A1A] hover:bg-[#F7F7F7]"
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={navLinkClass}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop Phone */}
          <div className="hidden items-center gap-2 text-sm font-medium text-white lg:flex">
            <PhoneCall size={18} />
            <span>(219) 555-0114</span>
          </div>

          {/* ===== Mobile Menu Row ===== */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md p-2 transition hover:bg-white/10"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-2 text-sm font-medium">
              <PhoneCall size={18} />
              <span>(219) 555-0114</span>
            </div>
          </div>
        </div>

        {/* ================= MOBILE DRAWER ================= */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#333333] px-4 py-4 lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 transition hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div
                      key={link.label}
                      className="border-b border-white/10 pb-3"
                    >
                      <button
                        onClick={() => setMobilePagesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between text-left text-sm font-medium text-gray-200"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition ${
                            mobilePagesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {mobilePagesOpen && (
                        <div className="mt-3 flex flex-col gap-2 pl-3">
                          {link.children.map((child) => (
                            <NavLink
                              key={child.label}
                              to={child.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={({ isActive }) =>
                                `rounded-md px-3 py-2 text-sm transition ${
                                  isActive
                                    ? "bg-white/10 text-[#00B207]"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `border-b border-white/10 pb-3 text-sm font-medium transition ${
                        isActive
                          ? "text-[#00B207]"
                          : "text-gray-200 hover:text-green-400"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
