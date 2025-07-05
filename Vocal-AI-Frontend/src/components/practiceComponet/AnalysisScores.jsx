// export default function AnalysisScores({ pitch, stability, articulation }) {
//   const ScoreCard = ({ label, value, color }) => (
//     <div className={`flex-1 bg-[#1e1c29] p-4 rounded-lg text-center border ${color} border-opacity-50`}>
//       <p className="text-sm text-gray-400">{label}</p>
//       <h3 className="text-2xl font-bold text-white">{value ?? 0}%</h3>
//     </div>
//   );

//   return (
//     <div className="flex gap-4">
//       <ScoreCard label="Pitch" value={pitch} color="border-accent-pink" />
//       <ScoreCard label="Stability" value={stability} color="border-accent-blue" />
//       <ScoreCard label="Articulation" value={articulation} color="border-accent-purple" />
//     </div>
//   );
// }


export default function AnalysisScores({ pitch, stability, articulation }) {
  const ScoreCard = ({ label, value, color }) => (
    <div className={`flex-1 p-4 rounded-xl border ${color} border-opacity-60 bg-[#1e1c29] text-center`}>
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="text-2xl font-bold text-white">{value ?? 0}%</h3>
    </div>
  );
  return (
    <div className="flex gap-4">
      <ScoreCard label="Pitch" value={pitch} color="border-accent-pink" />
      <ScoreCard label="Stability" value={stability} color="border-accent-blue" />
      <ScoreCard label="Articulation" value={articulation} color="border-accent-purple" />
    </div>
  );
}