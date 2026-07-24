import { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import UserDetailsModal from "./UsersDetailsMode";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700";

      case "customer":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        Loading Users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold">No Users Found</h2>

        <p className="mt-2 text-gray-500">There are no registered users.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>

                <th className="px-6 py-4 text-left">Email</th>

                <th className="px-6 py-4 text-left">Role</th>

                <th className="px-6 py-4 text-center">Orders</th>

                <th className="px-6 py-4 text-center">Spent</th>

                <th className="px-6 py-4 text-center">Joined</th>

                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-5 font-semibold">{user.name}</td>

                  <td className="px-6 py-5">{user.email}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleColor(
                        user.role,
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">{user.total_orders}</td>

                  <td className="px-6 py-5 text-center">
                    ₹ {user.total_spent}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setOpenModal(true);
                        }}
                        className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserDetailsModal
        open={openModal}
        setOpen={setOpenModal}
        userId={selectedUserId}
      />
    </>
  );
};

export default UserTable;
