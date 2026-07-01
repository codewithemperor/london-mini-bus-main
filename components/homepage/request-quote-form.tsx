/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  CircleAlert,
  Phone,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RequestQuoteForm = () => {
  const [tripType, setTripType] = useState<"return" | "oneway">("return");

  const router = useRouter();

  const [form, setForm] = useState({
    phone: "",
    email: "",
    pickupDate: "",
    returnDate: "",
    pickupTime: "",
    returnTime: "",
    pickupPostcode: "",
    destinationPostcode: "",
    passengers: "",
    luggage: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const [validFields, setValidFields] = useState<
    Partial<Record<keyof typeof form, boolean>>
  >({});

  const isValidDDMMYYYY = (value: string) => {
    // 1. Strict format check
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(value)) return false;

    const [day, month, year] = value.split("/").map(Number);

    // 2. Basic range checks
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // 3. Real calendar date check (no auto-correction)
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const validateField = (field: keyof typeof form, value: string) => {
    let error: string | undefined;

    switch (field) {
      case "phone":
        if (!value.trim() || value.length < 6)
          error = "Phone number is required";
        break;

      case "email":
        if (!value.trim()) error = "Email address is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          error = "Enter a valid email address";
        break;
      case "pickupDate":
        if (!value) {
          error = "Pick up date is required";
        } else if (!isValidDDMMYYYY(value)) {
          error = "Date must be in DD/MM/YYYY format";
        }
        break;

      case "returnDate":
        if (tripType === "return" && !value) {
          error = "Return date is required";
        } else if (tripType === "return" && !isValidDDMMYYYY(value)) {
          error = "Return date must be in DD/MM/YYYY format";
        }
        break;

      case "pickupTime":
        if (!value) error = "Pick up time is required";
        break;

      case "returnTime":
        if (tripType === "return" && !value) error = "Return time is required";
        break;

      case "pickupPostcode":
        if (!value.trim()) error = "Pick up postcode is required";
        break;

      case "destinationPostcode":
        if (!value.trim()) error = "Destination postcode is required";
        break;

      case "passengers":
        if (!value || Number(value) < 1)
          error = "At least 1 passenger is required";
        break;

      case "luggage":
        if (Number(value) < 0) error = "Luggage cannot be negative";
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};

    if (!form.phone.trim() || form.phone.length < 6) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.pickupDate) {
      newErrors.pickupDate = "Pick up date is required";
    } else if (!isValidDDMMYYYY(form.pickupDate)) {
      newErrors.pickupDate = "Date must be in DD/MM/YYYY format";
    }

    if (tripType === "return" && !form.returnDate) {
      newErrors.returnDate = "Return date is required";
    } else if (tripType === "return" && !isValidDDMMYYYY(form.returnDate)) {
      newErrors.returnDate = "Return date must be in DD/MM/YYYY format";
    }

    if (!form.pickupTime) {
      newErrors.pickupTime = "Pick up time is required";
    }

    if (tripType === "return" && !form.returnTime) {
      newErrors.returnTime = "Return time is required";
    }

    if (!form.pickupPostcode.trim()) {
      newErrors.pickupPostcode = "Pick up postcode is required";
    }

    if (!form.destinationPostcode.trim()) {
      newErrors.destinationPostcode = "Destination postcode is required";
    }

    if (!form.passengers || Number(form.passengers) < 1) {
      newErrors.passengers = "At least 1 passenger is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const formatDateInput = (value: string) => {
    const digits = value.replace(/\D/g, "");

    const limited = digits.slice(0, 8);

    const parts = [];

    if (limited.length >= 2) parts.push(limited.slice(0, 2));
    else if (limited.length > 0) parts.push(limited);

    if (limited.length >= 4) parts.push(limited.slice(2, 4));
    else if (limited.length > 2) parts.push(limited.slice(2));

    if (limited.length > 4) parts.push(limited.slice(4));

    return parts.join("/");
  };

  const updateField =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value = e.target.value;

      if (field === "pickupDate" || field === "returnDate") {
        value = formatDateInput(value);
      }

      setForm((prev) => ({ ...prev, [field]: value }));

      const error = validateField(field, value);

      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));

      setValidFields((prev) => ({
        ...prev,
        [field]: !error && value.trim() !== "",
      }));
    };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    const res = await fetch("/api/request-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tripType,
        ...form,
      }),
    });

//     const res = await fetch("/api/request-quote", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ tripType, ...form }),
// });

