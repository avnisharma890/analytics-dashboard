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

  return (
    <div style={{ padding: 20 }}>
      <h2>Analytics Dashboard</h2>

      <Filters setFilters={setFilters} />

      <BarChartBox
        data={barData}
        onBarClick={(feature) => setSelectedFeature(feature)}
      />

      <LineChartBox data={lineData} />
    </div>
  );
}

export default Dashboard;
