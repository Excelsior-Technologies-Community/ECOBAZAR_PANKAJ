const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-[#1A1A1A]">{value}</h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
