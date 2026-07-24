import UserTable from "../Components/UserTable";

const User = () => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Users</h1>

        <p className="mt-2 text-gray-500">Manage all registered users</p>
      </div>

      {/* User Table */}

      <UserTable />
    </div>
  );
};

export default User;
