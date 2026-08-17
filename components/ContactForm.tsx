'use client';

import { useState } from 'react';
import { site } from '@/lib/site';
import { ArrowRight, Mail } from '@/components/Icon';

// ---------------------------------------------------------------------------
// WHERE SUBMISSIONS GO
//
// The site is a static export on GitHub Pages, so there is no server of ours to
// receive a POST. The form posts to FormSubmit instead, which forwards the
// message straight to the team inbox as an email. Nothing is stored on this
// site and no third-party script runs on the page — it is one fetch on submit.
//
// FIRST SUBMISSION ONLY: FormSubmit emails the inbox a one-time confirmation
// link. Until somebody clicks it, messages are held rather than delivered, so
// send one test message and confirm it before pointing anyone at this page.
//
// TO REDUCE SPAM LATER: after activating, FormSubmit issues a hashed endpoint
// for the same inbox. Swap the email below for that hash and the address stops
// appearing in the page source. Anything that accepts a plain form POST works
// here — Formspree, Getform, Basin — just replace the URL.
//
// If the request fails for any reason, the form falls back to opening the
// sender's mail client with the message already written out, so a submission is
// never silently lost.
// ---------------------------------------------------------------------------
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${site.formInbox}`;

const REASONS = [
  { value: 'sponsor', label: 'Sponsoring Horizon' },
  { value: 'join', label: 'Joining the team' },
  { value: 'mentor', label: 'Mentoring or collaborating' },
  { value: 'other', label: 'Something else' },
] as const;

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    organization: '',
    reason: 'sponsor',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  // Bot trap. A real person never sees this field, so anything in it is spam
  // and FormSubmit drops the submission on its side.
  const [honeypot, setHoneypot] = useState('');
  // Fields validate on blur, then live once they have already errored.
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'handed-off' | 'failed'
  >('idle');

  function validate(next = values): Errors {
    const found: Errors = {};
    if (!next.name.trim()) found.name = 'Please tell us who you are.';
    if (!next.email.trim()) {
      found.email = 'We need an address to reply to.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(next.email.trim())) {
      found.email = 'That address looks incomplete.';
    }
    if (!next.message.trim())
      found.message = 'Add a note so we know what to say back.';
    return found;
  }

  function update(field: keyof typeof values, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  }

  function blur(field: keyof typeof values) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  }

  const reasonLabel = () =>
    REASONS.find((r) => r.value === values.reason)?.label ?? 'Contact';

  function handOffToMailClient() {
    const reason = reasonLabel();
    const body = [
      `Name: ${values.name}`,
      values.organization ? `Organization: ${values.organization}` : null,
      `Email: ${values.email}`,
      `About: ${reason}`,
      '',
      values.message,
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${site.formInbox}?subject=${encodeURIComponent(
      `[Website] ${reason} — ${values.name}`,
    )}&body=${encodeURIComponent(body)}`;
    setStatus('handed-off');
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users
      // aren't left guessing why nothing happened.
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      handOffToMailClient();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          organization: values.organization || '—',
          about: reasonLabel(),
          message: values.message,
          // FormSubmit's own fields: the subject line the team sees, a table
          // layout in the email, and its built-in honeypot.
          _subject: `[Website] ${reasonLabel()} — ${values.name}`,
          _template: 'table',
          _captcha: 'false',
          _honey: honeypot,
        }),
      });

      if (!response.ok) throw new Error(String(response.status));

      setStatus('sent');
      setValues({
        name: '',
        email: '',
        organization: '',
        reason: 'sponsor',
        message: '',
      });
      setTouched({});
    } catch {
      // Never lose a message to a failed request: fall back to the sender's
      // own mail client with everything already written out.
      handOffToMailClient();
    }
  }

  const fieldClass =
    'w-full rounded-lg border border-night-700 bg-night-900 px-4 py-3 text-[0.9375rem] text-haze-100 placeholder:text-haze-600 transition-colors duration-200 hover:border-night-600 focus:border-brand-500/70';

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          error={touched.name ? errors.name : undefined}
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => blur('name')}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={
              touched.name && errors.name ? 'name-error' : undefined
            }
            className={fieldClass}
          />
        </Field>

        <Field id="organization" label="Company or school" optional>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={(e) => update('organization', e.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="email"
          label="Email"
          error={touched.email ? errors.email : undefined}
        >
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => blur('email')}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={
              touched.email && errors.email ? 'email-error' : undefined
            }
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="reason" label="What is this about?">
          <select
            id="reason"
            name="reason"
            value={values.reason}
            onChange={(e) => update('reason', e.target.value)}
            className={`${fieldClass} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a08fa8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            {REASONS.map((r) => (
              <option key={r.value} value={r.value} className="bg-night-900">
                {r.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="message"
          label="Message"
          error={touched.message ? errors.message : undefined}
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            onBlur={() => blur('message')}
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={
              touched.message && errors.message ? 'message-error' : undefined
            }
            className={`${fieldClass} resize-y`}
          />
        </Field>
      </div>

      <input
        type="text"
        name="_honey"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary">
          {status === 'sending' ? 'Sending…' : 'Send message'}
          <ArrowRight size={17} />
        </button>
        <p className="font-prose text-[0.875rem] text-haze-400">
          Or write to{' '}
          <a
            href={`mailto:${site.businessEmail}`}
            className="text-brand-300 underline decoration-brand-500/40 underline-offset-4 transition-colors hover:decoration-brand-500"
          >
            {site.businessEmail}
          </a>
          .
        </p>
      </div>

      <p
        aria-live="polite"
        className="mt-5 min-h-[1.5rem] font-prose text-[0.9375rem] text-haze-300"
      >
        {status === 'sent' ? (
          <span className="inline-flex items-center gap-2 text-brand-300">
            <Mail size={17} />
            Sent. It is in the team inbox and one of us will reply.
          </span>
        ) : null}
        {status === 'handed-off' ? (
          <span className="inline-flex items-center gap-2 text-brand-300">
            <Mail size={17} />
            We could not reach our form service, so your email app should be
            open with the message ready. Press send and it reaches us.
          </span>
        ) : null}
        {status === 'failed'
          ? 'That did not go through. Please email us directly and we will pick it up.'
          : null}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-2 text-[0.875rem] text-haze-200"
      >
        {label}
        {optional ? (
          <span className="text-[0.75rem] text-haze-500">optional</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-[0.8125rem] text-brand-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
