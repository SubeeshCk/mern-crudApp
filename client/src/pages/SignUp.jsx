import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OAuth from '../components/OAuth';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  console.log(error);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed! ❌');
      }
      toast.success('Account created successfully! 🎉', { autoClose: 3000 });
      navigate('/sign-in')
    } catch (error) {
      setError(error.message);
      toast.error(error.message || 'Signup failed! ❌', { autoClose: 3000 });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="border p-2 rounded-md focus:outline-blue-500"
            required
            onChange={handleChange}
          />

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
            disabled={loading}
            type="submit"
            className={`py-2 rounded-md font-medium text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        <div className="my-3 text-center text-gray-500">or</div>

        <OAuth />

        <p className="text-center text-sm mt-3">
          Already have an account?
          <a href="/sign-in" className="text-blue-500 hover:underline ml-1">Sign In</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;