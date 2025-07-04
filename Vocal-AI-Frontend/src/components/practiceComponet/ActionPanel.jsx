// export default function ActionPanel({ canAnalyze, canSave, onAnalyze, onSave, onReset }) {
//   return (
//     <div className="flex flex-wrap gap-4 justify-center">
//       <button
//         onClick={onAnalyze}
//         disabled={!canAnalyze}
//         className={`px-4 py-2 rounded-lg text-white ${
//           canAnalyze ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-700 cursor-not-allowed"
//         }`}
//       >
//         Analyze
//       </button>
//       <button
//         onClick={onSave}
//         disabled={!canSave}
//         className={`px-4 py-2 rounded-lg text-white ${
//           canSave ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 cursor-not-allowed"
//         }`}
//       >
//         Save
//       </button>
//       <button
//         onClick={onReset}
//         className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
//       >
//         Reset
//       </button>
//     </div>
//   );
// }
export default function ActionPanel({ canAnalyze, canSave, onAnalyze, onSave, onReset }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <button
        onClick={() => {
          console.log("🔍 Analyze button clicked");
          onAnalyze();
        }}
        disabled={!canAnalyze}
        className={`px-4 py-2 rounded-lg text-white ${
          canAnalyze ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        Analyze
      </button>

      <button
        onClick={() => {
          console.log("💾 Save button clicked. canSave:", canSave);
          onSave();
        }}
        disabled={!canSave}
        className={`px-4 py-2 rounded-lg text-white ${
          canSave ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        Save
      </button>

      <button
        onClick={() => {
          console.log("🔁 Reset button clicked");
          onReset();
        }}
        className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
      >
        Reset
      </button>
    </div>
  );
}
