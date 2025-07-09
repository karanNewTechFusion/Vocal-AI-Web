// import { TrendingUp, Calendar, Award, Target } from 'lucide-react';

// const metrics = [
//   {
//     title: 'Improvement Rate',
//     value: '+23%',
//     subtext: '↑ This month',
//     icon: <TrendingUp size={20} className="text-cyan-400" />, 
//   },
//   {
//     title: 'Sessions This Month',
//     value: '18',
//     subtext: '+6 vs last month',
//     icon: <Calendar size={20} className="text-pink-400" />,
//   },
//   {
//     title: 'Best Score',
//     value: '94%',
//     subtext: 'Personal record',
//     icon: <Award size={20} className="text-pink-400" />,
//   },
//   {
//     title: 'Goals Achieved',
//     value: '3/5',
//     subtext: '2 remaining',
//     icon: <Target size={20} className="text-orange-400" />,
//   },
// ];

// export default function ProgressTracking() {
//   return (
//     <div className="bg-gradient-to-r from-[#2d235a] to-[#1a1b2e] p-6 rounded-xl shadow-md text-white">
//       <h2 className="text-xl font-semibold mb-4">Progress Tracking</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         {metrics.map((item, idx) => (
//           <div key={idx} className="flex items-center justify-between bg-[#1f1b36] p-4 rounded-lg shadow">
//             <div>
//               <p className="text-sm text-gray-400">{item.title}</p>
//               <p className="text-2xl font-bold">{item.value}</p>
//               <p className="text-xs text-green-400">{item.subtext}</p>
//             </div>
//             <div className="bg-white/10 p-2 rounded-full">
//               {item.icon}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { TrendingUp, Calendar, Award, Target } from "lucide-react";
import { fetchDashboardSummary } from "../../services/audio";

export default function ProgressTracking() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDashboardSummary();

        const mapped = [
          {
            title: "Improvement Rate",
            value: `${Math.round(data.improvementRate * 100)}%`,
            subtext: "↑ This month",
            icon: <TrendingUp size={20} className="text-cyan-400" />,
          },
          {
            title: "Sessions This Month",
            value: data.sessionsThisMonth,
            subtext: "+ compared to last",
            icon: <Calendar size={20} className="text-pink-400" />,
          },
          {
            title: "Best Score",
            value: `${data.bestScore}%`,
            subtext: "Personal record",
            icon: <Award size={20} className="text-pink-400" />,
          },
          {
            title: "Goals Achieved",
            value: `${data.goalsAchieved}/${data.totalGoals}`,
            subtext: `${data.totalGoals - data.goalsAchieved} remaining`,
            icon: <Target size={20} className="text-orange-400" />,
          },
        ];

        setMetrics(mapped);
      } catch (err) {
        console.error("Error loading summary:", err);
      }
    };

    load();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#2d235a] to-[#1a1b2e] p-6 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Progress Tracking</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between bg-[#1f1b36] p-4 rounded-lg shadow">
            <div>
              <p className="text-sm text-gray-400">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs text-green-400">{item.subtext}</p>
            </div>
            <div className="bg-white/10 p-2 rounded-full">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
