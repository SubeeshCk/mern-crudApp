import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaHome, FaUsers } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../redux/user/adminSlice";

function AdminNavbar() {
  const dispatch = useDispatch();
  const { currentAdmin } = useSelector(state => state.admin);

  const handleAdminLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/backend/admin/logout");
      if (res.status === 200) {
        toast.success("Logout Success");
        dispatch(adminLogout());
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="bg-gray-900 sticky top-0 z-50 text-white py-4 px-6 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/admin" className="text-2xl font-bold tracking-wide hover:text-gray-300 transition">
          Admin Panel
        </Link>

        {/* Navigation Items - Only show when admin is logged in */}
        {currentAdmin && (
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <ul className="flex space-x-8 text-lg">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 hover:text-gray-300 transition duration-200"
                >
                  <FaHome className="text-xl" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/user-add"
                  className="flex items-center gap-2 hover:text-gray-300 transition duration-200"
                >
                  <FaUsers className="text-xl" />
                  Add User
                </Link>
              </li>
            </ul>

            {/* Admin Profile Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-2 hover:text-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
                aria-label="Admin menu"
              >
                <FaUserCircle className="text-2xl" />
                <span className="font-medium">
                  {currentAdmin.name || currentAdmin.username || 'Admin'}
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-200 z-10">
                <div className="py-1">
                  <button
                    onClick={handleAdminLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition duration-150"
                  >
                    <FaSignOutAlt className="text-lg text-red-500" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default AdminNavbar;