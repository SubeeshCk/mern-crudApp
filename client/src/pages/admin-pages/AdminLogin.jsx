import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  adminLoginFailure,
  adminLoginStart,
  adminLoginSuccess,
} from "../../redux/user/adminSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(adminLoginSuccess(data.admin));
      navigate("/admin");
      toast.success("Admin logged in successfully! ✅", { autoClose: 3000 });
    } catch (error) {
      console.error("Error:", error);
      dispatch(adminLoginFailure());
      toast.error(error.message || "Sign in failed! ❌", { autoClose: 3000 });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
