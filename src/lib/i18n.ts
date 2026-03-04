export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getTranslator(locale: Locale) {
  return function t<T>(values: Record<Locale, T>) {
    return values[locale];
  };
}
