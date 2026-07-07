import { useState } from "react";
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

const navLinks = [
  { label: "Home", hasDropdown: true },
  { label: "Shop", hasDropdown: true },
  { label: "Pages", hasDropdown: true },
  { label: "Blog", hasDropdown: true },
  { label: "About Us", hasDropdown: false },
  { label: "Contact Us", hasDropdown: false },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full top-0 sticky z-50">
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

            {/* hide sign in from mobile top bar */}
            <button className="hidden text-gray-500 transition hover:text-green-600 sm:block">
              Sign In / Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* ================= MIDDLE BAR ================= */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-4 lg:py-5">
          {/* ---------- Desktop / Laptop ---------- */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <img src={logo} alt="EcoBazar Logo" className="h-10 w-auto" />
            </div>

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
            <div className="flex items-center justify-end gap-4 shrink-0">
              <button className="relative text-gray-700 transition hover:text-green-600">
                <Heart size={28} strokeWidth={1.8} />
              </button>

              <div className="h-7 w-px bg-gray-300"></div>

              <button className="relative flex items-center gap-3 text-left">
                <div className="relative text-gray-700">
                  <ShoppingBag size={28} strokeWidth={1.8} />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[11px] font-medium text-white">
                    2
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Shopping cart:</p>
                  <p className="text-base font-semibold text-gray-900">
                    $57.00
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* ---------- Mobile / Tablet ---------- */}
          <div className="flex flex-col gap-4 lg:hidden">
            {/* Row 1: logo + sign in + heart + cart */}
            <div className="flex items-center justify-between gap-3">
              {/* Logo */}
              <img
                src={logo}
                alt="EcoBazar Logo"
                className="h-8 w-auto sm:h-9"
              />

              {/* Right actions */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button className="text-xs font-medium text-gray-600 transition hover:text-green-600 sm:text-sm">
                  Sign In / Sign Up
                </button>

                <button className="relative text-gray-700 transition hover:text-green-600">
                  <Heart size={24} strokeWidth={1.8} />
                </button>

                <button className="relative text-gray-700 transition hover:text-green-600">
                  <ShoppingBag size={24} strokeWidth={1.8} />
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] font-medium text-white">
                    2
                  </span>
                </button>
              </div>
            </div>

            {/* Row 2: Search */}
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
          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="flex items-center gap-1 text-sm font-medium text-gray-200 transition hover:text-green-400"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={16} />}
              </button>
            ))}
          </div>

          {/* Desktop Phone */}
          <div className="hidden items-center gap-2 text-sm font-medium text-white lg:flex">
            <PhoneCall size={18} />
            <span>(219) 555-0114</span>
          </div>

          {/* Mobile Menu Row */}
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

        {/* Mobile Drawer */}
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

            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className="flex items-center justify-between border-b border-white/10 pb-3 text-left text-sm font-medium text-gray-200"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
