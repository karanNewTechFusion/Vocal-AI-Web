import Sidebar from "../components/Sidebar";
import UserNavbar from "../components/UserNavbar";

export default function Subscription() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <UserNavbar />
        <main className="flex-1 p-6 bg-[#0c0a15] overflow-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Subscription</h2>
        </main>
      </div>
    </div>
  );
}
