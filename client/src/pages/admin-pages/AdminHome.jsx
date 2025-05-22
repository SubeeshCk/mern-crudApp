import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Admin Panel 🚀</h1>
      <p className="text-gray-700 mt-2 text-center">Manage users efficiently</p>

      {/* Quick Link to Manage Users */}
      <div className="mt-8">
        <Link to="/admin/dashboard">
          <QuickLink label="👥 Manage Users" />
        </Link>
      </div>

      {/* Motivational Quote */}
      <div className="mt-10 p-6 bg-white rounded-lg shadow-lg w-full max-w-xl text-center">
        <h2 className="text-lg font-semibold text-gray-800">📢 Daily Motivation</h2>
        <p className="text-gray-600 mt-2 italic">
          "The secret of success is to do the common things uncommonly well."
        </p>
      </div>
    </div>
  );
}

// Reusable Quick Link Component
const QuickLink = ({ label }) => (
  <div className="bg-white p-5 rounded-lg shadow-md text-center cursor-pointer 
      hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300">
    <p className="font-semibold">{label}</p>
  </div>
);

export default AdminHome;