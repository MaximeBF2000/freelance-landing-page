'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  ChartNoAxesCombined,
  Clock3,
  Users
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { LandingAnimations } from '@/components/landing-animations'
import { getTranslator, type Locale } from '@/lib/i18n'

type RoiCalculatorPageProps = {
  locale: Locale
  availabilityLabel: string
}

function parseNumber(value: string) {
  const normalized = value.replace(',', '.')
  const parsed = Number(normalized)

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

export function RoiCalculatorPage({
  locale,
  availabilityLabel
}: RoiCalculatorPageProps) {
  const t = getTranslator(locale)
  const otherLocale = locale === 'fr' ? 'en' : 'fr'

  const [hoursPerWeek, setHoursPerWeek] = useState('6')
  const [employeeCount, setEmployeeCount] = useState('3')
  const [hourlyRate, setHourlyRate] = useState('32')

  const results = useMemo(() => {
    const hours = parseNumber(hoursPerWeek)
    const employees = parseNumber(employeeCount)
    const rate = parseNumber(hourlyRate)

    const weeklyHours = hours * employees
    const annualHours = weeklyHours * 52
    const annualSavings = annualHours * rate
    const monthlySavings = annualSavings / 12

    return {
      weeklyHours,
      annualHours,
      annualSavings,
      monthlySavings
    }
  }, [hoursPerWeek, employeeCount, hourlyRate])

  const numberFormatter = new Intl.NumberFormat(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    {
      maximumFractionDigits: 0
    }
  )

  const currencyFormatter = new Intl.NumberFormat(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }
  )

  return (
    <>
      <LandingAnimations />

      <div className="hero-bg-container">
        <div className="dot-grid" />
        <div className="blob -top-48 -left-24 h-[600px] w-[600px] animate-pulse bg-blue-200" />
        <div
          className="blob top-0 -right-24 h-[500px] w-[500px] animate-bounce bg-indigo-100"
          style={{ animationDuration: '10s' }}
        />
      </div>

      <nav className="glass-nav sticky top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-xl font-black tracking-tighter"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white shadow-lg shadow-blue-200">
              M
            </div>
            <span className="hidden md:inline">MAXIME FERRET</span>
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 text-[10px] font-black shadow-sm">
              <Link
                href="/en/calculate-roi"
                className={`cursor-pointer transition-opacity ${
                  locale === 'en'
                    ? 'text-blue-600'
                    : 'opacity-40 hover:opacity-100'
                }`}
              >
                🇺🇸 <span className="hidden md:ml-1 md:inline">EN</span>
              </Link>
              <span className="h-3 w-px bg-slate-200" />
              <Link
                href="/fr/calculate-roi"
                className={`cursor-pointer transition-opacity ${
                  locale === 'fr'
                    ? 'text-blue-600'
                    : 'opacity-40 hover:opacity-100'
                }`}
              >
                🇫🇷 <span className="hidden md:ml-1 md:inline">FR</span>
              </Link>
            </div>

            <a
              href="https://calendly.com/maximeferret/echange"
              target="_blank"
              className="rounded-full bg-blue-600 px-4 py-2 text-xs font-extrabold text-white shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 sm:text-sm md:px-5 md:py-2.5 md:text-sm"
              rel="noreferrer"
            >
              {t({ en: 'Book a call', fr: 'Réserver un appel' })}
            </a>
          </div>
        </div>
      </nav>

      <section className="relative px-6 pt-20 pb-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="reveal mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/50 px-4 py-1.5 text-[11px] font-black tracking-widest text-blue-700 shadow-sm">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            {availabilityLabel}
          </div>

          <h1 className="reveal mb-8 text-4xl leading-[1.05] font-[900] tracking-tight text-slate-900 sm:text-5xl md:text-7xl">
            {t({ en: 'Calculate your ', fr: 'Calculez votre ' })}
            <span className="text-blue-600">ROI</span>
            {t({ en: ' in 60 seconds.', fr: ' en 60 secondes.' })}
          </h1>

          <p className="reveal mx-auto max-w-3xl text-base leading-relaxed font-semibold text-slate-600 sm:text-lg md:text-2xl">
            {t({
              en: 'Estimate how much this repetitive task costs your team every year, then project the gains from automation.',
              fr: "Estimez combien cette tâche répétitive coûte à votre équipe chaque année, puis projetez les gains d'une automatisation."
            })}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-10 pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="reveal bento-card scale-card rounded-[3rem] bg-white p-8 shadow-sm lg:col-span-3 md:p-12">
            <h2 className="mb-8 text-3xl font-[900] tracking-tight text-slate-900 md:text-4xl">
              {t({ en: 'Task inputs', fr: 'Données de la tâche' })}
            </h2>

            <div className="space-y-8">
              <label className="block">
                <span className="mb-3 flex items-center gap-3 text-sm font-extrabold text-slate-700 uppercase">
                  <Clock3 className="h-5 w-5 text-blue-600" />
                  {t({
                    en: 'Hours per week per employee',
                    fr: 'Heures par semaine par employé'
                  })}
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={hoursPerWeek}
                  onChange={event => setHoursPerWeek(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-2xl font-black text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-3 flex items-center gap-3 text-sm font-extrabold text-slate-700 uppercase">
                  <Users className="h-5 w-5 text-blue-600" />
                  {t({
                    en: 'Employees doing this task',
                    fr: 'Employés concernés'
                  })}
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={employeeCount}
                  onChange={event => setEmployeeCount(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-2xl font-black text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-3 flex items-center gap-3 text-sm font-extrabold text-slate-700 uppercase">
                  <ChartNoAxesCombined className="h-5 w-5 text-blue-600" />
                  {t({ en: 'Average hourly rate', fr: 'Taux horaire moyen' })}
                </span>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg font-black text-slate-400">
                    €
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={hourlyRate}
                    onChange={event => setHourlyRate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pr-4 pl-10 text-2xl font-black text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="reveal bento-card scale-card rounded-[3rem] border-none bg-blue-600 p-8 text-white shadow-2xl shadow-blue-200 lg:col-span-2 md:p-12">
            <p className="mb-3 text-xs font-black tracking-[0.3em] text-blue-100 uppercase">
              {t({ en: 'Estimated yearly return', fr: 'Retour annuel estimé' })}
            </p>
            <p className="mb-10 text-4xl leading-none font-[900] tracking-tight md:text-6xl">
              {currencyFormatter.format(results.annualSavings)}
            </p>

            <div className="space-y-4 text-sm font-bold text-blue-100 md:text-base">
              <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                <span>
                  {t({
                    en: 'Hours recovered / year',
                    fr: 'Heures récupérées / an'
                  })}
                </span>
                <span className="text-lg font-black text-white">
                  {numberFormatter.format(results.annualHours)}h
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                <span>
                  {t({
                    en: 'Hours recovered / week',
                    fr: 'Heures récupérées / semaine'
                  })}
                </span>
                <span className="text-lg font-black text-white">
                  {numberFormatter.format(results.weeklyHours)}h
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                <span>
                  {t({
                    en: 'Value recovered / month',
                    fr: 'Valeur récupérée / mois'
                  })}
                </span>
                <span className="text-lg font-black text-white">
                  {currencyFormatter.format(results.monthlySavings)}
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed font-semibold text-blue-100/90">
              {t({
                en: 'Formula: hours/week x number of employees x hourly rate x 52 weeks.',
                fr: "Formule : heures/semaine x nombre d'employés x taux horaire x 52 semaines."
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="reveal relative overflow-hidden rounded-[4rem] bg-slate-900 p-8 text-center shadow-2xl md:p-20">
          <div className="absolute inset-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="relative z-10">
            <h2 className="mb-6 text-3xl font-black tracking-tighter text-white sm:text-4xl md:text-6xl">
              {t({
                en: 'Want this gain in real life?',
                fr: 'Vous voulez ce gain en vrai ?'
              })}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed font-semibold text-slate-300 sm:text-lg md:text-xl">
              {t({
                en: 'I can map your process and deliver the first automation quickly, with measurable ROI.',
                fr: 'Je peux cartographier votre process et livrer une première automatisation rapidement, avec un ROI mesurable.'
              })}
            </p>
            <a
              href="https://calendly.com/maximeferret/echange"
              target="_blank"
              className="inline-flex items-center gap-3 rounded-[2rem] bg-blue-600 px-8 py-4 text-base font-black text-white shadow-2xl shadow-blue-900/40 transition-all hover:scale-105 hover:bg-blue-500 active:scale-95 md:px-10 md:py-6 md:text-xl"
              rel="noreferrer"
            >
              {t({
                en: 'Book my audit call',
                fr: "Réserver mon appel d'audit"
              })}{' '}
              <Calendar className="h-7 w-7" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-extrabold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
          >
            {t({ en: 'Back to main page', fr: 'Retour à la page principale' })}
          </Link>
        </div>
      </section>
    </>
  )
}
