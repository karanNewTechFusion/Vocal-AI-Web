// import Sidebar from "../components/Sidebar";
// import UserNavbar from "../components/UserNavbar";

// export default function Recordings() {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <UserNavbar />
//         <main className="flex-1 p-6 bg-[#0c0a15] overflow-auto">
//           <h2 className="text-2xl font-bold text-white mb-6">Recordings</h2>
//         </main>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import UserNavbar from "../components/UserNavbar";
import RecordingCard from "../components/practiceComponet/RecordingCard";
import { fetchUserRecordings, deleteRecording } from "../services/audio";

export default function Recordings() {
  const authState = useSelector((state) => state.auth);
  const user = authState?.currentUser;
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecordings = async () => {
    if (!user?._id) {
      console.warn("⚠️ No user ID found. Not fetching recordings.");
      setLoading(false); // stop spinner
      return;
    }

    console.log("📡 Hitting fetchUserRecordings API for:", user._id);
    try {
      const res = await fetchUserRecordings(user._id);
      console.log("✅ Recordings API response:", res);
      if (res.success) {
        setRecordings(res.data);
      } else {
        console.warn("❌ API returned unsuccessful:", res);
      }
    } catch (err) {
      console.error("❌ Failed to fetch recordings:", err);
    } finally {
      setLoading(false); // ensure spinner stops
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteRecording(id);
      if (res.success) {
        setRecordings((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  useEffect(() => {
    console.log("🧠 Redux user:", authState);
    if (user?._id) {
      loadRecordings();
    } else {
      console.warn("⚠️ User not ready yet in useEffect.");
    }
  }, [user]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <UserNavbar />
        <main className="flex-1 p-6 bg-[#0c0a15] overflow-auto text-white">
          <h2 className="text-2xl font-bold mb-6">Your Recordings</h2>

          {loading ? (
            <p>Loading...</p>
          ) : recordings.length === 0 ? (
            <p>No recordings found.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordings.map((rec) => {
                console.log("🎵 Rendering:", rec.title);
                return (
                  <RecordingCard key={rec._id} recording={rec} onDelete={handleDelete} />
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
