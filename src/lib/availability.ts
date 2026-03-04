import type { Locale } from "@/lib/i18n";

const MONTHS: Record<Locale, string[]> = {
  en: [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
  ],
  fr: [
    "JANVIER",
    "FÉVRIER",
    "MARS",
    "AVRIL",
    "MAI",
    "JUIN",
    "JUILLET",
    "AOÛT",
    "SEPTEMBRE",
    "OCTOBRE",
    "NOVEMBRE",
    "DÉCEMBRE"
  ]
};

function getTargetDate(today: Date): Date {
  const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const halfPoint = Math.ceil(daysInCurrentMonth / 2);
  const isAfterHalf = today.getDate() > halfPoint;

  return isAfterHalf
    ? new Date(today.getFullYear(), today.getMonth() + 1, 1)
    : new Date(today.getFullYear(), today.getMonth(), 1);
}

export function getAvailabilityLabel(locale: Locale, today = new Date()): string {
  const targetDate = getTargetDate(today);
  const month = MONTHS[locale][targetDate.getMonth()];

  return locale === "fr"
    ? `DISPONIBILITÉ : ${month} ${targetDate.getFullYear()}`
    : `AVAILABILITY: ${month} ${targetDate.getFullYear()}`;
}
