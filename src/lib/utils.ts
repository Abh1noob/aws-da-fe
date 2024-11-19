import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const parseError = (error: unknown) => {
  switch (error) {
    case 401:
      return "Unauthorized";

    case 403:
      return "Forbidden";

    case 404:
      return "Not Found";

    case 500:
      return "Internal Server Error";

    default:
      return "Something went wrong";
  }
};
