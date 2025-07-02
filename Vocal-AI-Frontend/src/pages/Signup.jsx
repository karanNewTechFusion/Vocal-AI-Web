import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  return (<>
  <Navbar/>
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

        {/* Form */}
        <form className="space-y-3">
          <div className="flex gap-3">
            <input type="text" placeholder="First name" className="w-1/2 px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm" />
            <input type="text" placeholder="Last name" className="w-1/2 px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm" />
          </div>
          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 placeholder-gray-400 text-sm" />
          <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-semibold shadow-md hover:scale-105 transition">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-gray-400">
          By creating an account, you agree to our <span className="text-accent-pink underline">Terms</span>.
        </p>
      </div>
    </div>
    </>
  );
}
