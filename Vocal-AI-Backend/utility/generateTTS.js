import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.ELEVENLABS_API_KEY;
const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel

export const generateFeedbackTTS = async (
  text,
  outputPath = "feedback.mp3"
) => {
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

    const buffer = Buffer.from(response.data);
    const asString = buffer.toString("utf-8");

    try {
      const errorJson = JSON.parse(asString); // 👈 check if it's JSON error
      console.error("❌ ElevenLabs TTS API error:", errorJson);
      return null;
    } catch {
      // ✅ it's valid audio, save it
      fs.writeFileSync(outputPath, buffer);
      console.log("✅ Feedback voice saved to:", outputPath);
      return outputPath;
    }
  } catch (err) {
    if (err.response?.data) {
      const errorBuffer = Buffer.from(err.response.data);
      const errorString = errorBuffer.toString("utf-8");
      console.error("❌ TTS Request Failed:", errorString);
    } else {
      console.error("❌ TTS Request Failed:", err.message);
    }
    return null;
  }
};
