"use client";

import type { Key } from "react";

import {
  Autocomplete,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  Spinner,
} from "@heroui/react";
import { MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "tailwind-variants";

type LocationItem = {
  description: string;
};

type LocationAutocompleteFieldProps = {
  label: string;
  placeholder: string;
  searchPlaceholder?: string;
  value: string;
  error?: string;
  valid?: boolean;
  tone?: "light" | "white";
  onChange: (value: string) => void;
};

function fieldBorderClass(error?: string, valid?: boolean) {
  if (error) return "border-red-700";
  if (valid) return "border-green-500";
  return "border-slate-100";
}

function fieldToneClass(tone: "light" | "white") {
  return tone === "white" ? "bg-white" : "bg-slate-50";
}

export function LocationAutocompleteField({
  label,
  placeholder,
  searchPlaceholder = "Search locations...",
  value,
  error,
  valid,
  tone = "white",
  onChange,
}: LocationAutocompleteFieldProps) {
  const [filterText, setFilterText] = useState("");
  const [items, setItems] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const input = filterText.trim();

    if (input.length < 3) {
      return;
    }

    const controller = new AbortController();
    const loadingTimer = window.setTimeout(() => setIsLoading(true), 0);

    fetch(`/api/address-suggestions?input=${encodeURIComponent(input)}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) return [];

        const data = await res.json();
        return Array.isArray(data.suggestions) ? data.suggestions : [];
      })
      .then((suggestions: string[]) => {
        setItems(
          suggestions.map((suggestion) => ({
            description: suggestion,
          })),
        );
      })
      .catch((err) => {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setItems([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      window.clearTimeout(loadingTimer);
      controller.abort();
    };
  }, [filterText]);

  const selectedKey = value || null;
  const visibleItems = filterText.trim().length < 3 ? [] : items;
  const showLoading = filterText.trim().length >= 3 && isLoading;

  const handleSelectionChange = (key: Key | null) => {
    const nextValue = key ? String(key) : "";
    onChange(nextValue);
    setFilterText("");
  };

  return (
    <div className="space-y-1 font-medium text-neutral-700">
      <Autocomplete<LocationItem>
        allowsEmptyCollection
        className="w-full"
        onClear={() => handleSelectionChange(null)}
        onSelectionChange={handleSelectionChange}
        placeholder={placeholder}
        selectedKey={selectedKey}
        selectionMode="single"
      >
        <Label>{label}</Label>
        <Autocomplete.Trigger
          className={cn(
            "focus-within:border-secondary-600 mt-2 flex h-14 min-h-14 items-center gap-3 rounded-xl border px-4 py-0 shadow-sm transition hover:shadow-md",
            fieldToneClass(tone),
            fieldBorderClass(error, valid),
          )}
        >
          <MapPin size={18} className="shrink-0 text-slate-500" />
          <Autocomplete.Value className="min-w-0 flex-1 font-semibold text-black">
            {value || <span className="text-slate-400">{placeholder}</span>}
          </Autocomplete.Value>
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter
            inputValue={filterText}
            onInputChange={setFilterText}
          >
            <SearchField
              autoFocus
              className="sticky top-0 z-10"
              name={`${label.toLowerCase().replace(/\s+/g, "-")}-search`}
              variant="secondary"
            >
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder={searchPlaceholder} />
                <Spinner
                  color="current"
                  size="sm"
                  className={cn("absolute top-1/2 right-2 -translate-y-1/2", {
                    "pointer-events-none opacity-0": !showLoading,
                  })}
                />
                <SearchField.ClearButton
                  className={cn({
                    "pointer-events-none opacity-0": showLoading,
                  })}
                />
              </SearchField.Group>
            </SearchField>
            <ListBox
              className="max-h-[320px] overflow-y-auto"
              items={visibleItems}
              renderEmptyState={() => (
                <EmptyState>
                  {filterText.trim().length < 3
                    ? "Type at least 3 characters"
                    : showLoading
                      ? "Searching..."
                      : "No locations found"}
                </EmptyState>
              )}
            >
              {(item: LocationItem) => (
                <ListBox.Item
                  id={item.description}
                  textValue={item.description}
                >
                  {item.description}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              )}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {!error && valid ? (
        <p className="text-sm text-green-600">All set!</p>
      ) : null}
    </div>
  );
}
