const StatsSection = () => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-lg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-500 mb-2">1M+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-500 mb-2">10PB+</div>
            <div className="text-gray-400">Data Stored</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
