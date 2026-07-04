"use client";

import type { TimeValue } from "@heroui/react";

import {
  Calendar,
  DateField,
  DatePicker,
  InputGroup,
  I18nProvider,
  Label,
  TimeField,
} from "@heroui/react";
import { parseDate, parseZonedDateTime } from "@internationalized/date";
import { CheckCircle, CircleAlert } from "lucide-react";
import React from "react";

type FieldTone = "light" | "white";

const fieldShell =
  "focus-within:border-secondary-600 mt-2 flex h-14 min-h-14 items-center gap-3 rounded-xl border px-4 py-0 shadow-sm transition hover:shadow-md";

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

function parseGMTDateTime(dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) return null;

  try {
    return parseZonedDateTime(`${dateValue}T${timeValue}:00[UTC]`);
  } catch {
    return null;
  }
}

function formatPart(value: number) {
  return String(value).padStart(2, "0");
}

function getDateTimeParts(value: unknown) {
  const dateValue = value as {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
  };

  if (!dateValue.year || !dateValue.month || !dateValue.day) {
    return { date: "", time: "" };
  }

  return {
    date: `${dateValue.year}-${formatPart(dateValue.month)}-${formatPart(
      dateValue.day,
    )}`,
    time: `${formatPart(dateValue.hour ?? 0)}:00`,
  };
}

function FieldMessage({ error, valid }: { error?: string; valid?: boolean }) {
  const hasError = Boolean(error);

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!hasError && valid) {
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
  return (
    <InputGroup.Input
      {...props}
      className={`${inputClass} ${props.className ?? ""}`}
    />
  );
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
        minValue={minValue ? (parseISODate(minValue) ?? undefined) : undefined}
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

export function HeroDateTimePickerField({
  label,
  value,
  timeValue,
  onChange,
  error,
  valid,
  tone = "white",
  minDateTime,
}: {
  label: string;
  value: string;
  timeValue: string;
  onChange: (nextValue: { date: string; time: string }) => void;
  error?: string;
  valid?: boolean;
  tone?: FieldTone;
  minDateTime?: { date: string; time: string };
}) {
  const parsedValue = parseGMTDateTime(value, timeValue);
  const parsedMinValue = minDateTime
    ? parseGMTDateTime(minDateTime.date, minDateTime.time)
    : null;

  return (
    <div className="space-y-1 font-medium text-neutral-700">
      <I18nProvider locale="en-GB">
        <DatePicker
          value={parsedValue}
          minValue={parsedMinValue ?? undefined}
          granularity="hour"
          hideTimeZone={false}
          hourCycle={12}
          onChange={(date) => onChange(getDateTimeParts(date))}
          className="w-full"
        >
          {({ state }) => (
            <>
              <Label>{label}</Label>
              <DateField.Group
                fullWidth
                variant="secondary"
                className={`${fieldShell} ${fieldToneClass(
                  tone,
                )} ${fieldBorderClass(error, valid)}`}
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
              <DatePicker.Popover className="flex flex-col gap-3">
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
                      {(day) => (
                        <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                      )}
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
                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3">
                  <Label>Time (GMT)</Label>
                  <TimeField
                    aria-label={`${label} time`}
                    granularity="hour"
                    hideTimeZone={false}
                    hourCycle={12}
                    value={state.timeValue}
                    onChange={(nextTime) => {
                      if (nextTime) {
                        state.setTimeValue(nextTime as TimeValue);
                      }
                    }}
                  >
                    <TimeField.Group variant="secondary">
                      <TimeField.Input>
                        {(segment) => <TimeField.Segment segment={segment} />}
                      </TimeField.Input>
                    </TimeField.Group>
                  </TimeField>
                </div>
              </DatePicker.Popover>
            </>
          )}
        </DatePicker>
      </I18nProvider>
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
