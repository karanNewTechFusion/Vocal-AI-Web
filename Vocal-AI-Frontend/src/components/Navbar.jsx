import { useState } from 'react';

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthClick = (e) => {
    e.preventDefault();
    setShowAuthModal(true);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-dark/80 glass fixed w-full z-50">
        <div className="flex items-center">
          {/* Replace with your logo SVG or image */}
          <span className="text-2xl font-bold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">VocalAI</span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="hover:text-accent-pink transition">{link.name}</a>
          ))}
        </div>
        <a href="#trial" onClick={handleAuthClick} className="hidden md:inline-block ml-6 px-6 py-2 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink neon text-white font-semibold shadow-lg hover:scale-105 transition">Start Free Trial</a>
        {/* Hamburger for Mobile - now at the end */}
        <div className="md:hidden">
          <button
            className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-dark/70 hover:bg-dark/90 transition"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Open menu"
          >
            <span className={`block w-6 h-0.5 bg-accent-pink mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-accent-blue mb-1 transition-all duration-300 ${menuOpen ? '' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-accent-purple transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="fixed inset-0 top-16 bg-dark z-40 flex flex-col items-center justify-start pt-12 animate-fade-in">
            <div className=" backdrop-blur-xl bg-dark  w-full mx-auto rounded-2xl shadow-2xl p-6 flex flex-col items-center space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold text-white hover:text-accent-pink transition px-6 py-3 rounded-xl w-full text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#trial"
                onClick={handleAuthClick}
                className="mt-2 px-8 py-3 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink neon text-white font-bold text-lg shadow-lg hover:scale-105 transition w-full text-center"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
                {isLogin ? 'Login' : 'Sign Up'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-dark/60 border border-gray-700 text-white focus:outline-none focus:border-accent-pink transition"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-dark/60 border border-gray-700 text-white focus:outline-none focus:border-accent-pink transition"
                  placeholder="Enter your password"
                />
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl bg-dark/60 border border-gray-700 text-white focus:outline-none focus:border-accent-pink transition"
                    placeholder="Confirm your password"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold shadow-lg hover:scale-105 transition"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent-pink hover:text-accent-blue transition"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 