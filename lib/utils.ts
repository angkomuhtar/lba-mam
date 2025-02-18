import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToDay(start_date: Date, end_date: Date) {
  const days = moment
    .duration(moment(end_date).diff(moment(start_date)))
    .asDays()
    .toFixed(0);
  return parseInt(days) <= 0 ? 0 : days + " Hari";
}
