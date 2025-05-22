import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaHome, FaUsers } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { adminLogout } from "../redux/user/adminSlice";

function AdminNavbar() {
  const dispatch = useDispatch()


  return (
    <nav className="bg-gray-900 sticky top-0 z-50 text-white py-4 px-6 shadow-md flex items-center">
      {/* Left - Logo */}
      <Link to="/admin" className="text-2xl font-bold tracking-wide">
        Admin Panel
      </Link>

      {/* Spacer to push menu & profile to the right */}
      <div className="flex-grow"></div>

      {/* Center - Menu */}
      <ul className="flex space-x-8 text-lg">
        <li>
          <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-gray-400 transition">
            <FaHome className="text-xl" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/user-add" className="flex items-center gap-2 hover:text-gray-400 transition">
            <FaUsers className="text-xl" />
               Add User
          </Link>
        </li>
      </ul>

      {/* Right - User Profile & Logout */}
      <div className="relative group ml-8">
        <button className="flex items-center gap-2 hover:text-gray-400 transition">
          <FaUserCircle className="text-2xl" />
          <span className="font-medium">Admin</span>
        </button>
        
        {/* Dropdown Menu */}
        <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition duration-200">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;