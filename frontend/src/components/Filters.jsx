import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { trackEvent } from "../api/track";

function Filters({ setFilters }) {
  const [localFilters, setLocalFilters] = useState({
    start: "",
    end: "",
    gender: "",
  });

  // load from cookies on mount
  useEffect(() => {
    const saved = Cookies.get("dashboard_filters");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalFilters(parsed);
      setFilters(parsed);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...localFilters,
      [name]: value,
    };

    setLocalFilters(updated);
    setFilters(updated);

    // save to cookies
    Cookies.set("dashboard_filters", JSON.stringify(updated), {
      expires: 7,
    });

    // tracking
    if (name === "start" || name === "end") {
      trackEvent("date_filter");
    }

    if (name === "gender") {
      trackEvent("gender_filter");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
        <input
          type="date"
          name="start"
          value={localFilters.start}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
        <input
          type="date"
          name="end"
          value={localFilters.end}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
        <select
          name="gender"
          value={localFilters.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">All</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;