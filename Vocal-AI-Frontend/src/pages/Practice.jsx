

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import RecorderControls from "../components/practiceComponet/RecorderControls";
// import WaveformPlayer from "../components/practiceComponet/WaveformPlayer";
// import AnalysisScores from "../components/practiceComponet/AnalysisScores";
// import AIReview from "../components/practiceComponet/AIReview";
// import ActionPanel from "../components/practiceComponet/ActionPanel";
// import Sidebar from "../components/Sidebar";
// import UserNavbar from "../components/UserNavbar";
// import { analyzeTempAudio, finalizeAndSaveAudio } from "../services/audio";

// export default function Practice() {
//   const user = useSelector((state) => state.auth.currentUser);

//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [title] = useState("Recording " + new Date().toLocaleDateString());

//   const [pitch, setPitch] = useState(null);
//   const [stability, setStability] = useState(null);
//   const [articulation, setArticulation] = useState(null);
//   const [feedbackAudioUrl, setFeedbackAudioUrl] = useState(null);

//   const handleRecordingComplete = (blob) => {
//     setAudioBlob(blob);
//     setAudioUrl(URL.createObjectURL(blob));
//     setFeedbackAudioUrl(null);
//   };

//   const resetSession = () => {
//     setAudioBlob(null);
//     setAudioUrl(null);
//     setFeedbackAudioUrl(null);
//     setPitch(null);
//     setStability(null);
//     setArticulation(null);
//   };

//   // const handleAnalyze = async () => {
//   //   if (!audioBlob) return;
//   //   try {
//   //     const data = await analyzeTempAudio(audioBlob);
//   //     if (!data.success) throw new Error(data.message);

//   //     setPitch(data.data.pitchData?.[0] || 0);
//   //     setStability(data.data.stability);
//   //     setArticulation(80); // Placeholder for now

//   //     const feedbackBlob = new Blob(
//   //       [Uint8Array.from(atob(data.data.voiceFeedback), (c) => c.charCodeAt(0))],
//   //       { type: "audio/mp3" }
//   //     );
//   //     setFeedbackAudioUrl(URL.createObjectURL(feedbackBlob));
//   //   } catch (err) {
//   //     console.error("Analysis failed:", err.message);
//   //   }
//   // };







// const handleAnalyze = async () => {
//   if (!audioBlob) return;
//   try {
//     const data = await analyzeTempAudio(audioBlob);
//     if (!data.success) throw new Error(data.message);

//     setPitch(data.data.pitchData?.[0] || 0);
//     setStability(data.data.stability);
//     setArticulation(80); // placeholder

//     // 🛡️ Decode first to check if it's a JSON error
//     const decodedString = atob(data.data.voiceFeedback);
//     try {
//       const json = JSON.parse(decodedString);
//       // If parsing succeeds, it's not valid audio — it's an error
//       console.error("TTS Error JSON:", json);
//       throw new Error(json.detail?.message || "TTS failed");
//     } catch {
//       // ✅ Not JSON, so it's probably valid audio
//       const feedbackBlob = new Blob(
//         [Uint8Array.from(decodedString, (c) => c.charCodeAt(0))],
//         { type: "audio/mp3" }
//       );
//       setFeedbackAudioUrl(URL.createObjectURL(feedbackBlob));
//     }

//   } catch (err) {
//     console.error("Analysis failed:", err.message);
//   }
// };

// const handleSave = async () => {
//   console.log("📤 handleSave called", { audioBlob, user });

//   if (!audioBlob || !user?._id) {
//     console.warn("⚠️ Missing audioBlob or user._id", { audioBlob, user });
//     return;
//   }

//   try {
//     const data = await finalizeAndSaveAudio({
//       audioFile: audioBlob,
//       title,
//       user_id: user._id,
//     });
//     console.log("✅ Save API response:", data);

//     if (!data.success) throw new Error(data.message);
//   } catch (err) {
//     console.error("❌ Save failed:", err.message);
//   }
// };


