import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt, searchKnowledgeBase } from "@/lib/knowledge-base";


interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, language = "en", history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Search knowledge base for relevant context
    const knowledgeContext = searchKnowledgeBase(message);
    const systemPrompt = getSystemPrompt(language);

    // Build enhanced system prompt with knowledge context
    let enhancedPrompt = systemPrompt;
    if (knowledgeContext.length > 0) {
      enhancedPrompt += `\n\nRELEVANT KNOWLEDGE BASE CONTEXT (use this to answer if relevant):\n${knowledgeContext.join("\n\n---\n\n")}`;
    }

    // Build messages array
    const messages: ChatMessage[] = [
      { role: "system", content: enhancedPrompt },
      ...history.slice(-10).map((m: ChatMessage) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // Use z-ai-web-dev-sdk
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = completion.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Could you please repeat?";

    return NextResponse.json({
      reply,
      language,
      knowledgeUsed: knowledgeContext.length > 0,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
