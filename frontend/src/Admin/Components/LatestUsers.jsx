const users = [
  {
    name: "Pankaj",
    email: "pankaj@gmail.com",
    joined: "Today",
  },
  {
    name: "Rahul",
    email: "rahul@gmail.com",
    joined: "Yesterday",
  },
  {
    name: "Amit",
    email: "amit@gmail.com",
    joined: "2 Days Ago",
  },
  {
    name: "Neha",
    email: "neha@gmail.com",
    joined: "4 Days Ago",
  },
];

const LatestUsers = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">Latest Users</h2>

        <button className="text-sm font-medium text-[#00B207] hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {users.map((user) => (
          <div key={user.email} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B207] text-lg font-semibold text-white">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-[#1A1A1A]">{user.name}</h3>

              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <span className="text-xs text-gray-400">{user.joined}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestUsers;
