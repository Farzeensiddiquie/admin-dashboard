import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { saveToken } from "../utils/token";

import AdminNav from "../components/AdminNav";
import SideBar from "../components/SideBar";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const res = await loginUser(formData);

      saveToken(res.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}

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
                className="w-full mb-6 px-4 py-2 rounded bg-[#3a3a3a]"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-black rounded"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}