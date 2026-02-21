import { useEffect, useState } from "react";
import api from "../api/axios";

import Filters from "../components/Filters";
import BarChartBox from "../components/BarChartBox";
import LineChartBox from "../components/LineChartBox";

function Dashboard() {
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFeature, setSelectedFeature] = useState(null);

  const fetchAnalytics = async () => {
    const params = {
      ...filters,
      feature: selectedFeature,
    };

    const res = await api.get("/analytics", { params });
    setBarData(res.data.barData);
    setLineData(res.data.lineData);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [filters, selectedFeature]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Analytics Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition border border-gray-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
          <Filters setFilters={setFilters} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Feature Usage
            </h2>
            <div className="flex justify-center">
              <BarChartBox
                data={barData}
                onBarClick={(feature) => setSelectedFeature(feature)}
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              {selectedFeature
                ? `Trend: ${selectedFeature}`
                : "Select a Feature to view trend"}
            </h2>
            <div className="flex justify-center">
              <LineChartBox data={lineData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;