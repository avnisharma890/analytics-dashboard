import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { trackEvent } from "../api/track";

function BarChartBox({ data, onBarClick }) {
  const handleClick = (data) => {
    // update line chart
    onBarClick(data.feature_name);

    // 🔥 tracking
    trackEvent("bar_chart_zoom");
  };

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="feature_name" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="total_clicks"
        fill="#8884d8"
        onClick={handleClick}
      />
    </BarChart>
  );
}

export default BarChartBox;