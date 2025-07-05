// import { useState, useRef } from "react";
// import { Mic, StopCircle } from "lucide-react";

// export default function RecorderControls({ onRecordingComplete }) {
//   const [recording, setRecording] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const chunks = useRef([]);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorderRef.current = new MediaRecorder(stream);
//     mediaRecorderRef.current.ondataavailable = (e) => chunks.current.push(e.data);
//     mediaRecorderRef.current.onstop = () => {
//       const blob = new Blob(chunks.current, { type: "audio/webm" });
//       chunks.current = [];
//       onRecordingComplete(blob);
//     };
//     mediaRecorderRef.current.start();
//     setRecording(true);
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setRecording(false);
//   };

//   return (
//     <div className="flex items-center justify-center gap-4">
//       {!recording ? (
//         <button
//           onClick={startRecording}
//           className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition text-white flex items-center gap-2"
//         >
//           <Mic size={20} /> Start Recording
//         </button>
//       ) : (
//         <button
//           onClick={stopRecording}
//           className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition text-white flex items-center gap-2"
//         >
//           <StopCircle size={20} /> Stop Recording
//         </button>
//       )}
//     </div>
//   );
// // }
// import { useRef } from "react";
// import { Mic, StopCircle } from "lucide-react";

// export default function RecorderControls({ onRecordingComplete }) {
//   const [recording, setRecording] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const chunks = useRef([]);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorderRef.current = new MediaRecorder(stream);
//     mediaRecorderRef.current.ondataavailable = (e) => chunks.current.push(e.data);
//     mediaRecorderRef.current.onstop = () => {
//       const blob = new Blob(chunks.current, { type: "audio/webm" });
//       chunks.current = [];
//       onRecordingComplete(blob);
//     };
//     mediaRecorderRef.current.start();
//     setRecording(true);
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setRecording(false);
//   };

//   return (
//     <div className="flex items-center justify-center gap-4">
//       {!recording ? (
//         <button
//           onClick={startRecording}
//           className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transition flex items-center gap-2"
//         >
//           <Mic size={20} /> Start Recording
//         </button>
//       ) : (
//         <button
//           onClick={stopRecording}
//           className="px-6 py-2 rounded-xl font-semibold bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-2"
//         >
//           <StopCircle size={20} /> Stop Recording
//         </button>
//       )}
//     </div>
//   );
// }
import { useState, useRef } from "react";
import { Mic, StopCircle } from "lucide-react";

export default function RecorderControls({ onRecordingComplete }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => chunks.current.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        chunks.current = [];
        onRecordingComplete(blob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("🎤 Failed to access microphone:", error);
      alert("Microphone access denied or unavailable. Please allow mic permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {!recording ? (
        <button
          onClick={startRecording}
          className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transition flex items-center gap-2 shadow-md"
        >
          <Mic size={20} /> Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-pink-600 text-white hover:scale-105 transition flex items-center gap-2 shadow-md"
        >
          <StopCircle size={20} /> Stop Recording
        </button>
      )}
    </div>
  );
}
