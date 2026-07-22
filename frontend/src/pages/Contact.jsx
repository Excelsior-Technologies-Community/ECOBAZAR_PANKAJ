import { Link } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Home, ChevronRight, MapPin, Mail, Phone } from "lucide-react";

import heroBg from "../assets/HeroDetail.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
      );

      toast.success(data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* ================= Hero ================= */}

      <section className="relative h-[280px] overflow-hidden md:h-[340px]">
        <img
          src={heroBg}
          alt="Contact"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
          <div>
            <h1 className="mb-4 text-5xl font-bold text-white">Contact Us</h1>

            <div className="flex items-center gap-2 text-white">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-[#00B207]"
              >
                <Home size={16} />
                Home
              </Link>

              <ChevronRight size={16} />

              <span className="text-[#00B207]">Contact</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Contact Section ================= */}

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-12">
          {/* Left */}

          <div className="space-y-6 lg:col-span-4">
            {/* Address */}

            <div className="rounded-xl border p-8 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <MapPin className="text-[#00B207]" size={30} />
              </div>

              <p className="text-gray-600 leading-8">Anand, Gujarat, India</p>
            </div>

            {/* Email */}

            <div className="rounded-xl border p-8 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Mail className="text-[#00B207]" size={30} />
              </div>

              <p className="text-gray-700">support@ecobazar.com</p>

              <p className="mt-2 text-gray-500">help@ecobazar.com</p>
            </div>

            {/* Phone */}

            <div className="rounded-xl border p-8 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Phone className="text-[#00B207]" size={30} />
              </div>

              <p className="text-gray-700">+91 9876543210</p>

              <p className="mt-2 text-gray-500">+91 9999999999</p>
            </div>
          </div>

          {/* Right */}

          <div className="rounded-xl border p-8 shadow-sm lg:col-span-8">
            <h2 className="text-3xl font-bold">Just Say Hello!</h2>

            <p className="mt-3 text-gray-500">
              Do you have any questions or need help? Feel free to contact us
              anytime.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              {" "}
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="rounded-lg border px-4 py-3 outline-none focus:border-[#00B207]"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="rounded-lg border px-4 py-3 outline-none focus:border-[#00B207]"
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#00B207]"
              />
              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#00B207]"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-[#00B207] px-8 py-4 font-semibold text-white transition hover:bg-[#2C742F] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= Map ================= */}

      <section>
        <iframe
          title="Google Map"
          className="h-[500px] w-full"
          src="https://www.google.com/maps?q=Anand,Gujarat&output=embed"
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