console.log("STATUS:", res.status);
console.log("TEXT:", await res.text());


    if (res.ok) {
      router.push("/success");
    } else {
      router.push("/error");
    }
  };

  return (
    <section className="w-full overflow-hidden rounded-xl bg-white">
      {/* Trip Toggle */}
      <div className="bg-primary-700 mx-auto my-6 flex w-fit justify-center gap-6 rounded-full p-2">
        <button
          className={`rounded-full px-6 py-2 font-semibold transition ${
            tripType === "return"
              ? "bg-indigo-200 text-black"
              : "text-white hover:scale-95"
          }`}
          onClick={() => setTripType("return")}
        >
          Return Trip
        </button>

        <button
          className={`rounded-full px-6 py-2 font-semibold transition ${
            tripType === "oneway"
              ? "bg-indigo-200 text-black"
              : "text-white hover:scale-95"
          }`}
          onClick={() => setTripType("oneway")}
        >
          One Way Trip
        </button>
      </div>

      <div className="grid grid-cols-1 sm:px-6 lg:grid-cols-3">
        {/* Form */}
        <div className="col-span-2 flex h-full flex-col justify-between rounded-xl bg-indigo-50 px-5 py-12 shadow-lg sm:rounded-none sm:px-8 sm:shadow-none">
          <div>
            <h2 className="mb-2 text-4xl font-bold text-neutral-900">
              Get an Instant Quote
            </h2>
            <p className="mb-8 text-neutral-600">
              Share your trip details and receive the best price instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Phone */}
            <label className="space-y-1 font-medium text-neutral-700">
              Phone number
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.phone
                    ? "border-red-700"
                    : validFields.phone
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <Phone size={16} />
                <input
                  type="text"
                  placeholder="+44 208 987 8046"
                  value={form.phone}
                  onChange={updateField("phone")}
                  className="w-full bg-transparent outline-none"
                />

                {errors.phone && <CircleAlert className="text-red-600" />}
                {validFields.phone && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone}</p>
              )}
              {validFields.phone && (
                <p className="text-sm text-green-600">All set!</p>
              )}
            </label>

            {/* Email */}
            <label className="space-y-1 font-medium text-neutral-700">
              Email address
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.email
                    ? "border-red-700"
                    : validFields.email
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  value={form.email}
                  onChange={updateField("email")}
                  className="w-full bg-transparent outline-none"
                />
                {errors.email && <CircleAlert className="text-red-600" />}
                {validFields.email && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
              {validFields.email && (
                <p className="text-sm text-green-600">All set!</p>
              )}
            </label>

            {/* Pick up date */}
            <label className="space-y-1 font-medium text-neutral-700">
              Pick up date
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.pickupDate
                    ? "border-red-700"
                    : validFields.pickupDate
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <Calendar size={16} />
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={form.pickupDate}
                  onChange={updateField("pickupDate")}
                  inputMode="numeric"
                  pattern="\d{2}/\d{2}/\d{4}"
                  className="w-full bg-transparent outline-none"
                />

                {errors.pickupDate && <CircleAlert className="text-red-600" />}
                {validFields.pickupDate && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
              {errors.pickupDate && (
                <p className="text-sm text-red-600">{errors.pickupDate}</p>
              )}
              {validFields.pickupDate && (
                <p className="text-sm text-green-600">All set!</p>
              )}
            </label>

            {/* Return date */}
            {tripType === "return" && (
              <label className="space-y-1 font-medium text-neutral-700">
                Return date
                <div
                  className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                    errors.returnDate
                      ? "border-red-700"
                      : validFields.returnDate
                        ? "border-green-500"
                        : "border-slate-100"
                  }`}
                >
                  <Calendar size={16} />
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={form.returnDate}
                    onChange={updateField("returnDate")}
                    inputMode="numeric"
                    pattern="\d{2}/\d{2}/\d{4}"
                    className="w-full bg-transparent outline-none"
                  />

                  {errors.returnDate && (
                    <CircleAlert className="text-red-600" />
                  )}
                  {validFields.returnDate && (
                    <CheckCircle className="text-green-600" />
                  )}
                </div>
                {errors.returnDate && (
                  <p className="text-sm text-red-600">{errors.returnDate}</p>
                )}
                {validFields.returnDate && (
                  <p className="text-sm text-green-600">All set!</p>
                )}
              </label>
            )}

            {/* Pick up time */}
            <label className="space-y-1 font-medium text-neutral-700">
              Pick up time
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.pickupTime
                    ? "border-red-700"
                    : validFields.pickupTime
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <Clock size={16} />
                <select
                  value={form.pickupTime}
                  onChange={updateField("pickupTime")}
                  className={`flex-1 bg-transparent outline-none ${!form.pickupTime ? "text-slate-500" : "text-black"} `}
                >
                  {Array.from({ length: 24 }, (_, h) => {
                    const value = `${h.toString().padStart(2, "0")}:00`;
                    const hour12 = h % 12 === 0 ? 12 : h % 12;
                    const period = h < 12 ? "AM" : "PM";

                    return (
                      <option key={value} value={value}>
                        {hour12}:00 {period}
                      </option>
                    );
                  })}
                </select>
                {errors.pickupTime && <CircleAlert className="text-red-600" />}
                {validFields.pickupTime && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
              {errors.pickupTime && (
                <p className="text-sm text-red-600">{errors.pickupTime}</p>
              )}
              {validFields.pickupTime && (
                <p className="text-sm text-green-600">All set!</p>
              )}
            </label>

            {/* Return time */}

            <label className="space-y-1 font-medium text-neutral-700">
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
              {/* field */}
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.returnTime
                    ? "border-red-700"
                    : validFields.returnTime
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <Clock size={16} />

                <select
                  value={form.returnTime}
                  onChange={updateField("returnTime")}
                  className={`flex-1 bg-transparent outline-none ${!form.returnTime ? "text-slate-500" : "text-black"} `}
                >
                  {Array.from({ length: 24 }, (_, h) => {
                    const value = `${h.toString().padStart(2, "0")}:00`;
                    const hour12 = h % 12 === 0 ? 12 : h % 12;
                    const period = h < 12 ? "AM" : "PM";

                    return (
                      <option key={value} value={value}>
                        {hour12}:00 {period}
                      </option>
                    );
                  })}
                </select>
                {errors.returnTime && <CircleAlert className="text-red-600" />}
                {validFields.returnTime && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
              {errors.returnTime && (
                <p className="text-sm text-red-600">{errors.returnTime}</p>
              )}
              {validFields.returnTime && (
                <p className="text-sm text-green-600">All set!</p>
              )}
            </label>

            {/* Pick up postcode */}
            <label className="space-y-1 font-medium text-neutral-700">
              Pick up post code
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.pickupPostcode
                    ? "border-red-700"
                    : validFields.pickupPostcode
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <MapPin size={16} />
                <input
                  type="text"
                  placeholder="SE15 2UQ"
                  value={form.pickupPostcode}
                  onChange={updateField("pickupPostcode")}
                  className="w-full bg-transparent outline-none"
                />

                {errors.pickupPostcode && (
                  <CircleAlert className="text-red-600" />
                )}
                {validFields.pickupPostcode && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
              {errors.pickupPostcode && (
                <p className="text-sm text-red-600">{errors.pickupPostcode}</p>
              )}
              {validFields.pickupPostcode && (
                <p className="text-sm text-green-600">All set!</p>
              )}
            </label>

            {/* Destination postcode */}
            <label className="space-y-1 font-medium text-neutral-700">
              Destination post code
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.destinationPostcode
                    ? "border-red-700"
                    : validFields.destinationPostcode
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <MapPin size={16} />
                <input
                  type="text"
                  placeholder="SE15 2UQ"
                  value={form.destinationPostcode}
                  onChange={updateField("destinationPostcode")}
                  className="w-full bg-transparent outline-none"
                />
                {errors.destinationPostcode && (
                  <CircleAlert className="text-red-600" />
                )}
                {validFields.destinationPostcode && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
              {errors.destinationPostcode && (
                <p className="text-sm text-red-600">
                  {errors.destinationPostcode}
                </p>
              )}
              {validFields.destinationPostcode && (
                <p className="text-sm text-green-600">All set!</p>
              )}
            </label>

            {/* Passengers */}
            <label className="space-y-1 font-medium text-neutral-700">
              Passengers
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.passengers
                    ? "border-red-700"
                    : validFields.passengers
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <Users size={16} />
                <input
                  type="number"
                  min={1}
                  value={form.passengers}
                  onChange={updateField("passengers")}
                  className="w-full bg-transparent outline-none"
                />
                {errors.passengers && <CircleAlert className="text-red-600" />}
                {validFields.passengers && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
              {errors.passengers && (
                <p className="text-sm text-red-600">{errors.passengers}</p>
              )}
              {validFields.passengers && (
                <p className="text-sm text-green-600">All set!</p>
              )}
            </label>

            {/* Luggage */}
            <label className="space-y-1 font-medium text-neutral-700">
              Luggage
              <div
                className={`focus-within:border-secondary-600 mt-2 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-md ${
                  errors.luggage
                    ? "border-red-700"
                    : validFields.luggage
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <Briefcase size={16} />
                <input
                  type="number"
                  min={0}
                  value={form.luggage}
                  onChange={updateField("luggage")}
                  className="w-full bg-transparent outline-none"
                />
                {validFields.luggage && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>
            </label>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-8 w-3/5 self-center rounded-xl py-3 font-semibold text-white transition group-hover:shadow-lg hover:border hover:shadow-lg sm:w-full sm:text-lg"
          >
            Submit Trip Details
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative hidden lg:block">
          <img
            src="/tower.png"
            alt="Trip Hero"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default RequestQuoteForm;
