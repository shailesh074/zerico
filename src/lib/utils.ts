import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a numeric price with a business currency symbol, e.g. ₹ 240. */
export function formatPrice(amount: number, symbol = "₹") {
  const value = Number.isInteger(amount)
    ? amount.toLocaleString("en-IN")
    : amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  return `${symbol}${value}`;
}
