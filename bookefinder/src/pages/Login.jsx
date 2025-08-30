import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const res = login(form);
    if (!res.ok) {
      toast.error(res.message || "Invalid credentials", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.success("Login successful 🎉", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => navigate("/"), 1500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800  to-gray-800">
      <div className="bg-gradient-to-b from-gray-700 to-gray-00 p-8 rounded-2xl shadow-xl w-80 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Welcome Back 👋
        </h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            name="email"
            onChange={handle}
            value={form.email}
            placeholder="Email"
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="password"
            type="password"
            onChange={handle}
            value={form.password}
            placeholder="Password"
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 transition text-white py-3 rounded-lg font-semibold shadow-md"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400 text-center">
          No account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
