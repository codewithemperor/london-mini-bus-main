"use client";
import { Button, Spinner } from "@heroui/react";
import { Briefcase, Mail, Phone, Users } from "lucide-react";
import {
  FieldStateIcon,
  HeroDateTimePickerField,
  HeroInputField,
  HeroTextInput,
} from "@/components/ui/hero-form-field";
import { LocationAutocompleteField } from "@/components/ui/location-autocomplete-field";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UK_TIME_ZONE = "Europe/London";

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

  const parts = dtf
    .formatToParts(utcDate)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

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

  const naiveUtcMs = Date.parse(`${date}T${time}:00Z`);
  if (Number.isNaN(naiveUtcMs)) return null;

  const offsetMinutes = getUkOffsetMinutes(new Date(naiveUtcMs));

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

  const parts = dtf
    .formatToParts(new Date(utcMs))
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Computed once (not on every render) since "now" only needs to be
  // fresh at mount time for the min-pickup constraint.
  const [minimumPickupDateTime] = useState(() => getNextUkHour());

  const updateTripType = (nextTripType: "return" | "oneway") => {
    setTripType(nextTripType);

    if (nextTripType === "oneway") {
      setForm((prev) => ({ ...prev, returnDate: "", returnTime: "" }));
      setErrors((prev) => ({
        ...prev,
        returnDate: undefined,
        returnTime: undefined,
      }));
      setValidFields((prev) => ({
        ...prev,
        returnDate: false,
        returnTime: false,
      }));
    }
  };

  const isValidISODate = (value: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) return false;

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  // Replaces the old naive getDateTimeMs — now timezone-aware, treating
  // the input as UK wall-clock time rather than literal UTC.
  const getDateTimeMs = (date: string, time: string) =>
    ukWallTimeToUtcMs(date, time);

  const setDateTimeValue = (
    dateField: "pickupDate" | "returnDate",
    timeField: "pickupTime" | "returnTime",
    value: { date: string; time: string },
  ) => {
    setForm((prev) => ({
      ...prev,
      [dateField]: value.date,
      [timeField]: value.time,
    }));

    setErrors((prev) => ({
      ...prev,
      [dateField]: undefined,
      [timeField]: undefined,
    }));

    setValidFields((prev) => ({
      ...prev,
      [dateField]: value.date !== "" && value.time !== "",
      [timeField]: value.date !== "" && value.time !== "",
    }));
  };

  const getFormErrors = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};
    const minimumPickupMs = ukWallTimeToUtcMs(
      minimumPickupDateTime.date,
      minimumPickupDateTime.time,
    );
    const pickupMs = getDateTimeMs(form.pickupDate, form.pickupTime);
    const returnMs = getDateTimeMs(form.returnDate, form.returnTime);

    if (!form.phone.trim() || form.phone.length < 6) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.pickupDate || !form.pickupTime) {
      newErrors.pickupDate = "Pick up date and time is required";
    } else if (!isValidISODate(form.pickupDate) || pickupMs === null) {
      newErrors.pickupDate = "Enter a valid pick up date and time";
    } else if (minimumPickupMs !== null && pickupMs < minimumPickupMs) {
      newErrors.pickupDate = "Pick up must be in the future";
    }

    if (tripType === "return") {
      if (!form.returnDate || !form.returnTime) {
        newErrors.returnDate = "Return date and time is required";
      } else if (!isValidISODate(form.returnDate) || returnMs === null) {
        newErrors.returnDate = "Enter a valid return date and time";
      } else if (pickupMs !== null && returnMs <= pickupMs) {
        newErrors.returnDate = "Return must be after pick up";
      }
    }

    if (!form.pickupPostcode.trim()) {
      newErrors.pickupPostcode = "Pick up address or postcode is required";
    }

    if (!form.destinationPostcode.trim()) {
      newErrors.destinationPostcode =
        "Destination address or postcode is required";
    }

    if (!form.passengers || Number(form.passengers) < 1) {
      newErrors.passengers = "At least 1 passenger is required";
    }

    if (Number(form.luggage) < 0) {
      newErrors.luggage = "Luggage cannot be negative";
    }

    return newErrors;
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
        if (!value || !form.pickupTime) {
          error = "Pick up date and time is required";
        } else if (!isValidISODate(value)) {
          error = "Enter a valid pick up date and time";
        }
        break;

      case "returnDate":
        if (tripType === "return" && (!value || !form.returnTime)) {
          error = "Return date and time is required";
        } else if (tripType === "return" && !isValidISODate(value)) {
          error = "Enter a valid return date and time";
        }
        break;

      case "pickupTime":
        if (!value) error = "Pick up time is required";
        break;

      case "returnTime":
        if (tripType === "return" && !value) error = "Return time is required";
        break;

      case "pickupPostcode":
        if (!value.trim()) error = "Pick up address or postcode is required";
        break;

      case "destinationPostcode":
        if (!value.trim())
          error = "Destination address or postcode is required";
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
    const newErrors = getFormErrors();

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const updateField =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFieldValue(field, e.target.value);
    };

  const setFieldValue = (field: keyof typeof form, value: string) => {
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

  const formErrors = getFormErrors();
  const pickupDateTimeError =
    errors.pickupDate ||
    errors.pickupTime ||
    (form.pickupDate && form.pickupTime
      ? formErrors.pickupDate || formErrors.pickupTime
      : undefined);
  const returnDateTimeError =
    errors.returnDate ||
    errors.returnTime ||
    (form.returnDate && form.returnTime
      ? formErrors.returnDate || formErrors.returnTime
      : undefined);
  const isFormReady = Object.keys(formErrors).length === 0;

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/request-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripType,
          ...form,
        }),
      });

      if (res.ok) {
        router.push("/success");
      } else {
        router.push("/error");
      }
    } catch (error) {
      console.error(error);
      router.push("/error");
    } finally {
      setIsSubmitting(false);
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
          onClick={() => updateTripType("return")}
        >
          Return Trip
        </button>

        <button
          className={`rounded-full px-6 py-2 font-semibold transition ${
            tripType === "oneway"
              ? "bg-indigo-200 text-black"
              : "text-white hover:scale-95"
          }`}
          onClick={() => updateTripType("oneway")}
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
            <HeroInputField
              label="Phone number"
              icon={<Phone size={16} />}
              error={errors.phone}
              valid={validFields.phone}
              suffix={
                <FieldStateIcon
                  error={errors.phone}
                  valid={validFields.phone}
                />
              }
            >
              <HeroTextInput
                type="text"
                placeholder="+44 208 987 8046"
                value={form.phone}
                onChange={updateField("phone")}
              />
            </HeroInputField>

            <HeroInputField
              label="Email address"
              icon={<Mail size={16} />}
              error={errors.email}
              valid={validFields.email}
              suffix={
                <FieldStateIcon
                  error={errors.email}
                  valid={validFields.email}
                />
              }
            >
              <HeroTextInput
                type="email"
                placeholder="john@gmail.com"
                value={form.email}
                onChange={updateField("email")}
              />
            </HeroInputField>

            <HeroDateTimePickerField
              label="Pick up date and time (UK time)"
              value={form.pickupDate}
              timeValue={form.pickupTime}
              onChange={(value) =>
                setDateTimeValue("pickupDate", "pickupTime", value)
              }
              error={pickupDateTimeError}
              valid={
                validFields.pickupDate &&
                validFields.pickupTime &&
                !pickupDateTimeError
              }
              minDateTime={minimumPickupDateTime}
            />

            {tripType === "return" && (
              <HeroDateTimePickerField
                label="Return date and time (UK time)"
                value={form.returnDate}
                timeValue={form.returnTime}
                onChange={(value) =>
                  setDateTimeValue("returnDate", "returnTime", value)
                }
                error={returnDateTimeError}
                valid={
                  validFields.returnDate &&
                  validFields.returnTime &&
                  !returnDateTimeError
                }
                minDateTime={
                  form.pickupDate && form.pickupTime
                    ? { date: form.pickupDate, time: form.pickupTime }
                    : minimumPickupDateTime
                }
              />
            )}

            <LocationAutocompleteField
              label="Pick up address or postcode"
              placeholder="Select pickup location"
              searchPlaceholder="Search pickup address or postcode..."
              value={form.pickupPostcode}
              onChange={(value) => setFieldValue("pickupPostcode", value)}
              error={errors.pickupPostcode}
              valid={validFields.pickupPostcode}
            />

            <LocationAutocompleteField
              label="Destination address or postcode"
              placeholder="Select destination location"
              searchPlaceholder="Search destination address or postcode..."
              value={form.destinationPostcode}
              onChange={(value) => setFieldValue("destinationPostcode", value)}
              error={errors.destinationPostcode}
              valid={validFields.destinationPostcode}
            />

            <HeroInputField
              label="Passengers"
              icon={<Users size={16} />}
              error={errors.passengers}
              valid={validFields.passengers}
              suffix={
                <FieldStateIcon
                  error={errors.passengers}
                  valid={validFields.passengers}
                />
              }
            >
              <HeroTextInput
                type="number"
                min={1}
                value={form.passengers}
                onChange={updateField("passengers")}
              />
            </HeroInputField>

            <HeroInputField
              label="Luggage"
              icon={<Briefcase size={16} />}
              error={errors.luggage}
              valid={validFields.luggage}
              suffix={
                <FieldStateIcon
                  error={errors.luggage}
                  valid={validFields.luggage}
                />
              }
            >
              <HeroTextInput
                type="number"
                min={0}
                value={form.luggage}
                onChange={updateField("luggage")}
              />
            </HeroInputField>
          </div>

          {/* Submit */}
          <Button
            isDisabled={!isFormReady || isSubmitting}
            isPending={isSubmitting}
            onPress={handleSubmit}
            className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-8 h-14 min-h-14 w-3/5 self-center rounded-xl py-0 font-semibold text-white transition group-hover:shadow-lg hover:border hover:shadow-lg disabled:opacity-60 sm:w-full sm:text-lg"
          >
            {({ isPending }) => (
              <>
                {isPending ? <Spinner color="current" size="sm" /> : null}
                {isPending ? "Submitting..." : "Submit Trip Details"}
              </>
            )}
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative hidden lg:block">
          <Image
            src="/tower.webp"
            alt="Trip Hero"
            fill
            sizes="(min-width: 1024px) 33vw, 0vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default RequestQuoteForm;
