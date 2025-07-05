// const RecordingCard = ({ recording, onDelete }) => {
//   const { title, url, pitchData, stability, projection, _id } = recording;

//   return (
//     <div className="bg-dark p-4 rounded-lg border border-gray-700 text-white shadow-md">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <audio controls className="w-full mt-2">
//         <source src={url} type="audio/mp3" />
//       </audio>

//       <div className="text-sm mt-3 space-y-1">
//         <p>Pitch: {Math.round(pitchData?.[0] || 0)}</p>
//         <p>Stability: {stability?.toFixed(2)}</p>
//         <p>Projection: {projection?.toFixed(2)} dB</p>
//       </div>

//       <div className="mt-4">
//         <button
//           onClick={() => onDelete(_id)}
//           className="w-full py-2 bg-red-600 rounded hover:bg-red-700 text-sm font-semibold"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecordingCard;


const RecordingCard = ({ recording, onDelete }) => {
  const { title, url, pitchData, stability, projection, _id } = recording;

  return (
    <div className="glass p-5 rounded-2xl border border-gray-700 shadow-xl hover:shadow-accent-pink/30 transition-all duration-300 text-white flex flex-col">
      <h3 className="text-lg font-bold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent mb-2">
        {title}
      </h3>

      <audio controls className="w-full mb-4">
        <source src={url} type="audio/mp3" />
      </audio>

      <div className="text-sm space-y-1 text-gray-300">
        <p>🎯 Pitch: <span className="text-white font-semibold">{Math.round(pitchData?.[0] || 0)}</span></p>
        <p>📈 Stability: <span className="text-white font-semibold">{stability?.toFixed(2)}</span></p>
        <p>🔊 Projection: <span className="text-white font-semibold">{projection?.toFixed(2)} dB</span></p>
      </div>

      <button
        onClick={() => onDelete(_id)}
        className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 font-semibold text-white transition-all duration-200"
      >
        Delete
      </button>
    </div>
  );
};
export default RecordingCard;