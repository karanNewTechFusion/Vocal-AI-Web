export default function UserNavbar() {
  return (
    <nav className="h-16 w-full bg-[#0c0a15] text-white px-6 flex items-center justify-between border-b border-gray-800">
      <h1 className="text-xl font-semibold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
        Dashboard
      </h1>
      <div className="text-sm text-gray-400">Welcome</div>
    </nav>
  );
}
