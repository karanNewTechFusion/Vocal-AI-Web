import Sidebar from "../components/Sidebar";
import UserNavbar from "../components/UserNavbar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <UserNavbar />

        <main className="flex-1 p-6 bg-[#0c0a15] overflow-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-[#14121b] border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-accent-purple/40 transition">
              <h3 className="text-sm text-gray-400 mb-1">Users</h3>
              <p className="text-2xl font-bold text-white">1,245</p>
            </div>
            <div className="bg-[#14121b] border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-accent-blue/40 transition">
              <h3 className="text-sm text-gray-400 mb-1">AI Queries</h3>
              <p className="text-2xl font-bold text-white">38,972</p>
            </div>
            <div className="bg-[#14121b] border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-accent-pink/40 transition">
              <h3 className="text-sm text-gray-400 mb-1">Revenue</h3>
              <p className="text-2xl font-bold text-white">₹9,872</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
