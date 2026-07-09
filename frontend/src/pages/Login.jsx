import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthHero from "../Components/AuthHero";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <AuthHero currentPage="Login" />

      <section className="px-4 py-14 lg:py-20">
        <div className="mx-auto flex max-w-[1320px] justify-center">
          <div className="w-full max-w-[520px] rounded-[12px] border border-[#E6E6E6] bg-white px-5 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 sm:py-10">
            {/* Heading */}
            <h1 className="text-center text-[32px] font-semibold leading-none text-[#1A1A1A] sm:text-[36px]">
              Sign In
            </h1>

            {/* Form */}
            <form className="mt-8">
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="h-[54px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-[15px] text-[#1A1A1A] outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                />
              </div>

              {/* Password */}
              <div className="relative mt-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="h-[54px] w-full rounded-[8px] border border-[#E6E6E6] px-4 pr-12 text-[15px] text-[#1A1A1A] outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] transition hover:text-[#1A1A1A]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-2 text-sm text-[#666666]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#CCCCCC] accent-[#00B207]"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#666666] transition hover:text-[#00B207]"
                >
                  Forget Password
                </Link>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="mt-6 inline-flex h-[54px] w-full items-center justify-center rounded-full bg-[#00B207] px-6 text-[15px] font-semibold text-white transition hover:bg-green-700"
              >
                Login
              </button>

              {/* Bottom text */}
              <p className="mt-6 text-center text-sm text-[#666666]">
                Don&apos;t have account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#1A1A1A] transition hover:text-[#00B207]"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
