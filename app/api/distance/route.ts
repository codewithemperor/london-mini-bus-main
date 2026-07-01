import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pickup, dropoff } = await req.json();

  if (!pickup || !dropoff) {
    return NextResponse.json(
      { error: "Missing pickup or dropoff" },
      { status: 400 },
    );
  }

  const url =
    "https://maps.googleapis.com/maps/api/distancematrix/json" +
    `?origins=${encodeURIComponent(pickup)}` +
    `&destinations=${encodeURIComponent(dropoff)}` +
    `&mode=driving` +
    `&units=imperial` +
    `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  console.error("Google Distance API response:", data);

  if (data.status !== "OK") {
    return NextResponse.json(
      {
        error: "Google API error",
        status: data.status,
        message: data.error_message,
        raw: data,
      },
      { status: 500 },
    );
  }
  //   if (data.status !== "OK") {
  //     return NextResponse.json(
  //       { error: "Google API error", data },
  //       { status: 500 },
  //     );
  //   }

  const element = data.rows[0].elements[0];

  if (element.status !== "OK") {
    return NextResponse.json({ error: "Route not found" }, { status: 400 });
  }

  return NextResponse.json({
    distanceMiles: Number((element.distance.value / 1609.344).toFixed(2)),
    durationMinutes: Math.round(element.duration.value / 60),
    raw: element,
  });
}
