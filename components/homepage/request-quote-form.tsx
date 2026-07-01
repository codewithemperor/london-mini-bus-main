"use client";
import {
  Briefcase,
  Clock,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import {
  FieldStateIcon,
  HeroDatePickerField,
  HeroInputField,
  HeroNativeSelect,
  HeroTextInput,
} from "@/components/ui/hero-form-field";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        } else if (!isValidISODate(value)) {
          error = "Enter a valid pick up date";
        }
        break;

      case "returnDate":
        if (tripType === "return" && !value) {
          error = "Return date is required";
        } else if (tripType === "return" && !isValidISODate(value)) {
          error = "Enter a valid return date";
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
        if (!value.trim()) error = "Destination address or postcode is required";
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
    } else if (!isValidISODate(form.pickupDate)) {
      newErrors.pickupDate = "Enter a valid pick up date";
    }

    if (tripType === "return" && !form.returnDate) {
      newErrors.returnDate = "Return date is required";
    } else if (tripType === "return" && !isValidISODate(form.returnDate)) {
      newErrors.returnDate = "Enter a valid return date";
    }

    if (!form.pickupTime) {
      newErrors.pickupTime = "Pick up time is required";
    }

    if (tripType === "return" && !form.returnTime) {
      newErrors.returnTime = "Return time is required";
    }

    if (!form.pickupPostcode.trim()) {
      newErrors.pickupPostcode = "Pick up address or postcode is required";
    }

    if (!form.destinationPostcode.trim()) {
      newErrors.destinationPostcode = "Destination address or postcode is required";
    }

    if (!form.passengers || Number(form.passengers) < 1) {
      newErrors.passengers = "At least 1 passenger is required";
    }

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
        <datalist id="request-address-suggestions">
          {ADDRESS_SUGGESTIONS.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>

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
                <FieldStateIcon error={errors.phone} valid={validFields.phone} />
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
                <FieldStateIcon error={errors.email} valid={validFields.email} />
              }
            >
              <HeroTextInput
                type="email"
                placeholder="john@gmail.com"
                value={form.email}
                onChange={updateField("email")}
              />
            </HeroInputField>

            <HeroDatePickerField
              label="Pick up date"
              value={form.pickupDate}
              onChange={(value) => setFieldValue("pickupDate", value)}
              error={errors.pickupDate}
              valid={validFields.pickupDate}
            />

            {tripType === "return" && (
              <HeroDatePickerField
                label="Return date"
                value={form.returnDate}
                onChange={(value) => setFieldValue("returnDate", value)}
                error={errors.returnDate}
                valid={validFields.returnDate}
              />
            )}

            <HeroInputField
              label="Pick up time"
              icon={<Clock size={16} />}
              error={errors.pickupTime}
              valid={validFields.pickupTime}
              suffix={
                <FieldStateIcon
                  error={errors.pickupTime}
                  valid={validFields.pickupTime}
                />
              }
            >
              <HeroNativeSelect
                value={form.pickupTime}
                onChange={updateField("pickupTime")}
                className={!form.pickupTime ? "text-slate-500" : "text-black"}
              >
                <option value="">Select time</option>
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
              </HeroNativeSelect>
            </HeroInputField>

            {/* Return time */}

            {tripType === "return" && (
              <HeroInputField
                label={
                  <div className="flex items-center gap-2">
                    <span>Return time</span>
                    <span className="group relative hidden items-center md:inline-flex">
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
                      <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 w-max -translate-x-1/2 rounded-md bg-neutral-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 sm:block">
                        This is the time you will arrive back to your pick up
                        address after your trip is completed.
                      </span>
                    </span>
                    <span className="justify-self-end text-right text-xs">
                      (Time for your trip completion)
                    </span>
                  </div>
                }
                icon={<Clock size={16} />}
                error={errors.returnTime}
                valid={validFields.returnTime}
                suffix={
                  <FieldStateIcon
                    error={errors.returnTime}
                    valid={validFields.returnTime}
                  />
                }
              >
                <HeroNativeSelect
                  value={form.returnTime}
                  onChange={updateField("returnTime")}
                  className={!form.returnTime ? "text-slate-500" : "text-black"}
                >
                  <option value="">Select time</option>
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
                </HeroNativeSelect>
              </HeroInputField>
            )}

            <HeroInputField
              label="Pick up address or postcode"
              icon={<MapPin size={16} />}
              error={errors.pickupPostcode}
              valid={validFields.pickupPostcode}
              suffix={
                <FieldStateIcon
                  error={errors.pickupPostcode}
                  valid={validFields.pickupPostcode}
                />
              }
            >
              <HeroTextInput
                type="text"
                placeholder="Heathrow Airport or SE15 2UQ"
                value={form.pickupPostcode}
                onChange={updateField("pickupPostcode")}
                list="request-address-suggestions"
                autoComplete="street-address"
              />
            </HeroInputField>

            <HeroInputField
              label="Destination address or postcode"
              icon={<MapPin size={16} />}
              error={errors.destinationPostcode}
              valid={validFields.destinationPostcode}
              suffix={
                <FieldStateIcon
                  error={errors.destinationPostcode}
                  valid={validFields.destinationPostcode}
                />
              }
            >
              <HeroTextInput
                type="text"
                placeholder="Wembley Stadium or E20 2ST"
                value={form.destinationPostcode}
                onChange={updateField("destinationPostcode")}
                list="request-address-suggestions"
                autoComplete="street-address"
              />
            </HeroInputField>

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
          <button
            onClick={handleSubmit}
            className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-8 w-3/5 self-center rounded-xl py-3 font-semibold text-white transition group-hover:shadow-lg hover:border hover:shadow-lg sm:w-full sm:text-lg"
          >
            Submit Trip Details
          </button>
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
