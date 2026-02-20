import api from "./axios";

export const trackEvent = async (feature_name) => {
  try {
    await api.post("/track", { feature_name });
  } catch (err) {
    console.error("Tracking failed:", err.message);
  }
};