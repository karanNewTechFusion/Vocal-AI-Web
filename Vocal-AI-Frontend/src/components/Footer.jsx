import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: 'Product',
    links: [
      { name: 'What’s New', path: '/whats-new' },
      { name: 'Design', path: '/design' },
      { name: 'Collaboration', path: '/collaboration' },
      { name: 'Prototyping', path: '/prototyping' },
      { name: 'Developer Handoff', path: '/handoff' },
      { name: 'All Features', path: '/features' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Download and Install', path: '/download' },
      { name: 'Help Center', path: '/help' },
      { name: 'Support Community', path: '/community' },
      { name: 'Enterprise Support', path: '/enterprise' },
      { name: 'Documentation', path: '/docs' },
      { name: 'Community Forum', path: '/forum' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Our Blog', path: '/blog' },
      { name: 'Extensions & Plugins', path: '/extensions' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Roadmap', path: '/roadmap' },
      { name: 'Free for Education', path: '/education' },
      { name: 'Newsletter', path: '/newsletter' },
    ],
  },
  {
    title: 'About',
    links: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Events', path: '/events' },
      { name: 'Partners', path: '/partners' },
      { name: 'Security', path: '/security' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c0a15] text-white pt-16 pb-8 px-6 md:px-20 relative border-t border-gray-800">
      {/* Footer Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {footerColumns.map((col, idx) => (
          <div key={idx}>
            <h3 className="text-sm text-accent-pink font-semibold mb-4">// {col.title}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {col.links.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-8"></div>

      {/* Newsletter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1">Never miss an update</h4>
          <p className="text-sm text-gray-400 max-w-md">
            Get the latest updates from <span className="text-accent-purple">VocalAI</span>. No spam, we promise.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="email"
            placeholder="example@gmail.com"
            className="px-4 py-2 rounded-lg bg-dark border border-gray-700 text-white w-full sm:w-auto focus:outline-none focus:border-accent-pink"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Join
          </button>
        </form>
      </div>

      {/* Consent Checkbox */}
      <div className="mt-4">
        <label className="flex items-center space-x-2 text-sm text-gray-400">
          <input type="checkbox" className="accent-accent-pink" />
          <span>I agree to receive marketing emails from VocalAI</span>
        </label>
      </div>

      {/* Bottom Footer */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 border-t border-gray-800 pt-6">
        <span>&copy; {new Date().getFullYear()} VocalAI. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
