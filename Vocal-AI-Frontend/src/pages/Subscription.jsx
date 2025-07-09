import Sidebar from "../components/Sidebar";
import UserNavbar from "../components/UserNavbar";
import PricingSection from "../components/PricingSection"; // Make sure the path is correct

export default function Subscription() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <UserNavbar />
        <main className="flex-1 overflow-auto bg-[#0c0a15] text-white">
          <PricingSection />
        </main>
      </div>
    </div>
  );
  
}
