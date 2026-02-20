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

  const register = async () => {
    const res = await api.post("/auth/register", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
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
    <div style={{ padding: 40 }}>
      <h2>Login / Register</h2>

      <input
        name="username"
        placeholder="username"
        onChange={handleChange}
      />
      <br />

      <input
        name="password"
        type="password"
        placeholder="password"
        onChange={handleChange}
      />
      <br />

      <input
        name="age"
        placeholder="age"
        onChange={handleChange}
      />
      <br />

      <select name="gender" onChange={handleChange}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <br /><br />

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
