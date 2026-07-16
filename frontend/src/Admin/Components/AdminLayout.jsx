import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="lg:ml-[260px]">
        <AdminNavbar setIsOpen={setIsOpen} />

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
