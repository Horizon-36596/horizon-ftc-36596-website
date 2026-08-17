import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Prose } from '@/components/Prose';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { ArrowUpRight, Instagram, Mail } from '@/components/Icon';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Horizon about sponsorship, joining the team, mentoring, or collaborating. We read everything and we answer.',
};

// Three audiences arrive here for three different reasons, so the page says so
// plainly instead of giving everyone one undifferentiated "contact us" box. The
// form's first question is which one you are.
const AUDIENCES = [
  {
    heading: 'Sponsors',
    body: 'Ask for the sponsorship package, an invoice, or a meeting. In-kind support counts.',
  },
  {
    heading: 'Students',
    body: 'We are recruiting through the summer and the offseason. No prior experience needed.',
  },
  {
    heading: 'Teams and mentors',
    body: 'We support seven other FTC teams. Ask for help, or offer it.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lead={
          <p>
            One inbox, four people reading it. Sponsorship, joining the team, or
            anything else — it all comes to the same place.
          </p>
        }
      />

      <Section tone="sunk">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <Reveal>
            <h2 className="text-[1.5rem] font-light text-haze-50">
              Send us a message
            </h2>
            <p className="mt-3 font-prose text-[1rem] leading-relaxed text-haze-400">
              Goes straight to the team inbox. Nothing is stored on this site.
            </p>
            <div className="mt-9">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card grain relative p-8 sm:p-10">
              <h2 className="text-[1.25rem] font-light text-haze-50">
                Direct routes
              </h2>

              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href={`mailto:${site.businessEmail}`}
                    className="group flex items-start gap-3.5 rounded-lg py-1 transition-colors duration-200"
                  >
                    <Mail
                      size={19}
                      className="mt-0.5 shrink-0 text-brand-500"
                    />
                    <span>
                      <span className="block text-[0.9375rem] text-haze-100 transition-colors group-hover:text-brand-300">
                        {site.businessEmail}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] text-haze-400">
                        Sponsorship, invoices, and partnerships
                      </span>
                    </span>
                  </a>
                </li>

                {site.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-3.5 rounded-lg py-1 transition-colors duration-200"
                    >
                      <Instagram
                        size={19}
                        className="mt-0.5 shrink-0 text-brand-500"
                      />
                      <span>
                        <span className="flex items-center gap-1.5 text-[0.9375rem] text-haze-100 transition-colors group-hover:text-brand-300">
                          {social.handle}
                          <ArrowUpRight
                            size={14}
                            className="text-haze-500 transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] text-haze-400">
                          Build updates, competitions, and the shop
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div aria-hidden className="rule-horizon my-8" />

              <dl className="space-y-4">
                {AUDIENCES.map((audience) => (
                  <div key={audience.heading}>
                    <dt className="text-[0.9375rem] text-brand-300">
                      {audience.heading}
                    </dt>
                    <dd className="mt-1.5 font-prose text-[0.9375rem] leading-relaxed text-haze-300">
                      {audience.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section glow>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Where we are</p>
          <h2 className="mt-5 text-display-sm font-light text-haze-50">
            {site.location}
          </h2>
          <Prose className="mx-auto mt-6 text-center">
            <p>
              A community team, so members come from across the area rather than
              one school. We meet year round.
            </p>
          </Prose>
        </Reveal>
      </Section>
    </>
  );
}
