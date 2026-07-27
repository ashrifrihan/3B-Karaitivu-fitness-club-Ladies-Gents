import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { Navbar, CallBar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatsCounters } from "@/components/sections/StatsCounters";
import { About } from "@/components/sections/About";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ActBreak } from "@/components/sections/ActBreak";
import { Membership } from "@/components/sections/Membership";
import { Faq } from "@/components/sections/Faq";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { faqs } from "@/lib/club";

// Below the fold and image-heavy — kept out of the initial bundle.
const Gallery = lazy(() => import("@/components/sections/Gallery"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthClub",
          name: "3B Karaitivu Fitness Club Ladies & Gents",
          image: "/og.jpg",
          address: {
            "@type": "PostalAddress",
            streetAddress: "11 Main Street",
            addressLocality: "Karaitivu",
            postalCode: "13250",
            addressCountry: "LK",
          },
          telephone: "+94672050465",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.4", reviewCount: "74" },
          openingHours: ["Mo-Su 06:00-10:00", "Mo-Su 16:30-22:00"],
          priceRange: "$$",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

/** Reserves vertical space while a lazy section loads, so nothing jumps. */
function SectionFallback() {
  return <div className="min-h-[60vh]" aria-hidden />;
}

/**
 * Three acts, not nine equal beats:
 *
 *   I   Arrive — Hero, open rhythm
 *   II  Proof  — Stats / About / Zones on the tight rhythm, read as one dense
 *                band, then ActBreak full-bleed to break the run of cards
 *   III Decide — Gallery / Reviews / Membership / FAQ / Visit, open and calm
 *                because this is where people pick up the phone
 */
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <Hero />

      <StatsCounters />
      <About />
      <ServicesGrid />

      <ActBreak />

      <Suspense fallback={<SectionFallback />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Membership />
      <Faq />
      <ContactFooter />

      <CallBar />
    </div>
  );
}
