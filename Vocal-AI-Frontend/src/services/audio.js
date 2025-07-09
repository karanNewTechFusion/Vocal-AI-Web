// services/audio.js
import API from './api';

// FormData upload for audio analysis (no save)
export const analyzeTempAudio = async (audioFile) => {
  const formData = new FormData();
  formData.append('audio', audioFile);

  const res = await API.post('/audio/analyze-temp', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// Final save with analysis
export const finalizeAndSaveAudio = async ({ audioFile, title, user_id }) => {
  const formData = new FormData();
  formData.append('audio', audioFile);
  formData.append('title', title);
  formData.append('user_id', user_id);

  const res = await API.post('/audio/save', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// Get all audios by a user
export const fetchUserRecordings = async (user_id) => {
  const res = await API.get(`/audio/user/${user_id  }`);
  return res.data;
};

export const deleteRecording = async (audioId) => {
  const res = await API.delete(`/audio/${audioId}`);
  return res.data;
};
// Download audio
export const downloadRecording = async (id) => {
  const res = await API.get(`/audio/download/${id}`, {
    responseType: 'blob', // Important for downloading files
  });
  return res.data;
};

// 📊 Dashboard Summary (progress tracking + distribution + skills)
export const fetchDashboardSummary = async () => {
  const res = await API.get('/audio/summary');
     console.log("🔥 API RAW summry:", res.data); // <-- Check structure
  return res.data.data; // You already unwrap in services
};

// 📅 Monthly progress (bar chart)
export const fetchMonthlyProgress = async () => {
  const res = await API.get('/audio/monthly');
     console.log("🔥 API RAW month:", res.data); // <-- Check structure
  return res.data.data;
};

// 📈 Pitch trend (line chart)
export const fetchPitchTrend = async () => {
  const res = await API.get('/audio/pitch-trend');
     console.log("🔥 API pitch :", res.data); // <-- Check structure
  return res.data.data;
};

// 🏅 Achievements
export const fetchUserAchievements = async () => {
  const res = await API.get('/audio/achievements');
    console.log("🔥 API RAW response:", res.data); // <-- Check structure
  return res.data.data;
};
