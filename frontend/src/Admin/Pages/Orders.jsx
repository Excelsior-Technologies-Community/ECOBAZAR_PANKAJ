import OrderTable from "../Components/OrderTable";

const Orders = () => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Orders</h1>

        <p className="mt-2 text-gray-500">Manage all customer orders</p>
      </div>

      {/* Order Table */}

      <OrderTable />
    </div>
  );
};

export default Orders;
