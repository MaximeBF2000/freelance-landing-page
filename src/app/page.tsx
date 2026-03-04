import { headers } from "next/headers";
import { redirect } from "next/navigation";

function getPreferredLocale(acceptLanguage: string | null): "en" | "fr" {
  if (!acceptLanguage) {
    return "en";
  }

  return acceptLanguage.toLowerCase().includes("fr") ? "fr" : "en";
}

export default async function RootPage() {
  const acceptLanguage = (await headers()).get("accept-language");
  const locale = getPreferredLocale(acceptLanguage);

  redirect(`/${locale}`);
}
