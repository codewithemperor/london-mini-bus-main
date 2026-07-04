"use client";

import {
  calculateMileage,
  calculateTimeCost,
  normalizeLocation,
} from "@/utils/quote-helpers";
import { QuoteFormState } from "@/types/form";
import { Button, Spinner } from "@heroui/react";
import { Calculator, RotateCcw } from "lucide-react";
import { HeroDateTimePickerField } from "@/components/ui/hero-form-field";
import { LocationAutocompleteField } from "@/components/ui/location-autocomplete-field";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import QuoteModal from "./quote-modal";
import SuccessModal from "./success-modal";

type TripType = "return" | "oneway";

type FormState = {
  tripType: TripType;
  pickupTime: string;
  returnTime: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  dropoffLocation: string;
};

type RequiredFieldKey = Exclude<keyof FormState, "tripType">;

const UK_TIME_ZONE = "Europe/London";

const formatDateForDisplay = (value: string) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
};

const money = (amount: number) => `£${amount.toFixed(2)}`;

/**
 * --- Timezone helpers ---
 *
 * The UK switches between GMT (UTC+0) and BST (UTC+1) twice a year.
 * Rather than hardcode DST rules, we ask the JS Intl API what the
 * offset actually is for any given instant, using the IANA "Europe/London"
 * database — this is always correct, including on the exact days the
 * clocks change.
 */

// Returns the UK's offset from UTC, in minutes, for a given UTC instant.
// Positive = UK is ahead of UTC (BST), 0 = UK matches UTC (GMT).
const getUkOffsetMinutes = (utcDate: Date) => {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: UK_TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = dtf.formatToParts(utcDate).reduce<Record<string, string>>(
    (acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    },
    {},
  );

  const asIfUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );

  return (asIfUtc - utcDate.getTime()) / 60000;
};

// Converts a UK "wall clock" date + time (what the user picked, e.g.
// "2026-07-15" / "14:00") into a real UTC timestamp (ms since epoch),
// correctly accounting for whether that date falls in GMT or BST.
const ukWallTimeToUtcMs = (date: string, time: string): number | null => {
  if (!date || !time) return null;

  // First, parse as if it were already UTC — this gives us an instant
  // close enough to the target to correctly look up the UK offset.
  const naiveUtcMs = Date.parse(`${date}T${time}:00Z`);
  if (Number.isNaN(naiveUtcMs)) return null;

  const offsetMinutes = getUkOffsetMinutes(new Date(naiveUtcMs));

  // The user meant this time IN THE UK, so the true UTC instant is
  // the naive value shifted back by the UK's offset.
  return naiveUtcMs - offsetMinutes * 60000;
};

