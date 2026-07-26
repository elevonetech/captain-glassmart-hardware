import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Users, Sparkles, Target, Heart, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import aboutStore from "@/assets/about-store.jpg";
import aboutWorker from "@/assets/about-worker.jpg";
import catGlass from "@/assets/cat-glass.jpg";
import catBuilding from "@/assets/cat-building.jpg";

export default function About() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-charcoal text-white overflow-hidden">
        <img
          src={aboutStore}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
        <div className="container-x relative py-24 md:py-36 max-w-4xl">
          <p className="eyebrow">Our Story</p>
          <h1 className="text-hero text-5xl md:text-7xl mt-4">
            Built on <span className="text-orange">quality.</span>
            <br />
            Driven by trust.
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl">
            Captain Glassmart & Hardware is a reliable supplier of hardware, glass accessories,
            furniture fittings, tools, adhesives, building materials and finishing products across
            Kenya.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 md:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={aboutWorker}
              alt=""
              loading="lazy"
              className="rounded-md aspect-[3/4] object-cover row-span-2"
            />
            <img
              src={catBuilding}
              alt=""
              loading="lazy"
              className="rounded-md aspect-square object-cover"
            />
            <img
              src={catGlass}
              alt=""
              loading="lazy"
              className="rounded-md aspect-square object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Who We Are</p>
            <h2 className="text-hero text-4xl md:text-5xl mt-3 text-charcoal">
              A trusted name in <span className="text-orange">modern industrial</span> supply.
            </h2>
            <p className="mt-6 text-muted-foreground">
              For over a decade, Captain Glassmart & Hardware has served contractors, fabricators,
              interior designers, developers, and homeowners with a carefully curated range of
              building and finishing solutions. Every product on our shelves is chosen for
              durability, performance and value.
            </p>
            <p className="mt-4 text-muted-foreground">
              We combine the strength of the construction industry with the polish of a modern
              retail experience — practical, professional, and honest at every step.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "10+", v: "Years Experience" },
                { k: "500+", v: "Happy Clients" },
                { k: "1000+", v: "Projects Completed" },
                { k: "50+", v: "Expert Team" },
              ].map((s) => (
                <div key={s.v} className="border-l-2 border-orange pl-4">
                  <div className="text-hero text-3xl text-charcoal">{s.k}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-28 bg-charcoal text-white">
        <div className="container-x">
          <p className="eyebrow">Our Values</p>
          <h2 className="text-hero text-4xl md:text-5xl mt-3 max-w-2xl">
            Principles that <span className="text-orange">hold us up.</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                Icon: ShieldCheck,
                t: "Quality First",
                d: "Every product we stock is tested against the demands of real jobsites.",
              },
              {
                Icon: Users,
                t: "People Focused",
                d: "Our team gives honest advice — no upsells, just what works for your project.",
              },
              {
                Icon: Target,
                t: "Practical Solutions",
                d: "From a single hinge to a full site delivery, we solve for your build.",
              },
              {
                Icon: Sparkles,
                t: "Craftsmanship",
                d: "We celebrate the trades and stock the tools that reward good work.",
              },
              {
                Icon: Award,
                t: "Reliability",
                d: "On-time delivery. Consistent stock. Prices you can plan around.",
              },
              {
                Icon: Heart,
                t: "Customer Satisfaction",
                d: "We measure success by the clients who keep coming back.",
              },
            ].map(({ Icon, t, d }) => (
              <div
                key={t}
                className="p-8 border border-white/10 rounded-md hover:border-orange/60 transition-colors"
              >
                <div className="w-12 h-12 grid place-items-center rounded-md bg-orange/10 border border-orange/30 text-orange">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-hero text-2xl mt-6">{t}</h3>
                <p className="mt-2 text-sm text-white/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange text-white">
        <div className="container-x py-16 text-center">
          <h2 className="text-hero text-3xl md:text-5xl">Let's build something together.</h2>
          <p className="mt-3 text-white/85 max-w-xl mx-auto">
            Talk to our team about materials, fittings, or a full project supply list.
          </p>
          <Link
            to="/contact"
            className="inline-flex mt-8 items-center gap-2 bg-white text-charcoal font-semibold px-6 py-3 rounded-md hover:bg-white/90 transition"
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
