import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

import AdminNav from "../components/AdminNav";
import SideBar from "../components/SideBar";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await registerUser(formData);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
      <div className='p-5 bg-img w-full overflow-hidden h-screen text-white flex justify-center items-center'>
      <div className='z-100 w-full h-full max-w-[1400px] overflow-y-auto bg-[#2A2A2A]/60 rounded-3xl shadow-lg flex flex-col'>
         <AdminNav />

        <div className="flex flex-1">
          <SideBar />

          <div className="flex-1 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-[#2a2a2a] p-8 rounded-xl w-[400px]"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Create Account
              </h2>

              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}

              <input
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 rounded bg-[#3a3a3a]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 rounded bg-[#3a3a3a]"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 rounded bg-[#3a3a3a]"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mb-6 px-4 py-2 rounded bg-[#3a3a3a]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-black rounded"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}