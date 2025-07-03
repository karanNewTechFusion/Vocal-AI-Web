
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess } from '../redux/slices/authSlice';
import Navbar from '../components/Navbar';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { user, token } = res.data;

      dispatch(loginSuccess({ user, token }));

      rememberMe
        ? localStorage.setItem('token', token)
        : sessionStorage.setItem('token', token);

      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
    // Integration logic will go here (e.g., Firebase or OAuth)
  };

  return (
    <>
    <div className="bg-dark min-h-screen text-white font-sans">
      <Navbar />
      <div className="w-full h-screen bg-[#0c0a15] flex items-center justify-center px-4">
        <div className="bg-[#14121b] text-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-gray-800 backdrop-blur-md">
          
          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            <Link to="/signup" className="px-4 py-1.5 text-gray-400 hover:text-white transition">
              Sign Up
            </Link>
            <button className="px-4 py-1.5 bg-white/10 rounded-full text-white font-semibold">
              Sign In
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent mb-5">
            Welcome back
          </h2>

          {/* Error */}
          {errorMsg && (
            <p className="text-sm text-red-500 text-center mb-4">{errorMsg}</p>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox bg-dark border-gray-700 rounded"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-accent-pink hover:underline">
                Forgot Password?
              </Link>
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <p className="text-sm text-center text-gray-400 mb-2">Or sign in with</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="p-2.5 bg-white text-black rounded-full hover:scale-105 transition shadow-md"
              >
                <FcGoogle size={20} />
              </button>
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="p-2.5 bg-[#3b5998] text-white rounded-full hover:scale-105 transition shadow-md"
              >
                <FaFacebookF size={18} />
              </button>
              <button
                onClick={() => handleSocialLogin('Apple')}
                className="p-2.5 bg-black text-white rounded-full hover:scale-105 transition shadow-md"
              >
                <FaApple size={20} />
              </button>
            </div>
          </div>

          <div className="mt-5 text-sm text-center">
            <span className="text-gray-400">Don’t have an account? </span>
            <Link to="/signup" className="text-accent-pink hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
