import { NextRequest, NextResponse } from "next/server";
import { searchKnowledgeBase, RCM_KNOWLEDGE_BASE } from "@/lib/knowledge-base";


// Knowledge base search endpoint
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  const category = req.nextUrl.searchParams.get("category");

  if (!query) {
    // Return knowledge base overview
    return NextResponse.json({
      version: RCM_KNOWLEDGE_BASE.version,
      denialCodeCount: RCM_KNOWLEDGE_BASE.denialCodes.length,
      payerCount: RCM_KNOWLEDGE_BASE.payerRules.length,
      scenarioCount: RCM_KNOWLEDGE_BASE.scenarios.length,
      categories: ["denial_codes", "payer_rules", "scenarios", "workflow", "appeal_strategies", "compliance"],
    });
  }

  let results: string[] = [];

  if (category === "denial_codes" || !category) {
    const filtered = RCM_KNOWLEDGE_BASE.denialCodes.filter(
      (c) =>
        c.code.toLowerCase().includes(query.toLowerCase()) ||
        c.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
    );
    results.push(...filtered.map((c) => `${c.code}: ${c.shortDesc} - ${c.successRate} success rate`));
  }

  if (category === "payer_rules" || !category) {
    const filtered = RCM_KNOWLEDGE_BASE.payerRules.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    results.push(...filtered.map((p) => `${p.name}: Filing ${p.timelyFiling} | Appeal: ${p.appealTimeframe}`));
  }

  if (category === "scenarios" || !category) {
    const filtered = RCM_KNOWLEDGE_BASE.scenarios.filter(
      (s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
    );
    results.push(...filtered.map((s) => `Scenario: ${s.title}`));
  }

  return NextResponse.json({ query, results, count: results.length });
}

// Add new knowledge entry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    // In a production system, this would update a database
    // For now, we acknowledge the addition
    return NextResponse.json({
      message: `Knowledge entry of type '${type}' received`,
      note: "In production, this would persist to a database",
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
