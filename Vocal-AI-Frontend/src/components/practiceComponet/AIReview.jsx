// export default function AIReview({ audioUrl }) {
//   return (
//     <div className="bg-[#1e1c29] p-4 rounded-lg">
//       <h3 className="text-white text-md font-semibold mb-2">AI Voice Feedback</h3>
//       <audio controls className="w-full">
//         <source src={audioUrl} type="audio/mp3" />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//   );
// }


export default function AIReview({ audioUrl }) {
  return (
    <div className="bg-[#1e1c29] p-4 rounded-xl border border-gray-700">
      <h3 className="text-white text-md font-semibold mb-2">AI Voice Feedback</h3>
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
