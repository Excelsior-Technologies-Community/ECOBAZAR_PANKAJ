import { Eye } from "lucide-react";

const orders = [
  {
    id: "#1001",
    customer: "Pankaj",
    amount: "₹1,250",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Rahul",
    amount: "₹899",
    payment: "COD",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Amit",
    amount: "₹2,340",
    payment: "Paid",
    status: "Processing",
  },
  {
    id: "#1004",
    customer: "Neha",
    amount: "₹560",
    payment: "Paid",
    status: "Delivered",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentOrders = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">Recent Orders</h2>

        <button className="text-sm font-medium text-[#00B207] hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="pb-3">Order</th>

              <th className="pb-3">Customer</th>

              <th className="pb-3">Amount</th>

              <th className="pb-3">Payment</th>

              <th className="pb-3">Status</th>

              <th className="pb-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="py-4 font-medium">{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.amount}</td>

                <td>{order.payment}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="text-center">
                  <button className="rounded-lg p-2 hover:bg-gray-100">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