// Converts a real UTC instant into UK wall-clock date/time strings
// (for display, and for pre-filling the "next available hour").
const utcMsToUkWallTime = (utcMs: number) => {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone: UK_TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const parts = dtf.formatToParts(new Date(utcMs)).reduce<Record<string, string>>(
    (acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    },
    {},
  );

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`, // en-CA gives YYYY-MM-DD
    time: `${parts.hour}:${parts.minute}`,
  };
};

// Next available pickup slot: rounds "now" up to the next full hour.
// Hour boundaries are the same instant everywhere, so we round in UTC,
// then just format that instant as UK wall-clock time for display.
const getNextUkHour = () => {
  const now = new Date();
  now.setUTCMinutes(0, 0, 0);
  now.setUTCHours(now.getUTCHours() + 1);
  return utcMsToUkWallTime(now.getTime());
};

// Replaces the old getDateTimeMs — now timezone-aware.
const getUkDateTimeMs = (date: string, time: string) => ukWallTimeToUtcMs(date, time);

const formatDuration = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    hours,
    minutes,
    hoursDecimal: Number((totalMinutes / 60).toFixed(2)),
  };
};

export default function QuoteCalculator() {
  const [openQuote, setOpenQuote] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<RequiredFieldKey, string>>>({});

  const [fullData, setFullData] = useState<QuoteFormState>({
    tripType: "return",
    pickupTime: "",
    returnTime: "",
    pickupDate: "",
    pickupPostcode: "",
    dropoffPostcode: "",
    email: "",
    distanceMiles: "",
    totalDuration: "",
    totalCost: "",
    baseTotalCost: "",
  });

  const [form, setForm] = useState<FormState>({
    tripType: "return",
    pickupTime: "",
    returnTime: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    dropoffLocation: "",
  });

  const router = useRouter();

  // Recomputed on mount; represents "the next full hour, in UK time"
  const minimumPickupDateTime = useMemo(() => getNextUkHour(), []);

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((state) => ({ ...state, [key]: value }));

    if (key !== "tripType") {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleReset = () => {
    setForm({
      tripType: "return",
      pickupTime: "",
      returnTime: "",
      pickupDate: "",
      returnDate: "",
      pickupLocation: "",
      dropoffLocation: "",
    });
    setErrors({});
  };

  const isCalculateReady =
    form.pickupLocation.trim() !== "" &&
    form.dropoffLocation.trim() !== "" &&
    form.pickupDate !== "" &&
    form.pickupTime !== "" &&
    form.returnDate !== "" &&
    form.returnTime !== "";

  const handleDateTimeChange = (
    dateField: "pickupDate" | "returnDate",
    timeField: "pickupTime" | "returnTime",
    value: { date: string; time: string },
  ) => {
    setForm((state) => ({
      ...state,
      [dateField]: value.date,
      [timeField]: value.time,
    }));
    setErrors((prev) => ({
      ...prev,
      [dateField]: undefined,
      [timeField]: undefined,
    }));
  };

  const sendEmail = async () => {
    if (!fullData.email) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fullData.email,
          tripType: fullData.tripType,
          pickupPostcode: fullData.pickupPostcode,
          dropoffPostcode: fullData.dropoffPostcode,
          pickupTime: fullData.pickupTime,
          returnTime: fullData.returnTime,
          pickupDate: fullData.pickupDate,
          distanceMiles: fullData.distanceMiles,
          duration: fullData.totalDuration,
          totalCost: fullData.baseTotalCost || fullData.totalCost,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      setOpenSuccess(true);
      setOpenQuote(false);
    } catch (error) {
      console.error(error);
      router.push("/error");
    }
  };

  const handleCalculate = async () => {
    const newErrors: typeof errors = {};

    if (!form.pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup address or postcode is required";
    }

    if (!form.dropoffLocation.trim()) {
      newErrors.dropoffLocation = "Drop-off address or postcode is required";
    }

    if (!form.pickupDate) {
      newErrors.pickupDate = "Pick up date and time is required";
    }

    if (!form.pickupTime) {
      newErrors.pickupTime = "Pick up date and time is required";
    }

    if (!form.returnDate) {
      newErrors.returnDate = "Return date and time is required";
    }

    if (!form.returnTime) {
      newErrors.returnTime = "Return date and time is required";
    }

    // All comparisons now happen on true UTC instants derived from
    // UK wall-clock input, so GMT/BST transitions can't cause an
    // off-by-one-hour bug around the pickup/return validity checks.
    const minimumPickupMs = ukWallTimeToUtcMs(
      minimumPickupDateTime.date,
      minimumPickupDateTime.time,
    );
    const pickupMs = getUkDateTimeMs(form.pickupDate, form.pickupTime);
    const returnMs = getUkDateTimeMs(form.returnDate, form.returnTime);

    if (
      pickupMs !== null &&
      minimumPickupMs !== null &&
      pickupMs < minimumPickupMs
    ) {
      newErrors.pickupDate = "Pick up must be in the future";
    }

    if (pickupMs !== null && returnMs !== null && returnMs <= pickupMs) {
      newErrors.returnDate = "Return must be after pick up";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsCalculating(true);

    const pickupLocation = normalizeLocation(form.pickupLocation);
    const dropoffLocation = normalizeLocation(form.dropoffLocation);

    try {
      const mileageResult = await calculateMileage(
        pickupLocation,
        dropoffLocation,
      );
      const MILE_RATE = 1.7;

      if (!mileageResult || typeof mileageResult.distanceMiles !== "number") {
        throw new Error("Invalid distance result");
      }

      const mileageCost = Number(
        (mileageResult.distanceMiles * MILE_RATE).toFixed(2),
      );
      const pickupMs = getUkDateTimeMs(form.pickupDate, form.pickupTime);
      const returnMs = getUkDateTimeMs(form.returnDate, form.returnTime);

      if (pickupMs === null || returnMs === null || returnMs <= pickupMs) {
        throw new Error("Invalid date/time range");
      }

      const timeResult = formatDuration(
        Math.round((returnMs - pickupMs) / 60000),
      );
      const billableHours = Math.max(timeResult.hoursDecimal, 4);
      const timeCost = calculateTimeCost(timeResult.hoursDecimal);
      const baseTotalCost = Number((mileageCost + timeCost.total).toFixed(2));
      const totalCost =
        form.tripType === "oneway"
          ? Number((baseTotalCost * 2).toFixed(2))
          : baseTotalCost;

      setFullData({
        tripType: form.tripType,
        pickupTime: form.pickupTime,
        returnTime: `${formatDateForDisplay(form.returnDate)} ${form.returnTime}`,
        pickupDate: formatDateForDisplay(form.pickupDate),
        pickupPostcode: pickupLocation,
        dropoffPostcode: dropoffLocation,
        distanceMiles: `${mileageResult.distanceMiles} miles`,
        totalDuration: `${timeResult.hours}h ${timeResult.minutes}min (${billableHours.toFixed(
          2,
        )} billable hours)`,
        baseTotalCost: money(baseTotalCost),
        totalCost: money(totalCost),
      });
      setOpenQuote(true);
      handleReset();
    } catch (error) {
      console.error(error);
      router.push("/error");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section id="calculator" className="mt-18 space-y-10">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          Instant Quote <span className="text-primary">Calculator</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl self-center text-center text-wrap sm:mb-8 sm:text-xl">
          Get an estimated cost for your trip instantly. Just add your trip
          details and see your price right away.
        </p>
      </div>

      <div className="bg-primary-50 mx-auto flex items-center justify-center p-4 sm:px-10 sm:py-8 lg:min-h-screen lg:p-12">
        <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="w-full p-6 sm:p-10 lg:w-1/2 lg:p-12">
            <div className="mb-6 flex items-center">
              <h2 className="mr-2 text-2xl font-bold tracking-tight lg:text-4xl">
                Calculate Your Trip
              </h2>
              <div className="h-1 w-16 rounded-full bg-amber-400 sm:w-24" />
            </div>

            <p className="text-primary-700 mb-8">
              Enter your journey details to see the estimated quote in seconds.
            </p>

            <div className="bg-primary-700 mb-6 grid grid-cols-2 gap-2 rounded-full p-2">
              {(["return", "oneway"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange("tripType", type)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    form.tripType === type
                      ? "bg-white text-black shadow-sm"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {type === "return" ? "Return Trip" : "One Way Trip"}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              <HeroDateTimePickerField
                label="Pick up date and time (UK time)"
                value={form.pickupDate}
                timeValue={form.pickupTime}
                onChange={(value) =>
                  handleDateTimeChange("pickupDate", "pickupTime", value)
                }
                error={errors.pickupDate || errors.pickupTime}
                tone="light"
                minDateTime={minimumPickupDateTime}
              />

              <HeroDateTimePickerField
                label="Return date and time (UK time)"
                value={form.returnDate}
                timeValue={form.returnTime}
                onChange={(value) =>
                  handleDateTimeChange("returnDate", "returnTime", value)
                }
                error={errors.returnDate || errors.returnTime}
                tone="light"
                minDateTime={
                  form.pickupDate && form.pickupTime
                    ? { date: form.pickupDate, time: form.pickupTime }
                    : minimumPickupDateTime
                }
              />

              <LocationAutocompleteField
                label="Pick up address or postcode"
                placeholder="Select pickup location"
                searchPlaceholder="Search pickup address or postcode..."
                value={form.pickupLocation}
                onChange={(value) => handleChange("pickupLocation", value)}
                error={errors.pickupLocation}
                tone="light"
              />

              <LocationAutocompleteField
                label="Drop off address or postcode"
                placeholder="Select drop off location"
                searchPlaceholder="Search drop off address or postcode..."
                value={form.dropoffLocation}
                onChange={(value) => handleChange("dropoffLocation", value)}
                error={errors.dropoffLocation}
                tone="light"
              />

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  isDisabled={!isCalculateReady || isCalculating}
                  isPending={isCalculating}
                  onPress={handleCalculate}
                  className="bg-primary-700 hover:text-primary-700 hover:bg-primary-50 flex h-14 min-h-14 flex-1 items-center justify-center gap-2 rounded-xl px-6 py-0 font-semibold text-white shadow-md transition hover:border hover:shadow-lg disabled:cursor-wait disabled:opacity-70"
                >
                  {({ isPending }) => (
                    <>
                      {isPending ? (
                        <Spinner color="current" size="sm" />
                      ) : (
                        <Calculator size={18} />
                      )}
                      {isPending ? "Calculating..." : "Calculate Quote"}
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="border-primary/50 hover:border-primary text-primary-700 flex h-14 min-h-14 flex-1 items-center justify-center gap-2 rounded-xl border px-6 py-0 font-semibold sm:flex-none"
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="relative hidden w-1/2 lg:block">
            <div className="absolute inset-0 -right-16">
              <div
                className="h-full w-full"
                style={{
                  clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <Image
                  src="/buses/bus-1.webp"
                  alt="London minibus"
                  fill
                  sizes="(min-width: 1024px) 50vw, 0vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {openQuote && (
        <QuoteModal
          isOpen={openQuote}
          onClose={() => setOpenQuote(false)}
          sendEmail={sendEmail}
          fullData={fullData}
          setFullData={setFullData}
        />
      )}
      {openSuccess && (
        <SuccessModal
          isOpen={openSuccess}
          onClose={() => setOpenSuccess(false)}
          amount={fullData.totalCost}
        />
      )}
    </section>
  );
}