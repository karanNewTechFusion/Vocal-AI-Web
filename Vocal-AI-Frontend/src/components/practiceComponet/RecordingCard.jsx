const RecordingCard = ({ recording, onDelete }) => {
  const { title, url, pitchData, stability, projection, _id } = recording;

  return (
    <div className="bg-dark p-4 rounded-lg border border-gray-700 text-white shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <audio controls className="w-full mt-2">
        <source src={url} type="audio/mp3" />
      </audio>

      <div className="text-sm mt-3 space-y-1">
        <p>Pitch: {Math.round(pitchData?.[0] || 0)}</p>
        <p>Stability: {stability?.toFixed(2)}</p>
        <p>Projection: {projection?.toFixed(2)} dB</p>
      </div>

      <div className="flex gap-3 mt-4">
        <a
          href={url}
          download
          className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
        >
          Download
        </a>
        <button
          onClick={() => onDelete(_id)}
          className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecordingCard;
