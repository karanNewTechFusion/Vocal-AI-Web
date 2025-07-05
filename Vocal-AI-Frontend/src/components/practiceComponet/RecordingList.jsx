// src/components/RecordingList.jsx
import React from "react";

export default function RecordingList({ recordings }) {
  if (!recordings || recordings.length === 0) {
    return <p className="text-white">No recordings found.</p>;
  }

  return (
    <div className="grid gap-4">
      {recordings.map((rec) => (
        <div key={rec._id} className="bg-[#1a1729] p-4 rounded-xl shadow-md">
          <h3 className="text-white font-bold text-lg">{rec.title}</h3>
          <p className="text-sm text-gray-400 mb-2">
            Stability: {rec.stability.toFixed(2)} | Projection: {rec.projection} dB
          </p>
          <audio controls className="w-full">
            <source src={rec.url} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
}
