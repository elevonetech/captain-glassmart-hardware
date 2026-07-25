import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PHONE, PHONE_HREF, EMAIL, ADDRESS, HOURS, WHATSAPP } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Captain Glassmart & Hardware" },
      { name: "description", content: "Get in touch with Captain Glassmart & Hardware. Call, WhatsApp, email or send us a message — quotes and enquiries welcome." },
      { property: "og:title", content: "Contact Captain Glassmart & Hardware" },
      { property: "og:description", content: "Get a quote. Make an enquiry. Chat on WhatsApp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <SiteLayout>
      <section className="relative bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="container-x relative py-20 md:py-28 max-w-4xl">
          <p className="eyebrow">Get in Touch</p>
          <h1 className="text-hero text-5xl md:text-7xl mt-4">
            Let's talk <span className="text-orange">business.</span>
          </h1>
          <p className="mt-6 text-white/70 max-w-2xl">
            Whether you need a bulk quote, product enquiry, or a specific hardware solution — our team is ready to help.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-12">
          {/* CONTACT INFO */}
          <div>
            <h2 className="text-hero text-3xl text-charcoal">Contact information</h2>
            <p className="mt-2 text-muted-foreground">Reach us through any of the channels below.</p>

            <div className="mt-8 space-y-4">
              {[
                { Icon: MapPin, t: "Visit Us", d: ADDRESS },
                { Icon: Phone, t: "Call Us", d: PHONE, href: PHONE_HREF },
                { Icon: Mail, t: "Email Us", d: EMAIL, href: `mailto:${EMAIL}` },
                { Icon: Clock, t: "Business Hours", d: HOURS },
              ].map(({ Icon, t, d, href }) => (
                <a
                  key={t}
                  href={href || "#"}
                  className="flex items-start gap-4 p-5 border border-border rounded-md bg-white hover:border-orange transition-colors"
                >
                  <div className="w-11 h-11 grid place-items-center rounded-md bg-orange/10 text-orange shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
                    <div className="text-sm font-semibold text-charcoal mt-1">{d}</div>
                  </div>
                </a>
              ))}
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-center gap-2 bg-charcoal text-white font-semibold px-6 py-4 rounded-md hover:bg-charcoal-2 transition"
            >
              <MessageCircle className="h-5 w-5 text-orange" /> Chat on WhatsApp
            </a>
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="p-6 md:p-10 bg-charcoal text-white rounded-md">
            <h2 className="text-hero text-3xl">Send us a message</h2>
            <p className="mt-2 text-white/60 text-sm">Fill in the form and we'll respond within one business day.</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" placeholder="Your full name" />
              <Field label="Phone" name="phone" placeholder="+254..." />
            </div>
            <div className="mt-4">
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="mt-4">
              <Field label="Subject" name="subject" placeholder="Quote request, enquiry, etc." />
            </div>
            <div className="mt-4">
              <label className="text-xs uppercase tracking-widest text-white/60">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us about your project..."
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="btn-orange btn-orange-hover">
                <Send className="h-4 w-4" /> Send Message
              </button>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost-light">
                <MessageCircle className="h-4 w-4" /> WhatsApp Instead
              </a>
            </div>

            {sent && (
              <p className="mt-4 text-sm text-orange">Thanks — your message has been queued. We'll be in touch shortly.</p>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-white/60">{label}</label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange"
      />
    </div>
  );
}
