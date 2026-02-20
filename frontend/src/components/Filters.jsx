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
    <div style={{ marginBottom: 20 }}>
      <input
        type="date"
        name="start"
        value={localFilters.start}
        onChange={handleChange}
      />

      <input
        type="date"
        name="end"
        value={localFilters.end}
        onChange={handleChange}
      />

      <select
        name="gender"
        value={localFilters.gender}
        onChange={handleChange}
      >
        <option value="">All</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>
  );
}

export default Filters;