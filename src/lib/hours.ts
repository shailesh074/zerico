import type { OpeningHours, Weekday, DayHours } from "@/types";

const ORDER: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const LABELS: Record<Weekday, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};
const SHORT_TO_KEY: Record<string, Weekday> = {
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
  Sun: "sun",
};

export const weekdayOrder = ORDER;
export const weekdayLabel = (d: Weekday) => LABELS[d];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "20:00" -> "8:00 PM" */
export function formatTime12(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/** "8:00 AM – 10:00 PM" or "Closed" for a single day. */
export function formatDayRange(day: DayHours): string {
  if (day.closed) return "Closed";
  return `${formatTime12(day.open)} – ${formatTime12(day.close)}`;
}

/** Current weekday + minutes-since-midnight in a given IANA timezone. */
function nowInTimezone(timezone: string): { day: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = SHORT_TO_KEY[get("weekday")] ?? "mon";
  let hour = Number(get("hour"));
  if (hour === 24) hour = 0; // some environments emit "24" at midnight
  const minutes = hour * 60 + Number(get("minute"));
  return { day, minutes };
}

/** Current weekday key in a given timezone (for "today" highlighting). */
export function getCurrentWeekday(timezone: string): Weekday {
  return nowInTimezone(timezone).day;
}

export interface OpenState {
  isOpen: boolean;
  /** Short status line, e.g. "Open now" or "Closed". */
  label: string;
  /** Detail, e.g. "Closes 10:00 PM" or "Opens Mon 8:00 AM". */
  detail: string;
}

/**
 * Compute whether a business is open right now in its own timezone.
 * Handles same-day and overnight (close-after-midnight) ranges.
 */
export function getOpenState(
  hours: OpeningHours,
  timezone: string,
): OpenState {
  const { day, minutes } = nowInTimezone(timezone);
  const today = hours[day];

  if (today && !today.closed) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    const overnight = close <= open;
    const openNow = overnight
      ? minutes >= open || minutes < close
      : minutes >= open && minutes < close;
    if (openNow) {
      return {
        isOpen: true,
        label: "Open now",
        detail: `Closes ${formatTime12(today.close)}`,
      };
    }
    // Not yet open today but opens later today
    if (!overnight && minutes < open) {
      return {
        isOpen: false,
        label: "Closed",
        detail: `Opens ${formatTime12(today.open)}`,
      };
    }
  }

  // Find the next day that opens
  const startIdx = ORDER.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const nextKey = ORDER[(startIdx + i) % 7];
    const next = hours[nextKey];
    if (next && !next.closed) {
      const prefix = i === 1 ? "tomorrow" : weekdayLabel(nextKey);
      return {
        isOpen: false,
        label: "Closed",
        detail: `Opens ${prefix} ${formatTime12(next.open)}`,
      };
    }
  }

  return { isOpen: false, label: "Closed", detail: "" };
}
