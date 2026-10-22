import { NextResponse } from "next/server";
import { fetchMarketData } from "@/lib/market";

// Revalidate every 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const data = await fetchMarketData();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to fetch market data at this time.",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
