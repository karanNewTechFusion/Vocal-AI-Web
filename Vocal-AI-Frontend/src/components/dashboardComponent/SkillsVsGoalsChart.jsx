import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

const data = [
  { skill: 'Pitch', score: 0.9 },
  { skill: 'Stability', score: 0.8 },
  { skill: 'Articulation', score: 0.7 },
  { skill: 'Projection', score: 0.6 },
];

export default function SkillsVsGoalsChart() {
  return (
    <div className="bg-gradient-to-r from-[#2d235a] to-[#1a1b2e] p-6 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Skills vs Goals</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={90} data={data}>
            <PolarGrid stroke="#444" />
            <PolarAngleAxis dataKey="skill" stroke="#aaa" />
            <Radar name="Goal" dataKey="score" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
