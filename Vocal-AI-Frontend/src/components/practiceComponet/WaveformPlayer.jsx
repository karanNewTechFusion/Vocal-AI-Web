// export default function WaveformPlayer({ url }) {
//   return (
//     <div className="bg-[#1e1c29] p-4 rounded-lg shadow-md">
//       <audio controls className="w-full">
//         <source src={url} type="audio/webm" />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//   );
// }


export default function WaveformPlayer({ url }) {
  return (
    <div className="bg-[#1e1c29] p-4 rounded-xl border border-gray-700">
      <audio controls className="w-full">
        <source src={url} type="audio/webm" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}