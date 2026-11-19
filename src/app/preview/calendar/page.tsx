import type { Metadata } from "next";
import { CalendarPage } from "@/components/templates/calendar-page";

export const metadata: Metadata = { title: "Calendar" };

export default function Preview() {
  return <CalendarPage />;
}
