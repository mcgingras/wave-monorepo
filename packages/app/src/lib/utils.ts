import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(timestamp: number) {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const timeDifference = currentTime - timestamp;

  // Define time intervals in seconds
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  // Find the appropriate interval
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const intervalValue = Math.floor(timeDifference / interval.seconds);

    if (intervalValue >= 1) {
      return `${intervalValue}${interval.label.charAt(0)}` + " ago";
    }
  }

  // If the timestamp is in the future, return 'just now'
  return "just now";
}
