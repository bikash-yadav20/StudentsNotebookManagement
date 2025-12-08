// LoginForm.jsx
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import {StudentsContext } from "../../context/StudentsContext";
import { useContext } from "react";

export default function LoginForm() {
  const { login } = useContext(StudentsContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      login({ username, password }); // store credentials in context
    } else {
      alert("Invalid credentials");
    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Extra links */}
        <div className="text-center text-sm text-gray-500">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
