import { NextRequest, NextResponse } from "next/server";


// Speech-to-Text using z-ai-web-dev-sdk (or browser Web Speech API fallback)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
    }

    // Convert audio to buffer
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

    // For now, we'll use a simple approach - the browser's Web Speech API handles STT client-side
    // The server endpoint is here for future integration with server-side STT (Whisper API, etc.)
    // When Groq/Whisper API key is available, this can be re-enabled

    // Attempt to use z-ai-web-dev-sdk for transcription if available
    try {
      const ZAI = (await import("z-ai-web-dev-sdk")).default;
      const zai = await ZAI.create();

      // Create a temporary file for the audio
      const blob = new Blob([audioBuffer], { type: audioFile.type || "audio/webm" });
      const file = new File([blob], "recording.webm", { type: "audio/webm" });

      // Note: z-ai-web-dev-sdk may not support audio transcription directly
      // Fallback to indicating the client should use browser STT
      return NextResponse.json({
        transcript: "",
        language: "en",
        useBrowserSTT: true,
        message: "Server-side STT not available. Using browser Web Speech API.",
      });
    } catch {
      return NextResponse.json({
        transcript: "",
        language: "en",
        useBrowserSTT: true,
        message: "Server-side STT not available. Using browser Web Speech API.",
      });
    }
  } catch (error) {
    console.error("STT API error:", error);
    return NextResponse.json({ error: "STT error" }, { status: 500 });
  }
}
