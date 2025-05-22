import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [search, setSearch] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users.");
        navigate("/adminLogin");
        console.error(error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/admin/users/delete/${userId}`);
          setUsers(users.filter((user) => user._id !== userId));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          toast.error("Failed to delete user.");
          navigate("/adminLogin");
          console.error(error);
        }
      }
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ username: user.username, email: user.email });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/admin/users/${editingUser._id}`, formData);
      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? { ...user, ...formData } : user
        )
      );
      toast.success("User updated successfully!");
      setEditingUser(null);
    } catch (error) {
      toast.error("Failed to update user.");
      navigate("/adminLogin");
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800 mx-auto">
          👥 Users
        </h1>
        <a
          href="/admin/user-add"
          className="bg-green-600 hover:bg-green-700 text-white px-2 py-3 rounded-sm shadow-md transition-all"
        >
          ➕ Add User
        </a>
      </div>

      {/* Search input */}
      <div className="mb-4 flex justify-center">
        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 w-64 h-10">
          <Search className="text-gray-500" />
          <input
            type="text"
            className="ml-2 w-full bg-transparent text-gray-700 text-sm focus:outline-none"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <p className="text-gray-500 text-center">Loading users...</p>}

      {!loading && users.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-xl font-semibold text-gray-700">
                  User Name
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-xl font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-500 text-center">No users found.</p>
      )}

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Edit User</h2>
            <label className="text-gray-600 font-semibold">Name</label>
            <input
              type="text"
              className="w-full border p-3 mb-4 rounded-lg focus:ring focus:ring-blue-300"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="User Name"
            />
            <label className="text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border p-3 mb-4 rounded-lg focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;