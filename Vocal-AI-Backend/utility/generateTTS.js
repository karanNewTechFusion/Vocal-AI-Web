// import axios from "axios";
// import fs from "fs";
// import dotenv from "dotenv";
// dotenv.config();

// const API_KEY = process.env.ELEVENLABS_API_KEY;
// const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel (default)

// export const generateFeedbackTTS = async (text, outputPath = "feedback.mp3") => {
//   try {
//     const response = await axios.post(
//       `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
//       {
//         text,
//         model_id: "eleven_monolingual_v1",
//         voice_settings: {
//           stability: 0.5,
//           similarity_boost: 0.5,
//         },
//       },
//       {
//         headers: {
//           "xi-api-key": API_KEY,
//           "Content-Type": "application/json",
//           Accept: "audio/mpeg",
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     fs.writeFileSync(outputPath, response.data);
//     console.log("✅ Feedback voice saved to:", outputPath);
//     return outputPath;
//   } catch (err) {
//     console.error("❌ TTS Error:", err.response?.data || err.message);
//     return null;
//   }
// };

import axios from "axios";
 import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.ELEVENLABS_API_KEY;
const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel (default)

export const generateFeedbackTTS = async (text, outputPath = "feedback.mp3") => {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        responseType: "arraybuffer",
      }
    );

    // 🧠 Try to decode as JSON first to detect error
    const asString = Buffer.from(response.data).toString("utf-8");

    try {
      const errorJson = JSON.parse(asString);
      console.error("❌ TTS API returned JSON error:", errorJson);
      return null;
    } catch {
      // ✅ Not JSON, write as audio
      fs.writeFileSync(outputPath, response.data);
      console.log("✅ Feedback voice saved to:", outputPath);
      return outputPath;
    }
  } catch (err) {
    console.error("❌ TTS Error:", err.response?.data || err.message);
    return null;
  }
};
