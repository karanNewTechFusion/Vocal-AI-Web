import { Medal, Activity, Mic } from 'lucide-react';

export default function Achievements() {
  const achievements = [
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
  ];

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
