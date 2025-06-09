import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// valid email domains
export function getValidDomains() {
  const domains = ["gmail.com", "yahoo.com", "web.de", "world.com"];
  // for testing
  if (process.env.NODE_ENV === "development") {
    domains.push("example.com");
  }

  return domains;
}

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/s+/g, " ") // trim additional space
    .replace(/[^a-zA-Z\s'-]/g, "") // bob34tim > bobtim
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize beginnings of words
}
