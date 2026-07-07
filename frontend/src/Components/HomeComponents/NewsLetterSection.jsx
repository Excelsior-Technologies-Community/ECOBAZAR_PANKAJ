import logo from "../../assets/logo.png";

const NewsletterSection = () => {
  return (
    <section className="bg-[#EDF2EE] px-4 py-8 lg:py-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-6 rounded-[10px] bg-white md:flex-row md:items-center md:justify-between">
          {/* Left: Logo */}
          <div className="flex justify-center md:justify-start">
            <img
              src={logo}
              alt="Ecobazar Logo"
              className="h-10 w-auto sm:h-12"
            />
          </div>

          {/* Middle: Text */}
          <div className="text-center md:text-left">
            <h2 className="text-[24px] font-semibold text-[#1A1A1A] sm:text-[28px]">
              Subscribe our Newsletter
            </h2>
            <p className="mt-1 text-sm text-[#808080] sm:text-base">
              Pellentesque eu nibh eget mauris congue mattis mattis.
            </p>
          </div>

          {/* Right: Input + Button */}
          <form className="flex w-full max-w-[520px] flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="h-[52px] w-full rounded-full border border-[#E6E6E6] px-5 text-sm text-[#1A1A1A] outline-none transition focus:border-[#00B207]"
            />

            <button
              type="submit"
              className="h-[52px] rounded-full bg-[#00B207] px-8 text-sm font-semibold text-white transition hover:bg-green-700 sm:min-w-[140px]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
