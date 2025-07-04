import { useState, useRef } from "react";
import { Mic, StopCircle } from "lucide-react";

export default function RecorderControls({ onRecordingComplete }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
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
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {!recording ? (
        <button
          onClick={startRecording}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition text-white flex items-center gap-2"
        >
          <Mic size={20} /> Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition text-white flex items-center gap-2"
        >
          <StopCircle size={20} /> Stop Recording
        </button>
      )}
    </div>
  );
}
