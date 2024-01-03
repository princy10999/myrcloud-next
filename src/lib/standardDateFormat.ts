import { format, formatDistance } from "date-fns";

export function standardDateFormat(date: string) {
  return date ? format(new Date(date), "do MMM yyyy") : "";
}
export function standardDateFormatDistance(date: string) {
  return date ? formatDistance(new Date(date), new Date()) : "";
}
