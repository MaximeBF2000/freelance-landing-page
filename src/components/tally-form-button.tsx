'use client'

import { useState, SubmitEvent } from 'react'
import { CheckCircle2, MessageCircleMore, Send, X, XIcon } from 'lucide-react'
import { getTranslator, type Locale } from '@/lib/i18n'

function sanitizeValueForPostRequest(value: any) {
  // Basic sanitization: remove script tags and trim whitespace
  if (typeof value !== 'string') return ''
  let sanitized = value.replace(/<script.*?>.*?<\/script>/gi, '')
  sanitized = sanitized.replace(/[<>]/g, '') // Remove angle brackets
  sanitized = sanitized.trim()
  return sanitized
}

type TallyFormButtonProps = {
  locale: Locale
}

export const TallyFormButton = ({ locale }: TallyFormButtonProps) => {
  const t = getTranslator(locale)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submissionState, setSubmissionState] = useState<'idle' | 'success'>(
    'idle'
  )

  const closeForm = () => {
    setFormOpen(false)
    setTimeout(() => {
      setError(null)
      setSubmissionState('idle')
      setMessage('')
    }, 500)
  }

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    // console.log(e)
    let respondentUuid = localStorage.getItem('tally-respondent-uuid')

    if (!respondentUuid) {
      respondentUuid = crypto.randomUUID()
      localStorage.setItem('tally-respondent-uuid', respondentUuid)
    }

    let emailValue = sanitizeValueForPostRequest(email)
    let messageValue = sanitizeValueForPostRequest(message)

    const payload = JSON.stringify({
      sessionUuid: crypto.randomUUID(),
      respondentUuid: respondentUuid,
      responses: {
        '3bc28504-5423-4901-8fa3-39dba7ad770c': emailValue,
        'b91e8ce7-3717-4ba7-9a9f-1b7fec3259ee': messageValue
      },
      captchas: {},
      isCompleted: true,
      password: null
    })

    fetch('https://api.tally.so/forms/Gx0Loo/respond', {
      headers: {
        accept: 'application/json, text/plain, */*',
        // 'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/json',
        priority: 'u=1, i',
        // 'sec-ch-ua':
        //   '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
        // 'sec-ch-ua-mobile': '?0',
        // 'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        // 'sec-fetch-storage-access': 'active',
        'tally-version': '2025-01-15'
      },
      referrer: 'https://tally.so/',
      body: payload,
      method: 'POST',
      mode: 'cors',
      credentials: 'omit'
    })
      .then(() => setSubmissionState('success'))
      .catch(() => {
        setError(
          t({
            en: 'Something went wrong. Please try again.',
            fr: "Une erreur s'est produite. Merci de réessayer."
          })
        )
      })
  }

  return (
    <div
      id="tally-form-button"
      className="fixed right-4 bottom-4 z-50 flex flex-col items-end sm:right-6 sm:bottom-6"
    >
      <div
        className={`mb-3 w-[min(92vw,25rem)] origin-bottom-right overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white/95 shadow-[0_24px_60px_-28px_rgba(30,64,175,0.5)] backdrop-blur-xl transition-all duration-300 ${
          formOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-hidden={!formOpen}
      >
        <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black tracking-[0.18em] text-blue-600 uppercase">
                {t({ en: 'Quick contact', fr: 'Contact rapide' })}
              </p>
              <h3 className="text-xl font-black tracking-tight text-slate-900">
                {t({ en: 'Describe your need', fr: 'Décrivez votre besoin' })}
              </h3>
            </div>
            <button
              type="button"
              className="cursor-pointer rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition-colors hover:text-slate-900"
              onClick={closeForm}
              aria-label={t({ en: 'Close form', fr: 'Fermer le formulaire' })}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {submissionState === 'success' ? (
          <div className="flex flex-col items-start gap-4 p-5">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-extrabold tracking-[0.08em] uppercase">
                {t({ en: 'Message sent', fr: 'Message envoyé' })}
              </p>
            </div>
            <p className="text-sm leading-relaxed font-semibold text-slate-600">
              {t({
                en: 'Thanks, your request was sent successfully. I will get back to you shortly.',
                fr: 'Merci, votre demande a bien été envoyée. Je reviens vers vous rapidement.'
              })}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3 p-5">
            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="tally-contact-email"
                className="mb-1.5 block text-xs font-extrabold tracking-[0.08em] text-slate-500 uppercase"
              >
                {t({ en: 'Email', fr: 'Email' })}
              </label>
              <input
                id="tally-contact-email"
                type="email"
                placeholder={t({
                  en: 'name@company.com',
                  fr: 'nom@entreprise.com'
                })}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-[15px] font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="tally-contact-message"
                className="mb-1.5 block text-xs font-extrabold tracking-[0.08em] text-slate-500 uppercase"
              >
                {t({ en: 'Message', fr: 'Message' })}
              </label>
              <textarea
                id="tally-contact-message"
                placeholder={t({
                  en: 'Tell me your process, blockers, and expected outcome...',
                  fr: 'Expliquez votre processus, vos blocages et le résultat attendu...'
                })}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-[15px] font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-200"
                rows={10}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-extrabold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
            >
              {t({ en: 'Send request', fr: 'Envoyer la demande' })}
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>

      <button
        className="inline-flex cursor-pointer items-center justify-center rounded-full bg-blue-600 p-4 text-white shadow-2xl shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
        onClick={() => {
          if (formOpen) {
            closeForm()
            return
          }
          setFormOpen(true)
        }}
        aria-label={t({
          en: formOpen ? 'Close contact form' : 'Open contact form',
          fr: formOpen
            ? 'Fermer le formulaire de contact'
            : 'Ouvrir le formulaire de contact'
        })}
      >
        {!formOpen && (
          <MessageCircleMore className="h-6 w-6 transition-transform duration-300" />
        )}
        {formOpen && (
          <XIcon className="h-6 w-6 transition-transform duration-300" />
        )}
      </button>
    </div>
  )
}
