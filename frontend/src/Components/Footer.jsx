import { AiOutlineTwitter } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

// app store / play store / payment images
import appStoreImg from "../assets/DownloadourMobileApp.png";
import paymentImg from "../assets/paymentMethod.png";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Top Footer */}
      <div className="px-4 pt-14 pb-10 lg:pt-16 lg:pb-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.7fr_0.8fr_1fr]">
            {/* About */}
            <div>
              <h3 className="text-[28px] font-semibold text-white">
                About Shopery
              </h3>

              <p className="mt-4 max-w-[360px] text-[18px] leading-8 text-[#808080]">
                Morbi cursus porttitor enim lobortis molestie. Duis gravida
                turpis dui, eget bibendum magna congue nec.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-[18px] font-medium">
                <a
                  href="tel:2195550114"
                  className="border-b-2 border-[#00B207] pb-1 text-white"
                >
                  (219) 555-0114
                </a>

                <span className="text-[#808080]">or</span>

                <a
                  href="mailto:Proxy@gmail.com"
                  className="border-b-2 border-[#00B207] pb-1 text-white"
                >
                  Proxy@gmail.com
                </a>
              </div>
            </div>

            {/* My Account */}
            <div>
              <h3 className="text-[28px] font-semibold text-white">
                My Account
              </h3>

              <ul className="mt-5 space-y-4 text-[18px] text-[#808080]">
                <li className="transition hover:text-white">My Account</li>
                <li className="transition hover:text-white">Order History</li>
                <li className="transition hover:text-white">Shoping Cart</li>
                <li className="transition hover:text-white">Wishlist</li>
                <li className="transition hover:text-white">Settings</li>
              </ul>
            </div>

            {/* Helps */}
            <div>
              <h3 className="text-[28px] font-semibold text-white">Helps</h3>

              <ul className="mt-5 space-y-4 text-[18px] text-[#808080]">
                <li className="transition hover:text-white">Contact</li>
                <li className="transition hover:text-white">Faqs</li>
                <li className="transition hover:text-white">
                  Terms & Condition
                </li>
                <li className="transition hover:text-white">Privacy Policy</li>
              </ul>
            </div>

            {/* Proxy */}
            <div>
              <h3 className="text-[28px] font-semibold text-white">Proxy</h3>

              <ul className="mt-5 space-y-4 text-[18px] text-[#808080]">
                <li className="transition hover:text-white">About</li>
                <li className="transition hover:text-white">Shop</li>
                <li className="transition hover:text-white">Product</li>
                <li className="transition hover:text-white">
                  Products Details
                </li>
                <li className="transition hover:text-white">Track Order</li>
              </ul>
            </div>

            {/* App Download */}
            <div>
              <h3 className="text-[28px] font-semibold text-white">
                Download our Mobile App
              </h3>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <img
                  src={appStoreImg}
                  alt="Download on App Store"
                  className="h-[60px] w-auto rounded-[8px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-14 border-t border-white/10"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col gap-6 pt-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B207] text-white transition hover:bg-green-700"
              >
                <BsFacebook size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full text-[#808080] transition hover:bg-[#00B207] hover:text-white"
              >
                <AiOutlineInstagram size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full text-[#808080] transition hover:bg-[#00B207] hover:text-white"
              >
                <FaPinterestP size={18} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full text-[#808080] transition hover:bg-[#00B207] hover:text-white"
              >
                <AiOutlineTwitter size={20} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-center text-[16px] text-[#808080]">
              Ecobazar eCommerce © 2021. All Rights Reserved
            </p>

            {/* Payment */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={paymentImg}
                alt="Payment methods"
                className="h-[40px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
