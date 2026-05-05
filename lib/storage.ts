import fs from "fs";
import path from "path";
import { BookingFormState } from "@/lib/types/booking";

const file = path.join(process.cwd(), "data.json");

export function readBookings(): BookingFormState[] {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function saveBooking(b: BookingFormState) {
  const data = readBookings();
  data.push(b);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}