//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <UserNavbar />
//         <main className="flex-1 p-6 bg-[#0c0a15] overflow-auto text-white">
//           <div className="max-w-3xl mx-auto bg-[#14121b] rounded-xl p-6 space-y-6 shadow-lg">
//             <h1 className="text-xl font-semibold text-white mb-2">Practice Session</h1>
//             <RecorderControls onRecordingComplete={handleRecordingComplete} />
//             {audioUrl && <WaveformPlayer url={audioUrl} />}
//             <AnalysisScores pitch={pitch} stability={stability} articulation={articulation} />
//             {feedbackAudioUrl && <AIReview audioUrl={feedbackAudioUrl} />}
//             <ActionPanel
//               canAnalyze={!!audioBlob}
//               canSave={!!audioBlob && !!feedbackAudioUrl}
//               onAnalyze={handleAnalyze}
//               onSave={handleSave}
//               onReset={resetSession}
//             />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }










import { useState } from "react";
import { useSelector } from "react-redux";
import RecorderControls from "../components/practiceComponet/RecorderControls";
import WaveformPlayer from "../components/practiceComponet/WaveformPlayer";
import AnalysisScores from "../components/practiceComponet/AnalysisScores";
import AIReview from "../components/practiceComponet/AIReview";
import ActionPanel from "../components/practiceComponet/ActionPanel";
import Sidebar from "../components/Sidebar";
import UserNavbar from "../components/UserNavbar";
import { analyzeTempAudio, finalizeAndSaveAudio } from "../services/audio";

export default function Practice() {
  const user = useSelector((state) => state.auth.currentUser);

  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [title] = useState("Recording " + new Date().toLocaleDateString());
  const [pitch, setPitch] = useState(null);
  const [stability, setStability] = useState(null);
  const [articulation, setArticulation] = useState(null);
  const [feedbackAudioUrl, setFeedbackAudioUrl] = useState(null);

  const handleRecordingComplete = (blob) => {
    setAudioBlob(blob);
    setAudioUrl(URL.createObjectURL(blob));
    setFeedbackAudioUrl(null);
  };

  const resetSession = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setFeedbackAudioUrl(null);
    setPitch(null);
    setStability(null);
    setArticulation(null);
  };

  const handleAnalyze = async () => {
    if (!audioBlob) return;
    try {
      const data = await analyzeTempAudio(audioBlob);
      if (!data.success) throw new Error(data.message);

      setPitch(data.data.pitchData?.[0] || 0);
      setStability(data.data.stability);
      setArticulation(80); // placeholder

      const decodedString = atob(data.data.voiceFeedback);
      try {
        const json = JSON.parse(decodedString);
        throw new Error(json.detail?.message || "TTS failed");
      } catch {
        const feedbackBlob = new Blob([
          Uint8Array.from(decodedString, (c) => c.charCodeAt(0))
        ], { type: "audio/mp3" });
        setFeedbackAudioUrl(URL.createObjectURL(feedbackBlob));
      }
    } catch (err) {
      console.error("Analysis failed:", err.message);
    }
  };

  const handleSave = async () => {
    if (!audioBlob || !user?._id) return;
    try {
      const data = await finalizeAndSaveAudio({
        audioFile: audioBlob,
        title,
        user_id: user._id,
      });
      if (!data.success) throw new Error(data.message);
    } catch (err) {
      console.error("❌ Save failed:", err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <UserNavbar />
        <main className="flex-1 p-6 bg-[#0c0a15] overflow-auto text-white">
          <div className="max-w-3xl mx-auto glass p-6 rounded-2xl space-y-6 shadow-xl border border-gray-800">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">Practice Session</h1>
            <RecorderControls onRecordingComplete={handleRecordingComplete} />
            {audioUrl && <WaveformPlayer url={audioUrl} />}
            <AnalysisScores pitch={pitch} stability={stability} articulation={articulation} />
            {feedbackAudioUrl && <AIReview audioUrl={feedbackAudioUrl} />}
            <ActionPanel
              canAnalyze={!!audioBlob}
              canSave={!!audioBlob && !!feedbackAudioUrl}
              onAnalyze={handleAnalyze}
              onSave={handleSave}
              onReset={resetSession}
            />
          </div>
        </main>
      </div>
    </div>
  );
}