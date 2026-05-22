import { NextRequest, NextResponse } from "next/server";


const FISH_AUDIO_API_KEY = process.env.FISH_AUDIO_API_KEY || "";

// Voice cloning endpoint - create a custom voice model from samples
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, language } = body;

    if (!name) {
      return NextResponse.json({ error: "Voice name is required" }, { status: 400 });
    }

    // Create a voice model on Fish Audio
    const response = await fetch("https://api.fish.audio/v1/tts/model", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FISH_AUDIO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description: description || `Custom voice model for ${name}`,
        language: language || "en",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Fish Audio voice create error:", error);
      return NextResponse.json({ error: "Voice creation failed" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({
      voiceId: data.id || data.model_id,
      message: "Voice model created. Upload audio samples to train it.",
    });
  } catch (error) {
    console.error("Voice clone API error:", error);
    return NextResponse.json({ error: "Voice clone error" }, { status: 500 });
  }
}

// Upload audio samples for voice training
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const voiceId = formData.get("voiceId") as string;
    const audioFile = formData.get("audio") as File;

    if (!voiceId || !audioFile) {
      return NextResponse.json({ error: "Voice ID and audio file are required" }, { status: 400 });
    }

    const uploadFormData = new FormData();
    uploadFormData.append("audio", audioFile);

    const response = await fetch(`https://api.fish.audio/v1/tts/model/${voiceId}/audio`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FISH_AUDIO_API_KEY}`,
      },
      body: uploadFormData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Audio upload error:", error);
      return NextResponse.json({ error: "Audio upload failed" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({
      message: "Audio sample uploaded successfully",
      audioId: data.id,
    });
  } catch (error) {
    console.error("Audio upload error:", error);
    return NextResponse.json({ error: "Upload error" }, { status: 500 });
  }
}
