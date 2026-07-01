"use client";

import {
  calculateMileage,
  calculateTimeCost,
  calculateTimeDifference,
  normalizeLocation,
} from "@/utils/quote-helpers";
import { QuoteFormState } from "@/types/form";
import {
  Calculator,
  Clock,
  Info,
  MapPin,
  RotateCcw,
} from "lucide-react";
import {
  HeroDatePickerField,
  HeroInputField,
  HeroNativeSelect,
  HeroTextInput,
} from "@/components/ui/hero-form-field";
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
  pickupLocation: string;
  dropoffLocation: string;
};

type RequiredFieldKey = Exclude<keyof FormState, "tripType">;

const ADDRESS_SUGGESTIONS = [
  "Heathrow Airport, Hounslow",
  "Gatwick Airport, Horley",
  "Stansted Airport, Stansted",
  "Luton Airport, Luton",
  "London City Airport, London",
  "King's Cross Station, London",
  "Victoria Coach Station, London",
  "Waterloo Station, London",
  "Wembley Stadium, London",
  "The O2, London",
  "SW1A 1AA",
  "SE15 2UQ",
  "E20 2ST",
];

const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
  const totalMinutes = i * 15;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const value = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const period = hours < 12 ? "AM" : "PM";

  return {
    value,
    label: `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`,
  };
});

const formatDateForDisplay = (value: string) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
};

const money = (amount: number) => `£${amount.toFixed(2)}`;

export default function QuoteCalculator() {
  const [openQuote, setOpenQuote] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<RequiredFieldKey, string>>
  >({});

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
    pickupLocation: "",
    dropoffLocation: "",
  });

  const router = useRouter();

  const minPickupDate = useMemo(() => new Date().toISOString().split("T")[0], []);

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
      pickupLocation: "",
      dropoffLocation: "",
    });
    setErrors({});
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
      newErrors.pickupDate = "Pickup date is required";
    }

    if (!form.pickupTime) {
      newErrors.pickupTime = "Pick up time is required";
    }

    if (!form.returnTime) {
      newErrors.returnTime = "Return time is required";
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
      const mileageResult = await calculateMileage(pickupLocation, dropoffLocation);
      const MILE_RATE = 1.7;

      if (!mileageResult || typeof mileageResult.distanceMiles !== "number") {
        throw new Error("Invalid distance result");
      }

      const mileageCost = Number(
        (mileageResult.distanceMiles * MILE_RATE).toFixed(2),
      );
      const timeResult = calculateTimeDifference(
        form.pickupTime,
        form.returnTime,
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
        returnTime: form.returnTime,
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

            <datalist id="calculator-address-suggestions">
              {ADDRESS_SUGGESTIONS.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>

            <div className="space-y-5">
              <HeroInputField
                label="Pick up time"
                icon={<Clock size={18} />}
                error={errors.pickupTime}
                tone="light"
              >
                <HeroNativeSelect
                  value={form.pickupTime}
                  onChange={(e) => handleChange("pickupTime", e.target.value)}
                  className={
                    !form.pickupTime ? "text-slate-400" : "text-black"
                  }
                >
                  <option value="">Select time</option>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </HeroNativeSelect>
              </HeroInputField>

              <HeroInputField
                label={
                  <span className="flex items-center gap-2">
                    Return time
                    <span className="group relative inline-flex items-center">
                      <Info size={14} className="text-slate-400" />
                      <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 w-max max-w-56 -translate-x-1/2 rounded-md bg-neutral-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Time for your trip completion
                      </span>
                    </span>
                  </span>
                }
                icon={<Clock size={18} />}
                error={errors.returnTime}
                tone="light"
              >
                <HeroNativeSelect
                  value={form.returnTime}
                  onChange={(e) => handleChange("returnTime", e.target.value)}
                  className={
                    !form.returnTime ? "text-slate-400" : "text-black"
                  }
                >
                  <option value="">Select time</option>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </HeroNativeSelect>
              </HeroInputField>

              <HeroInputField
                label="Pick up address or postcode"
                icon={<MapPin size={18} />}
                error={errors.pickupLocation}
                tone="light"
              >
                <HeroTextInput
                  value={form.pickupLocation}
                  onChange={(e) => handleChange("pickupLocation", e.target.value)}
                  placeholder="e.g. Heathrow Airport or SW1A 1AA"
                  list="calculator-address-suggestions"
                  autoComplete="street-address"
                />
              </HeroInputField>

              <HeroInputField
                label="Drop off address or postcode"
                icon={<MapPin size={18} />}
                error={errors.dropoffLocation}
                tone="light"
              >
                <HeroTextInput
                  value={form.dropoffLocation}
                  onChange={(e) =>
                    handleChange("dropoffLocation", e.target.value)
                  }
                  placeholder="e.g. Wembley Stadium or E20 2ST"
                  list="calculator-address-suggestions"
                  autoComplete="street-address"
                />
              </HeroInputField>

              <HeroDatePickerField
                label="Pickup date"
                value={form.pickupDate}
                minValue={minPickupDate}
                onChange={(value) => handleChange("pickupDate", value)}
                error={errors.pickupDate}
                tone="light"
              />

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="bg-primary-700 hover:text-primary-700 hover:bg-primary-50 flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-md transition hover:border hover:shadow-lg disabled:cursor-wait disabled:opacity-70"
                >
                  <Calculator size={18} />
                  {isCalculating ? "Calculating..." : "Calculate Quote"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="border-primary/50 hover:border-primary text-primary-700 flex flex-1 items-center justify-center gap-2 rounded-xl border px-6 py-3 font-semibold sm:flex-none"
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
