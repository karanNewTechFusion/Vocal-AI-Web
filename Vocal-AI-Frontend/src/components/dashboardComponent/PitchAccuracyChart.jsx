import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-01-01', value: 65 },
  { date: '2024-01-03', value: 68 },
  { date: '2024-01-05', value: 72 },
  { date: '2024-01-07', value: 75 },
  { date: '2024-01-09', value: 78 },
  { date: '2024-01-11', value: 82 },
  { date: '2024-01-15', value: 86 },
];

export default function PitchAccuracyChart() {
  return (
    <div className="bg-gradient-to-r from-[#2d235a] to-[#1a1b2e] p-6 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Pitch Accuracy Over Time</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
