import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RoiCalculatorPage } from '@/components/roi-calculator-page'
import { getAvailabilityLabel } from '@/lib/availability'
import { getTranslator, isLocale, locales, type Locale } from '@/lib/i18n'

type PageProps = {
  params: Promise<{ locale: string }>
}

export const revalidate = 43200

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    return {}
  }

  const t = getTranslator(locale)

  return {
    title: t({
      en: 'ROI Calculator | Maxime Ferret',
      fr: 'Calculateur ROI | Maxime Ferret'
    }),
    description: t({
      en: 'Estimate yearly time and money savings from automating repetitive tasks.',
      fr: "Estimez les gains annuels en temps et en argent de l'automatisation de vos tâches répétitives."
    }),
    alternates: {
      canonical: `/${locale}/calculate-roi`,
      languages: {
        en: '/en/calculate-roi',
        fr: '/fr/calculate-roi'
      }
    },
    openGraph: {
      title: t({
        en: 'ROI Calculator | Maxime Ferret',
        fr: 'Calculateur ROI | Maxime Ferret'
      }),
      description: t({
        en: 'Project your yearly ROI with a simple automation cost calculator.',
        fr: "Projetez votre ROI annuel avec un calculateur simple de gains d'automatisation."
      }),
      url: `https://maxime-ferret.vercel.app/${locale}/calculate-roi`,
      images: [
        `https://maxime-ferret.vercel.app/assets/linkshare/calculate-roi/${locale}.png`
      ],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: t({
        en: 'ROI Calculator | Maxime Ferret',
        fr: 'Calculateur ROI | Maxime Ferret'
      }),
      description: t({
        en: 'Estimate your yearly return from automation in under a minute.',
        fr: "Estimez votre retour annuel de l'automatisation en moins d'une minute."
      }),
      images: [
        `https://maxime-ferret.vercel.app/assets/linkshare/calculate-roi/${locale}.png`
      ]
    }
  }
}

export default async function CalculateRoiPage({ params }: PageProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const availabilityLabel = getAvailabilityLabel(locale as Locale)

  return (
    <RoiCalculatorPage
      locale={locale as Locale}
      availabilityLabel={availabilityLabel}
    />
  )
}
