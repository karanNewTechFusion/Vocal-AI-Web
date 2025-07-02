import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  return (
    <>
    <Navbar/>
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

        {/* Form */}
        <form className="space-y-3">
          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm" />
          <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-semibold shadow-md hover:scale-105 transition">
            Sign In
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          <span className="text-gray-400">Don’t have an account? </span>
          <Link to="/signup" className="text-accent-pink hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
        </>

  );
}
