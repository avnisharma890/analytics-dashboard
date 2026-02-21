import { useState } from "react";
import api from "../api/axios";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    age: "",
    gender: "Male",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState("");

  const register = async () => {
    try {
      setError("");
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      const raw =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "";

      // user-friendly mapping
      let message = "Registration failed. Please try again.";

      if (raw.toLowerCase().includes("duplicate")) {
        message = "Username already registered. Please login instead.";
      }

      setError(message);
    }
  };

  const login = async () => {
    const res = await api.post("/auth/login", {
      username: form.username,
      password: form.password,
    });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Analytics Dashboard</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
            <input
              name="age"
              placeholder="Enter age"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={login}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
            <button
              onClick={register}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 border border-gray-600"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
