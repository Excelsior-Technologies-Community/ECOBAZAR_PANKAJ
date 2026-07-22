import React from "react";
import { useState } from "react";
import { Home, ChevronRight, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import heroBg from "../assets/HeroDetail.jpg";
import farmer from "../assets/farmer.png";
function Faq() {
  const faqs = [
    {
      question: "What is EcoBazar?",
      answer:
        "EcoBazar is an online organic grocery store where you can purchase fresh fruits, vegetables, dairy products, and daily essentials directly from trusted farms.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Most orders are delivered within 24–48 hours depending on your location and product availability.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes. Orders can be cancelled before they are shipped. Once dispatched, cancellation may not be possible.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept UPI, Credit/Debit Cards, Net Banking and Cash on Delivery.",
    },
    {
      question: "How can I contact EcoBazar support?",
      answer:
        "You can contact us through our Contact page or email our support team anytime.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2">
          {/* Left */}

          <div>
            <h2 className="mb-10 text-5xl font-bold leading-tight text-[#1A1A1A]">
              Welcome, Let's Talk
              <br />
              About EcoBazar
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeIndex === index;

                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-lg border transition-all duration-300 ${
                      isOpen ? "border-[#00B207]" : "border-gray-200"
                    }`}
                  >
                    {/* Header */}

                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between bg-[#F8F8F8] px-6 py-5 text-left"
                    >
                      <span className="font-semibold text-[#1A1A1A]">
                        {faq.question}
                      </span>

                      <div className="rounded-full bg-white p-2">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>

                    {/* Body */}

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 py-5 leading-8 text-gray-500">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right */}

          <div className="flex justify-center">
            <img src={farmer} alt="FAQ" className="w-full max-w-[550px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faq;
