// const pickUpCode = "SW1A 1AA";
// const dropOffCode = "E20 2ST";

export function normalizePostcode(code: string) {
  return code.trim().replace(/\s+/g, " ").toUpperCase();
}

export const isValidUKPostcode = (value: string) => {
  const postcode = value.trim().toUpperCase();

  // UK postcode regex (standard, non-edge-case)
  const regex = /^(GIR ?0AA|[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/;

  return regex.test(postcode);
};

export async function calculateMileage(
  pickUpCode: string,
  dropOffCode: string,
) {
  if (!isValidUKPostcode(pickUpCode) || !isValidUKPostcode(dropOffCode)) {
    throw new Error("Invalid UK postcode");
  }

  const res = await fetch("/api/distance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pickup: normalizePostcode(pickUpCode),
      dropoff: normalizePostcode(dropOffCode),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to calculate distance");
  }

  return res.json();
}

export function calculateTimeDifference(
  pickupTime: string,
  returnTime: string,
) {
  if (!pickupTime || !returnTime) {
    throw new Error("Missing time");
  }

  const [pH, pM] = pickupTime.split(":").map(Number);
  const [rH, rM] = returnTime.split(":").map(Number);

  const pickupMinutes = pH * 60 + pM;
  const returnMinutes = rH * 60 + rM;

  let diffMinutes = returnMinutes - pickupMinutes;

  // Overnight trip (e.g. 22:00 → 06:00)
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return {
    totalMinutes: diffMinutes,
    hours,
    minutes,
    hoursDecimal: Number((diffMinutes / 60).toFixed(2)),
  };
}

export function calculateTimeCost(hoursDecimal: number) {
  const FIRST_RATE_HOURS = 4;
  const FIRST_RATE = 50;
  const EXTRA_RATE = 40;

  if (hoursDecimal <= 0) {
    return {
      total: 0,
      breakdown: [],
    };
  }

  const firstHours = Math.min(hoursDecimal, FIRST_RATE_HOURS);
  const extraHours = Math.max(hoursDecimal - FIRST_RATE_HOURS, 0);

  const firstCost = firstHours * FIRST_RATE;
  const extraCost = extraHours * EXTRA_RATE;

  return {
    total: Number((firstCost + extraCost).toFixed(2)),
    breakdown: [
      {
        label: "First 4 hours",
        hours: Number(firstHours.toFixed(2)),
        rate: FIRST_RATE,
        cost: Number(firstCost.toFixed(2)),
      },
      {
        label: "Additional hours",
        hours: Number(extraHours.toFixed(2)),
        rate: EXTRA_RATE,
        cost: Number(extraCost.toFixed(2)),
      },
    ],
  };
}
