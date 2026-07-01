"use client";

import {
  calculateMileage,
  calculateTimeCost,
  calculateTimeDifference,
  isValidUKPostcode,
  normalizePostcode,
} from "@/utils/quote-helpers";
import Image from "next/image";
import React, { useState } from "react";
import QuoteModal from "./quote-modal";
import { QuoteFormState } from "@/types/form";
import { useRouter } from "next/navigation";
import SuccessModal from "./success-modal";
import { Calendar } from "lucide-react";

type FormState = {
  pickupTime: string;
  returnTime: string;
  pickupDate: string;
  pickupPostcode: string;
  dropoffPostcode: string;
};

export default function QuoteCalculator() {
  const image = "/buses/bus-1.JPG";
  const [openQuote, setOpenQuote] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    pickupPostcode?: string;
    dropoffPostcode?: string;
  }>({});

  const [fullData, setFullData] = useState<QuoteFormState>({
    pickupTime: "",
    returnTime: "",
    pickupDate: "",
    pickupPostcode: "",
    dropoffPostcode: "",
    email: "",
    distanceMiles: "",
    totalDuration: "",
    totalCost: "",
  });
  const [form, setForm] = useState<FormState>({
    pickupTime: "",
    returnTime: "",
    pickupDate: "",
    pickupPostcode: "",
    dropoffPostcode: "",
  });

  const router = useRouter();

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((s) => ({ ...s, [key]: value }));

    // Clear error for that field while typing
    if (key === "pickupPostcode" || key === "dropoffPostcode") {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleReset = () => {
    setForm({
      pickupTime: "",
      returnTime: "",
      pickupDate: "",
      pickupPostcode: "",
      dropoffPostcode: "",
    });
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
          pickupPostcode: fullData.pickupPostcode,
          dropoffPostcode: fullData.dropoffPostcode,
          pickupTime: fullData.pickupTime,
          returnTime: fullData.returnTime,
          pickupDate: fullData.pickupDate,

          distanceMiles: fullData.distanceMiles,
          duration: fullData.totalDuration,
          totalCost: fullData.totalCost,
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

    // Validate RAW input
    if (!form.pickupPostcode.trim()) {
      newErrors.pickupPostcode = "Pickup postcode is required";
    } else if (!isValidUKPostcode(form.pickupPostcode)) {
      newErrors.pickupPostcode = "Enter a valid UK postcode";
    }

    if (!form.dropoffPostcode.trim()) {
      newErrors.dropoffPostcode = "Drop-off postcode is required";
    } else if (!isValidUKPostcode(form.dropoffPostcode)) {
      newErrors.dropoffPostcode = "Enter a valid UK postcode";
    }

    if (!form.pickupTime || !form.returnTime) {
      return;
    }

    // Stop calculation if errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors once valid
    setErrors({});

    const fromCode = normalizePostcode(form.pickupPostcode);
    const toCode = normalizePostcode(form.dropoffPostcode);

    try {
      const mileageResult = await calculateMileage(fromCode, toCode);

      const MILE_RATE = 1.5;

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
      const timeCost = calculateTimeCost(timeResult.hoursDecimal);

      const totalCost = Number((mileageCost + timeCost.total).toFixed(2));

      setFullData({
        ...form,
        pickupTime: form.pickupTime,
        returnTime: form.returnTime,
        pickupDate: form.pickupDate,
        pickupPostcode: fromCode,
        dropoffPostcode: toCode,
        distanceMiles: `${mileageResult.distanceMiles} miles\n`,
        totalDuration: `${timeResult.hours}h ${timeResult.minutes}min`,
        totalCost: `£${totalCost}`,
      });
      setOpenQuote(true);

      handleReset();
    } catch (error) {
      console.error(error);
      router.push("/error");
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
      {/* Desktop */}
      <div className="bg-primary-50 mx-auto hidden min-h-screen items-center justify-center p-12 lg:flex">
        <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* LEFT: Form */}
          <div className="w-1/2 p-12">
            <div className="mb-6 flex items-center">
              <h2 className="mr-2 text-4xl font-bold tracking-tight">
                Calculate Your Trip
              </h2>
              <div className="h-1 w-24 rounded-full bg-amber-400" />
            </div>

            <p className="text-primary-700 mb-8">
              Enter your journey details to see the estimated quote in seconds
            </p>
            {/* Pickup time */}
            <div className="space-y-6">
              <div className="grid space-y-2">
                <label className="block text-slate-700">Pick up time</label>
                <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <select
                    value={form.pickupTime}
                    onChange={(e) => handleChange("pickupTime", e.target.value)}
                    className={`flex-1 bg-transparent font-semibold outline-none ${!form.pickupTime ? "text-slate-400" : "text-black"} `}
                  >
                    {Array.from({ length: 24 * 4 }, (_, i) => {
                      const totalMinutes = i * 15;
                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;

                      const value = `${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}`;

                      const hour12 = hours % 12 === 0 ? 12 : hours % 12;
                      const period = hours < 12 ? "AM" : "PM";

                      return (
                        <option key={value} value={value}>
                          {hour12}:{minutes.toString().padStart(2, "0")}{" "}
                          {period}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Return time */}
              <div className="grid space-y-2">
                <label className="block text-slate-700">
                  <div className="flex items-center gap-2">
                    <span>Return time</span>
                    {/* Tooltip wrapper */}
                    <span className="group relative hidden items-center md:inline-flex">
                      {/* Info icon */}
                      <svg
                        className="h-4 w-4 cursor-pointer text-slate-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z"
                          clipRule="evenodd"
                        />
                      </svg>

                      {/* Tooltip */}
                      <span className="pointer-events-none absolute top-full left-2/2 z-10 mt-2 w-max max-w-xs -translate-x-1/2 rounded-md bg-neutral-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 sm:block">
                        This is the time you will arrive back to your pick up
                        address after your trip is completed.
                      </span>
                    </span>
                    {/* Notice for mobile */}
                    <span className="justify-self-end text-right text-xs">
                      (Time for your trip completion)
                    </span>
                  </div>
                </label>
                <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <select
                    value={form.returnTime}
                    onChange={(e) => handleChange("returnTime", e.target.value)}
                    className={`flex-1 bg-transparent font-semibold outline-none ${!form.returnTime ? "text-slate-400" : "text-black"} `}
                  >
                    {Array.from({ length: 24 * 4 }, (_, i) => {
                      const totalMinutes = i * 15;
                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;

                      const value = `${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}`;

                      const hour12 = hours % 12 === 0 ? 12 : hours % 12;
                      const period = hours < 12 ? "AM" : "PM";

                      return (
                        <option key={value} value={value}>
                          {hour12}:{minutes.toString().padStart(2, "0")}{" "}
                          {period}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Pickup postcode */}
              <div className="grid space-y-2">
                <label className="block text-slate-700">Pick up postcode</label>
                <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
                    />
                  </svg>
                  <input
                    value={form.pickupPostcode}
                    onChange={(e) =>
                      handleChange("pickupPostcode", e.target.value)
                    }
                    placeholder="e.g. SE15 2UQ"
                    className="flex-1 bg-transparent font-semibold text-black placeholder-slate-400 outline-none"
                  />
                </div>
                {errors.pickupPostcode && (
                  <p className="text-xs text-red-700">
                    {errors.pickupPostcode}
                  </p>
                )}
              </div>

              {/* Dropoff postcode */}
              <div className="grid space-y-2">
                {" "}
                <label className="block text-slate-700">
                  Drop off post code
                </label>
                <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
                    />
                  </svg>
                  <input
                    value={form.dropoffPostcode}
                    onChange={(e) =>
                      handleChange("dropoffPostcode", e.target.value)
                    }
                    placeholder="e.g. SE15 2UQ"
                    className="flex-1 bg-transparent font-semibold text-black placeholder-slate-400 outline-none"
                  />
                </div>
                {errors.dropoffPostcode && (
                  <p className="text-xs text-red-700">
                    {errors.dropoffPostcode}
                  </p>
                )}
              </div>

              {/* pickup date */}
              <div className="grid space-y-2">
                <label className="block text-slate-700">Pickup Date</label>
                <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
                  <Calendar size={16} className="mr-4 text-slate-400" />
                  <input
                    value={form.pickupDate}
                    onChange={(e) => handleChange("pickupDate", e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="flex-1 bg-transparent font-semibold text-black placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex items-center gap-6">
                <button
                  onClick={handleCalculate}
                  className="bg-primary-700 hover:text-primary-700 hover:bg-primary-50 rounded-xl px-6 py-3 text-white shadow-md transition hover:border hover:shadow-lg"
                >
                  Calculate Quote
                </button>

                <button
                  onClick={handleReset}
                  className="border-primary/50 hover:border-primary text-primary-700 rounded-xl border px-6 py-3"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-1/2">
            <div className="absolute inset-0 -right-16">
              <div
                className="h-full w-full"
                style={{
                  clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <Image src={image} alt="van" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Mobile*/}
      <div className="bg-primary-50 w-full p-4 sm:px-10 sm:py-8 lg:hidden">
        <div className="mb-6 flex items-center">
          <h2 className="mr-2 text-2xl font-bold tracking-tight">
            Calculate Your Trip
          </h2>
          <div className="h-1 w-24 rounded-full bg-amber-400" />
        </div>

        <p className="text-primary-700 mb-8">
          Enter your journey details to see the estimated quote in seconds
        </p>

        <div className="space-y-3">
          {/* Pickup time */}
          <div className="grid space-y-2">
            {" "}
            <label className="block text-slate-700">Pick up time</label>
            <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <select
                value={form.pickupTime}
                onChange={(e) => handleChange("pickupTime", e.target.value)}
                className={`flex-1 bg-transparent font-semibold outline-none ${!form.pickupTime ? "text-slate-400" : "text-black"} `}
              >
                {Array.from({ length: 24 * 4 }, (_, i) => {
                  const totalMinutes = i * 15;
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;

                  const value = `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`;

                  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
                  const period = hours < 12 ? "AM" : "PM";

                  return (
                    <option key={value} value={value}>
                      {hour12}:{minutes.toString().padStart(2, "0")} {period}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Return time */}
          <div className="grid w-full space-y-2">
            <label className="block text-slate-700">
              <div className="flex items-center gap-2">
                <span>Return time</span>
                {/* Tooltip wrapper */}
                <span className="group relative hidden items-center md:inline-flex">
                  {/* Info icon */}
                  <svg
                    className="h-4 w-4 cursor-pointer text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* Tooltip */}
                  <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 w-max -translate-x-1/2 rounded-md bg-neutral-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 sm:block">
                    This is the time you will arrive back to your pick up
                    address after your trip is completed.
                  </span>
                </span>
                {/* Notice for mobile */}
                <span className="justify-self-end text-right text-xs">
                  (Time for your trip completion)
                </span>
              </div>
            </label>
            <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <select
                value={form.returnTime}
                onChange={(e) => handleChange("returnTime", e.target.value)}
                className={`flex-1 bg-transparent font-semibold outline-none ${!form.returnTime ? "text-slate-400" : "text-black"} `}
              >
                {Array.from({ length: 24 * 4 }, (_, i) => {
                  const totalMinutes = i * 15;
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;

                  const value = `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`;

                  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
                  const period = hours < 12 ? "AM" : "PM";

                  return (
                    <option key={value} value={value}>
                      {hour12}:{minutes.toString().padStart(2, "0")} {period}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Pickup postcode */}
          <div className="grid space-y-2">
            {" "}
            <label className="block text-slate-700">Pick up postcode</label>
            <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 21s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
                />
              </svg>
              <input
                value={form.pickupPostcode}
                onChange={(e) => handleChange("pickupPostcode", e.target.value)}
                placeholder="e.g. SE15 2UQ"
                className="flex-1 bg-transparent font-semibold text-black placeholder-slate-400 outline-none"
              />
            </div>{" "}
            {errors.pickupPostcode && (
              <p className="text-xs text-red-700">{errors.pickupPostcode}</p>
            )}
          </div>

          {/* Dropoff postcode */}
          <div className="grid space-y-2">
            {" "}
            <label className="block text-slate-700">Drop off post code</label>
            <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 21s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
                />
              </svg>
              <input
                value={form.dropoffPostcode}
                onChange={(e) =>
                  handleChange("dropoffPostcode", e.target.value)
                }
                placeholder="e.g. SE15 2UQ"
                className="flex-1 bg-transparent font-semibold text-black placeholder-slate-400 outline-none"
              />
            </div>{" "}
            {errors.dropoffPostcode && (
              <p className="text-xs text-red-700">{errors.dropoffPostcode}</p>
            )}
          </div>

          {/* pickup date */}
          <div className="grid space-y-2">
            <label className="block text-slate-700">Pickup Date</label>
            <div className="focus-within:border-secondary-600 flex items-center rounded-xl border border-slate-100 bg-slate-50 p-3 hover:shadow-md">
              <Calendar size={16} className="mr-4 text-slate-400" />
              <input
                value={form.pickupDate}
                onChange={(e) => handleChange("pickupDate", e.target.value)}
                placeholder="DD/MM/YYYY"
                className="flex-1 bg-transparent font-semibold text-black placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex w-full items-center justify-between gap-6">
            <button
              onClick={handleCalculate}
              className="bg-primary-700 w-full rounded-md py-2 text-white shadow-md transition hover:shadow-lg"
            >
              Calculate
            </button>

            <button
              onClick={handleReset}
              className="border-primary text-primary-700 w-full rounded-md border py-2"
            >
              Reset
            </button>
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
