import { NextRequest, NextResponse } from "next/server";


const FISH_AUDIO_API_KEY = process.env.FISH_AUDIO_API_KEY || "";
const FISH_AUDIO_URL = "https://api.fish.audio/v1/tts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, language = "en", voiceId } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Default voice IDs (will be replaced with Rajesh's cloned voice)
    const defaultVoices: Record<string, string> = {
      en: "alan", // Default English voice
      hi: "alan", // Will use same voice for Hindi
      te: "alan", // Will use same voice for Telugu
    };

    const selectedVoice = voiceId || defaultVoices[language] || "alan";

    // Map language to Fish Audio language code
    const langMap: Record<string, string> = {
      en: "en",
      hi: "hi",
      te: "te",
    };

    const response = await fetch(FISH_AUDIO_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FISH_AUDIO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        reference_id: selectedVoice,
        language: langMap[language] || "en",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Fish Audio API error:", error);
      // Return a fallback - the client will use browser TTS
      return NextResponse.json({ error: "TTS API error", fallback: true }, { status: 200 });
    }

    // Fish Audio returns audio as binary
    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mp3",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json({ error: "TTS error", fallback: true }, { status: 200 });
  }
}
