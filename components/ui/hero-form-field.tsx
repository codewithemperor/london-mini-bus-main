"use client";

import {
  Calendar,
  DateField,
  DatePicker,
  InputGroup,
  Label,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { CheckCircle, CircleAlert } from "lucide-react";
import React from "react";

type FieldTone = "light" | "white";

const fieldShell =
  "focus-within:border-secondary-600 mt-2 flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 shadow-sm transition hover:shadow-md";

const inputClass =
  "w-full min-w-0 bg-transparent font-semibold text-black placeholder-slate-400 outline-none";

function fieldToneClass(tone: FieldTone) {
  return tone === "white" ? "bg-white" : "bg-slate-50";
}

function fieldBorderClass(error?: string, valid?: boolean) {
  if (error) return "border-red-700";
  if (valid) return "border-green-500";
  return "border-slate-100";
}

function parseISODate(value: string) {
  if (!value) return null;

  try {
    return parseDate(value);
  } catch {
    return null;
  }
}

function FieldMessage({
  error,
  valid,
}: {
  error?: string;
  valid?: boolean;
}) {
  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (valid) {
    return <p className="text-sm text-green-600">All set!</p>;
  }

  return null;
}

export function HeroInputField({
  label,
  icon,
  error,
  valid,
  tone = "white",
  children,
  suffix,
}: {
  label: string | React.ReactNode;
  icon: React.ReactNode;
  error?: string;
  valid?: boolean;
  tone?: FieldTone;
  children: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <label className="space-y-1 font-medium text-neutral-700">
      {label}
      <InputGroup
        fullWidth
        className={`${fieldShell} ${fieldToneClass(tone)} ${fieldBorderClass(
          error,
          valid,
        )}`}
      >
        <InputGroup.Prefix className="text-slate-500">{icon}</InputGroup.Prefix>
        {children}
        {suffix && <InputGroup.Suffix>{suffix}</InputGroup.Suffix>}
      </InputGroup>
      <FieldMessage error={error} valid={valid} />
    </label>
  );
}

export function HeroTextInput(
  props: React.ComponentProps<typeof InputGroup.Input>,
) {
  return <InputGroup.Input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function HeroNativeSelect({
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full min-w-0 bg-transparent font-semibold outline-none ${className ?? ""}`}
    >
      {children}
    </select>
  );
}

export function HeroDatePickerField({
  label,
  value,
  onChange,
  error,
  valid,
  tone = "white",
  minValue,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  valid?: boolean;
  tone?: FieldTone;
  minValue?: string;
}) {
  return (
    <div className="space-y-1 font-medium text-neutral-700">
      <DatePicker
        value={parseISODate(value)}
        minValue={minValue ? parseISODate(minValue) ?? undefined : undefined}
        onChange={(date) => onChange(date ? date.toString() : "")}
        className="w-full"
      >
        <Label>{label}</Label>
        <DateField.Group
          fullWidth
          className={`${fieldShell} ${fieldToneClass(tone)} ${fieldBorderClass(
            error,
            valid,
          )}`}
        >
          <DateField.Input className="flex min-w-0 flex-1 items-center gap-0.5 font-semibold text-black">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger className="text-slate-500 outline-none">
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DatePicker.Popover>
          <Calendar aria-label={label}>
            <Calendar.Header>
              <Calendar.YearPickerTrigger>
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator />
              </Calendar.YearPickerTrigger>
              <Calendar.NavButton slot="previous" />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => <Calendar.Cell date={date} />}
              </Calendar.GridBody>
            </Calendar.Grid>
            <Calendar.YearPickerGrid>
              <Calendar.YearPickerGridBody>
                {({ year }) => <Calendar.YearPickerCell year={year} />}
              </Calendar.YearPickerGridBody>
            </Calendar.YearPickerGrid>
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>
      <FieldMessage error={error} valid={valid} />
    </div>
  );
}

export function FieldStateIcon({
  error,
  valid,
}: {
  error?: string;
  valid?: boolean;
}) {
  if (error) return <CircleAlert className="text-red-600" />;
  if (valid) return <CheckCircle className="text-green-600" />;
  return null;
}
