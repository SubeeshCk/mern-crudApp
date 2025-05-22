import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="bg-slate-900 sticky top-0 z-50 text-white shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-6">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Redux<span className="text-red-500">Crud</span>
        </Link>

        <ul className="flex items-center gap-6 text-lg">
          <li>
            <Link to="/" className="hover:text-red-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-red-400 transition duration-300"
            >
              About
            </Link>
          </li>

          <li>
            {currentUser ? (
              <Link to="/profile" className="flex items-center gap-3">
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-red-500"
                />
                <span className="hidden sm:inline-block font-medium">
                  {currentUser.username}
                </span>
              </Link>
            ) : (
              <Link
                to="/sign-in"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition duration-300"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
