import { Menu, Search, Bell } from "lucide-react";

const AdminNavbar = ({ setIsOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b bg-white px-4 shadow-sm lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Dashboard</h1>

          <p className="hidden text-sm text-gray-500 md:block">{today}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-[260px] rounded-xl border border-gray-300 bg-[#F8F8F8] py-2.5 pl-10 pr-4 outline-none transition focus:border-[#00B207] focus:bg-white"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl p-2 transition hover:bg-gray-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00B207] text-lg font-semibold text-white shadow">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden lg:block">
            <h3 className="font-semibold text-[#1A1A1A]">{user?.name}</h3>

            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
