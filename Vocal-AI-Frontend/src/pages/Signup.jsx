import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });

      navigate('/login');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <div className="bg-dark min-h-screen text-white font-sans">

      <Navbar />
      <div className="w-full h-screen bg-[#0c0a15] flex items-center justify-center px-4">
        <div className="bg-[#14121b] text-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-gray-800 backdrop-blur-md">

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            <button className="px-4 py-1.5 bg-white/10 rounded-full text-white font-semibold">
              Sign Up
            </button>
            <Link to="/login" className="px-4 py-1.5 text-gray-400 hover:text-white transition">
              Sign In
            </Link>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent mb-5">
            Create your account
          </h2>

          {/* Error */}
          {errorMsg && (
            <p className="text-sm text-red-500 text-center mb-4">{errorMsg}</p>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-xl text-white font-semibold shadow-md transition ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink hover:scale-105'
              }`}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-400">
            By creating an account, you agree to our{' '}
            <span className="text-accent-pink underline">Terms</span>.
          </p>
        </div>
      </div>
      </div>
    </>
  );
}
