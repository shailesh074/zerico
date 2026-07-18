"use client";

import { useEffect, useState } from "react";
import type { OpeningHours, Weekday } from "@/types";
import {
  weekdayOrder,
  weekdayLabel,
  formatDayRange,
  getCurrentWeekday,
} from "@/lib/hours";
import { cn } from "@/lib/utils";

export function HoursTable({
  hours,
  timezone,
}: {
  hours: OpeningHours;
  timezone: string;
}) {
  const [today, setToday] = useState<Weekday | null>(null);

  useEffect(() => {
    setToday(getCurrentWeekday(timezone));
  }, [timezone]);

  return (
    <ul className="divide-y divide-line">
      {weekdayOrder.map((day) => {
        const isToday = day === today;
        const closed = hours[day]?.closed;
        return (
          <li
            key={day}
            className={cn(
              "flex items-center justify-between py-2.5 text-[0.95rem]",
              isToday ? "font-semibold text-ink" : "text-muted",
            )}
          >
            <span className="flex items-center gap-2">
              {weekdayLabel(day)}
              {isToday && (
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-accent">
                  Today
                </span>
              )}
            </span>
            <span className={cn(closed && "text-nonveg")}>
              {formatDayRange(hours[day])}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
