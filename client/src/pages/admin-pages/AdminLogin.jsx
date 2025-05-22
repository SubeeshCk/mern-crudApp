import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLoginFailure, adminLoginStart, adminLoginSuccess } from "../../redux/user/adminSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(adminLoginStart());
  
      const res = await fetch("/api/admin/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Login failed! ❌");
      }
      dispatch(adminLoginSuccess(data.admin))
      navigate('/admin')
      toast.success("Admin logged in successfully! ✅", { autoClose: 3000 });
    } catch (error) {
      console.error("Error:", error); 
      dispatch(adminLoginFailure())
      toast.error(error.message || "Sign in failed! ❌", { autoClose: 3000 });
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border p-2 rounded-md focus:outline-blue-500"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border p-2 rounded-md focus:outline-blue-500"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;