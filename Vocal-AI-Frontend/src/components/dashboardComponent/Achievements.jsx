// import { Medal, Activity, Mic } from 'lucide-react';

// export default function Achievements() {
//   const achievements = [
//     {
//       title: 'Pitch Perfect',
//       description: 'Achieved 90%+ pitch accuracy',
//       icon: <Medal size={20} className="text-yellow-400" />, 
//       bg: 'bg-gradient-to-r from-[#2d235a] to-[#2b2c3f]'
//     },
//     {
//       title: 'Consistent Performer',
//       description: '7-day practice streak',
//       icon: <Activity size={20} className="text-cyan-400" />, 
//       bg: 'bg-gradient-to-r from-[#2d235a] to-[#2b2c3f]'
//     },
//     {
//       title: 'Vocal Master',
//       description: 'Completed 25 sessions',
//       icon: <Mic size={20} className="text-pink-400" />, 
//       bg: 'bg-gradient-to-r from-[#2d235a] to-[#2b2c3f]'
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-r from-[#2d235a] to-[#1a1b2e] p-6 rounded-xl shadow-md text-white">
//       <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
//       <div className="flex flex-col sm:flex-row gap-4">
//         {achievements.map((item, idx) => (
//           <div
//             key={idx}
//             className={`flex items-center gap-4 p-4 rounded-lg ${item.bg} w-full`}
//           >
//             <div className="bg-white/10 rounded-full p-2">
//               {item.icon}
//             </div>
//             <div>
//               <p className="font-semibold text-sm">{item.title}</p>
//               <p className="text-xs text-gray-400">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { Medal, Activity, Mic } from "lucide-react";
// import { fetchUserAchievements } from "../../services/audio";

// const ICONS = {
//   medal: <Medal size={20} className="text-yellow-400" />,
//   activity: <Activity size={20} className="text-cyan-400" />,
//   mic: <Mic size={20} className="text-pink-400" />,
// };

// export default function Achievements() {
//   const [achievements, setAchievements] = useState([]);

//   useEffect(() => {
//     const loadAchievements = async () => {
//       try {
//         const data = await fetchUserAchievements();
//         setAchievements(data);
//       } catch (err) {
//         console.error("Error loading achievements:", err);
//       }
//     };
//     loadAchievements();
//   }, []);

//   return (
//     <div className="bg-gradient-to-r from-[#2d235a] to-[#1a1b2e] p-6 rounded-xl shadow-md text-white">
//       <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
//       <div className="flex flex-col sm:flex-row gap-4">
//         {achievements.map((item, idx) => (
//           <div
//             key={idx}
//             className={`flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-[#2d235a] to-[#2b2c3f] w-full`}
//           >
//             <div className="bg-white/10 rounded-full p-2">
//               {ICONS[item.icon] || <Medal />}
//             </div>
//             <div>
//               <p className="font-semibold text-sm">{item.title}</p>
//               <p className="text-xs text-gray-400">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }











import { useEffect, useState } from 'react';
import { Medal, Activity, Mic } from 'lucide-react';
import { fetchUserAchievements } from '../../services/audio';

export default function Achievements() {
  const [achievements, setAchievements] = useState([
    // fallback in case API fails
    {
      title: 'Pitch Perfect',
      description: 'Achieved 90%+ pitch accuracy',
      icon: <Medal size={20} className="text-yellow-400" />,
      bg: 'bg-gradient-to-r from-[#2d235a] to-[#2b2c3f]'
    },
    {
      title: 'Consistent Performer',
      description: '7-day practice streak',
      icon: <Activity size={20} className="text-cyan-400" />,
      bg: 'bg-gradient-to-r from-[#2d235a] to-[#2b2c3f]'
    },
    {
      title: 'Vocal Master',
      description: 'Completed 25 sessions',
      icon: <Mic size={20} className="text-pink-400" />,
      bg: 'bg-gradient-to-r from-[#2d235a] to-[#2b2c3f]'
    }
  ]);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const data = await fetchUserAchievements(); // must return array of { title, description, icon }
        const iconMap = {
          medal: <Medal size={20} className="text-yellow-400" />,
          activity: <Activity size={20} className="text-cyan-400" />,
          mic: <Mic size={20} className="text-pink-400" />
        };

        const enhanced = data.map((item) => ({
          ...item,
          icon: iconMap[item.icon] || <Medal size={20} />,
          bg: 'bg-gradient-to-r from-[#2d235a] to-[#2b2c3f]'
        }));

        setAchievements(enhanced);
      } catch (err) {
        console.error("❌ Failed to load achievements:", err);
      }
    };

    loadAchievements();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#2d235a] to-[#1a1b2e] p-6 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-4 rounded-lg ${item.bg} w-full`}
          >
            <div className="bg-white/10 rounded-full p-2">
              {item.icon}
            </div>
            <div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
