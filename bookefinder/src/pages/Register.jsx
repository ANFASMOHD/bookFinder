// src/pages/Register.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const submit = async (e) => {
  e.preventDefault();
  const res = await register(form);

  if (!res || !res.ok) {
    toast.error(res?.message || "Registration failed!", { position: "top-center" });
  } else {
    toast.success("Registration successful!", { position: "top-center" });
    setTimeout(() => navigate("/"), 1500); // go to book search page
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-gray-800">
      <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-8 rounded-2xl shadow-xl w-80 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h2>

        <form onSubmit={submit} className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              name="name"
              type="text"
              onChange={handle}
              value={form.name}
              placeholder="Full Name"
              className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              name="email"
              type="email"
              onChange={handle}
              value={form.email}
              placeholder="Email"
              className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              name="password"
              type="password"
              onChange={handle}
              value={form.password}
              placeholder="Password"
              className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
