import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input")?.trim();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!input || input.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing Google Maps API key" },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    input,
    components: "country:gb",
    language: "en",
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
  );
  const data = await res.json();

  if (data.status === "ZERO_RESULTS") {
    return NextResponse.json({ suggestions: [] });
  }

  if (data.status !== "OK") {
    return NextResponse.json(
      {
        error: "Google Places API error",
        status: data.status,
        message: data.error_message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    suggestions: data.predictions
      .map((prediction: { description?: string }) => prediction.description)
      .filter(Boolean)
      .slice(0, 8),
  });
}
