import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { getAvailabilityLabel } from "@/lib/availability";
import { getTranslator, isLocale, locales, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 43200;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = getTranslator(locale);

  return {
    title: t({
      en: "Maxime Ferret | Automation & AI Expert",
      fr: "Maxime Ferret | Expert Automatisation & IA"
    }),
    description: t({
      en: "Automate your time-consuming processes with AI support, back-office automation, and custom software.",
      fr: "Automatisez vos processus chronophages avec IA, back-office simplifie et logiciels sur mesure."
    }),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr"
      }
    },
    openGraph: {
      title: t({
        en: "Maxime Ferret | Automation & AI Expert",
        fr: "Maxime Ferret | Expert Automatisation & IA"
      }),
      description: t({
        en: "Automate your time-consuming processes with AI support, back-office automation, and custom CRM.",
        fr: "Automatisez vos processus chronophages. IA, support, back-office et CRM sur mesure."
      }),
      url: `https://maxime-ferret.vercel.app/${locale}`,
      images: [`https://maxime-ferret.vercel.app/assets/linkshare-${locale}.png`],
      locale: locale === "fr" ? "fr_FR" : "en_US"
    },
    twitter: {
      card: "summary_large_image",
      title: t({
        en: "Maxime Ferret | Automation & AI Expert",
        fr: "Maxime Ferret | Expert Automatisation & IA"
      }),
      description: t({
        en: "Automate your time-consuming processes with AI support, back-office automation, and custom CRM.",
        fr: "Automatisez vos processus chronophages. IA, support, back-office et CRM sur mesure."
      }),
      images: [`https://maxime-ferret.vercel.app/assets/linkshare-${locale}.png`]
    }
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const availabilityLabel = getAvailabilityLabel(locale as Locale);

  return <LandingPage locale={locale as Locale} availabilityLabel={availabilityLabel} />;
}
