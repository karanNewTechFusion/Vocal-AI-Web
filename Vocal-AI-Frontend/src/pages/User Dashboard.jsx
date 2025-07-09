
import Sidebar from "../components/Sidebar";
import UserNavbar from "../components/UserNavbar";
import Achievements from "../components/dashboardComponent/Achievements";
import PracticeDistribution from "../components/dashboardComponent/PracticeDistribution";
import MonthlyProgress from "../components/dashboardComponent/MonthlyProgress";
import PitchAccuracyChart from "../components/dashboardComponent/PitchAccuracyChart";
import SkillsVsGoalsChart from "../components/dashboardComponent/SkillsVsGoalsChart";
import ProgressTracking from "../components/dashboardComponent/ProgressTracking";


export default function UserDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <UserNavbar />

        <main className="flex-1 p-6 bg-[#0c0a15] overflow-auto space-y-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-white">Overview</h2>

         {/* Progress Tracking Section */}
          <ProgressTracking />

          {/* Charts: Practice Distribution + Monthly Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PracticeDistribution />
            <MonthlyProgress />
          </div>

          {/* Charts: Pitch Accuracy + Skills vs Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PitchAccuracyChart />
            <SkillsVsGoalsChart />
          </div>


          {/* Achievements Section */}
          <Achievements />

         
        </main>
      </div>
    </div>
  );
}
