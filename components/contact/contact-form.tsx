"use client";
import { InquiryFormValues } from "@/types/form";
import {
  CheckCircle,
  CircleAlert,
  MailIcon,
  MapPin,
  PhoneCallIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type FormErrors = Partial<InquiryFormValues>;
type FieldName = keyof InquiryFormValues;

const ContactForm = () => {
  const [values, setValues] = useState<InquiryFormValues>({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const validateField = (
    name: FieldName,
    value: string,
  ): string | undefined => {
    const trimmed = value.trim();

    switch (name) {
      case "fullName":
        if (!trimmed) return "Full name is required";
        if (trimmed.length < 2) return "Full name is too short";
        return;

      case "email":
        if (!trimmed) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return "Enter a valid email address";
        }
        return;

      case "phoneNumber":
        if (!trimmed) return "Phone number is required";
        if (!/^[0-9+\s]{7,15}$/.test(trimmed)) {
          return "Enter a valid phone number";
        }
        return;

      case "message":
        if (!trimmed) return "Message cannot be empty";
        if (trimmed.length < 10) {
          return "Message must be at least 10 characters";
        }
        return;

      default:
        return;
    }
  };

  const validateForm = (values: InquiryFormValues): FormErrors => {
    const newErrors: FormErrors = {};

    (Object.keys(values) as (keyof InquiryFormValues)[]).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // clear error as user types
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!captchaToken) {
      setCaptchaError("Please verify that you are human.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          captchaToken,
        }),
      });

      if (!res.ok) {
        if (res.status === 403) {
          setCaptchaError("Captcha verification failed. Please try again.");
          setCaptchaToken(null);
          return;
        }

        throw new Error("Failed to send message");
      }

      setValues({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });

      router.push("/success");
    } catch (error) {
      console.error(error);
      router.push("/error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-0 flex h-fit w-full items-center md:mt-12 lg:h-[600px]">
      {/* desktop */}
      <div className="relative mx-auto hidden h-[690px] w-5/6 md:block lg:w-4/6 xl:w-3/6">
        <div className="bg-primary-50 flex h-full w-4/5 flex-col items-start justify-center p-8">
          <h1 className="self-center text-2xl font-semibold">Write To Us</h1>

          <form
            onSubmit={handleSubmit}
            className="flex h-full w-4/5 flex-col justify-evenly space-y-2 py-3"
            noValidate
          >
            {/* Full Name */}
            <div className="grid space-y-1">
              <label htmlFor="fullName" className="font-semibold">
                Full Name
              </label>
              <div
                className={`focus-within:border-secondary-600 flex items-center gap-3 rounded-lg border bg-white px-4 py-1.5 shadow-md ${
                  errors.fullName
                    ? "border-red-700"
                    : values.fullName &&
                        !validateField("fullName", values.fullName)
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <input
                  name="fullName"
                  type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg bg-white placeholder:text-sm focus:pl-3 focus:shadow-none focus:transition-all focus:duration-500 focus:outline-none"
                />
                {errors.fullName && <CircleAlert className="text-red-600" />}
                {values.fullName &&
                  !validateField("fullName", values.fullName) && (
                    <CheckCircle className="text-green-600" />
                  )}
              </div>

              {errors.fullName && (
                <p className="text-xs text-red-600">{errors.fullName}</p>
              )}
              {values.fullName &&
                !validateField("fullName", values.fullName) && (
                  <p className="text-xs text-green-600">All set!</p>
                )}
            </div>

            {/* Email */}
            <div className="grid space-y-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <div
                className={`focus-within:border-secondary-600 flex items-center gap-3 rounded-lg border bg-white px-4 py-1.5 shadow-md ${
                  errors.email
                    ? "border-red-700"
                    : values.email && !validateField("email", values.email)
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  className="w-full rounded-lg bg-white placeholder:text-sm focus:pl-3 focus:shadow-none focus:transition-all focus:duration-500 focus:outline-none"
                />
                {errors.email && <CircleAlert className="text-red-600" />}
                {values.email && !validateField("email", values.email) && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>

              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
              {values.email && !validateField("email", values.email) && (
                <p className="text-xs text-green-600">All set!</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="grid space-y-1">
              <label htmlFor="phoneNumber" className="font-semibold">
                Phone Number
              </label>
              <div
                className={`focus-within:border-secondary-600 flex items-center gap-3 rounded-lg border bg-white px-4 py-1.5 shadow-md ${
                  errors.phoneNumber
                    ? "border-red-700"
                    : values.phoneNumber &&
                        !validateField("phoneNumber", values.phoneNumber)
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <input
                  name="phoneNumber"
                  type="tel"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="07730482940"
                  className="w-full rounded-lg bg-white placeholder:text-sm focus:pl-3 focus:shadow-none focus:transition-all focus:duration-500 focus:outline-none"
                />
                {errors.phoneNumber && <CircleAlert className="text-red-600" />}
                {values.phoneNumber &&
                  !validateField("phoneNumber", values.phoneNumber) && (
                    <CheckCircle className="text-green-600" />
                  )}
              </div>

              {errors.phoneNumber && (
                <p className="text-xs text-red-600">{errors.phoneNumber}</p>
              )}
              {values.phoneNumber &&
                !validateField("phoneNumber", values.phoneNumber) && (
                  <p className="text-xs text-green-600">All set!</p>
                )}
            </div>

            {/* Message */}
            <div className="grid space-y-1">
              <label htmlFor="message" className="font-semibold">
                Message
              </label>
              <div
                className={`focus-within:border-secondary-600 flex items-center gap-3 rounded-lg border bg-white px-4 py-1.5 shadow-md ${
                  errors.message
                    ? "border-red-700"
                    : values.message &&
                        !validateField("message", values.message)
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <textarea
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full rounded-lg bg-white placeholder:text-sm focus:pl-3 focus:shadow-none focus:transition-all focus:duration-500 focus:outline-none"
                />
              </div>

              {errors.message && (
                <p className="text-xs text-red-600">{errors.message}</p>
              )}
              {values.message && !validateField("message", values.message) && (
                <p className="text-xs text-green-600">All set!</p>
              )}
            </div>
            <Turnstile
              key={turnstileKey}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => {
                setCaptchaToken(token);
                setCaptchaError(null);
              }}
              onExpire={() => {
                setCaptchaToken(null);
                setCaptchaError("Captcha expired. Please verify again.");
                setTurnstileKey((k) => k + 1);
              }}
              onError={() => {
                setCaptchaToken(null);
                setCaptchaError("Captcha failed. Please try again.");
                setTurnstileKey((k) => k + 1);
              }}
            />

            {captchaError && (
              <p className="mt-1 text-xs text-red-600">{captchaError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-2 w-3/5 self-center rounded-lg py-2 text-white hover:cursor-pointer hover:border disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* info section */}
        <div className="bg-primary absolute top-40 -right-5 flex h-[300px] w-[270px] flex-col items-start justify-center space-y-10 p-4 text-white [@media(min-width:1279px)_and_(max-width:1500px)]:-right-12 [@media(min-width:767px)_and_(max-width:830px)]:-right-14">
          <a
            href="tel:+442089878046"
            className="flex items-center space-x-2 hover:underline"
          >
            <PhoneCallIcon size={16} />
            <span className="text-sm">020 8987 8046</span>
          </a>

          <a
            href="mailto:info@londonminibusrental.co.uk"
            className="flex items-center space-x-2 hover:underline"
          >
            <MailIcon size={16} />
            <span className="text-sm">info@londonminibusrental.co.uk</span>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=SE15+2UQ+Peckham+London"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:underline"
          >
            <MapPin size={16} />
            <span className="text-sm">SE15 2UQ, Peckham, London</span>
          </a>
        </div>
      </div>

      {/* mobile */}
      <div className="flex w-full flex-col items-center justify-center space-y-4 overflow-hidden md:hidden">
        <div className="bg-primary-50 mx-auto flex h-full w-4/5 flex-col items-center justify-center p-3">
          <h1 className="self-center text-2xl font-semibold">Write To Us</h1>

          <form
            onSubmit={handleSubmit}
            className="flex h-full w-4/5 flex-col justify-evenly space-y-4 py-3"
            noValidate
          >
            {/* Full Name */}
            <div className="grid space-y-1">
              <label htmlFor="fullName" className="font-semibold">
                Full Name
              </label>
              <div
                className={`focus-within:border-secondary-600 flex items-center gap-3 rounded-lg border bg-white px-2 py-1.5 shadow-md ${
                  errors.fullName
                    ? "border-red-700"
                    : values.fullName &&
                        !validateField("fullName", values.fullName)
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <input
                  name="fullName"
                  type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg bg-white p-2 shadow-sm focus:outline-none"
                />
                {errors.fullName && <CircleAlert className="text-red-600" />}
                {values.fullName &&
                  !validateField("fullName", values.fullName) && (
                    <CheckCircle className="text-green-600" />
                  )}
              </div>

              {errors.fullName && (
                <p className="text-xs text-red-600">{errors.fullName}</p>
              )}
              {values.fullName &&
                !validateField("fullName", values.fullName) && (
                  <p className="text-xs text-green-600">All set!</p>
                )}
            </div>

            {/* Email */}
            <div className="grid space-y-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>

              <div
                className={`focus-within:border-secondary-600 flex items-center gap-3 rounded-lg border bg-white px-2 py-1.5 shadow-md ${
                  errors.email
                    ? "border-red-700"
                    : values.email && !validateField("email", values.email)
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  className="w-full rounded-lg bg-white p-2 shadow-sm"
                />
                {errors.email && <CircleAlert className="text-red-600" />}
                {values.email && !validateField("email", values.email) && (
                  <CheckCircle className="text-green-600" />
                )}
              </div>

              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
              {values.email && !validateField("email", values.email) && (
                <p className="text-xs text-green-600">All set!</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="grid space-y-1">
              <label htmlFor="phoneNumber" className="font-semibold">
                Phone Number
              </label>
              <div
                className={`focus-within:border-secondary-600 flex items-center gap-3 rounded-lg border bg-white px-2 py-1.5 shadow-md ${
                  errors.phoneNumber
                    ? "border-red-700"
                    : values.phoneNumber &&
                        !validateField("phoneNumber", values.phoneNumber)
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <input
                  name="phoneNumber"
                  type="tel"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="07730482940"
                  className="w-full rounded-lg bg-white p-2 shadow-sm outline-none"
                />
                {errors.phoneNumber && <CircleAlert className="text-red-600" />}
                {values.phoneNumber &&
                  !validateField("phoneNumber", values.phoneNumber) && (
                    <CheckCircle className="text-green-600" />
                  )}
              </div>

              {errors.phoneNumber && (
                <p className="text-xs text-red-600">{errors.phoneNumber}</p>
              )}
              {values.phoneNumber &&
                !validateField("phoneNumber", values.phoneNumber) && (
                  <p className="text-xs text-green-600">All set!</p>
                )}
            </div>

            {/* Message */}
            <div className="grid space-y-1">
              <label htmlFor="message" className="font-semibold">
                Message
              </label>
              <div
                className={`focus-within:border-secondary-600 flex items-center gap-3 rounded-lg border bg-white px-2 py-1.5 shadow-md ${
                  errors.message
                    ? "border-red-700"
                    : values.message &&
                        !validateField("message", values.message)
                      ? "border-green-500"
                      : "border-slate-100"
                }`}
              >
                <textarea
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full rounded-lg bg-white p-2 shadow-sm outline-none"
                />
              </div>

              {errors.message && (
                <p className="text-xs text-red-600">{errors.message}</p>
              )}
              {values.message && !validateField("message", values.message) && (
                <p className="text-xs text-green-600">All set!</p>
              )}
            </div>

            {/* Captcha */}
            <div className="w-full">
              <div className="origin-left scale-75">
                <Turnstile
                  key={turnstileKey}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => {
                    setCaptchaToken(token);
                    setCaptchaError(null);
                  }}
                  onExpire={() => {
                    setCaptchaToken(null);
                    setCaptchaError("Captcha expired. Please verify again.");
                    setTurnstileKey((k) => k + 1);
                  }}
                  onError={() => {
                    setCaptchaToken(null);
                    setCaptchaError("Captcha failed. Please try again.");
                    setTurnstileKey((k) => k + 1);
                  }}
                />
              </div>

              {captchaError && (
                <p className="mt-1 text-left text-xs text-red-600">
                  {captchaError}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-700 mt-2 w-3/5 self-center rounded-lg py-2 text-white disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* second div */}

        <div className="bg-primary top-40 right-0 flex h-[300px] w-4/5 flex-col items-start justify-center space-y-10 px-8 text-white">
          <a
            href="tel:+442089878046"
            className="flex items-center space-x-2 hover:underline"
          >
            <PhoneCallIcon size={16} />
            <span>020 8987 8046</span>
          </a>

          <a
            href="mailto:info@londonminibusrental.co.uk"
            className="flex items-center space-x-2 hover:underline"
          >
            <MailIcon size={16} />
            <span>info@londonminibusrental.co.uk</span>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=SE15+2UQ+Peckham+London"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:underline"
          >
            <MapPin size={16} />
            <span>SE15 2UQ, Peckham, London</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
