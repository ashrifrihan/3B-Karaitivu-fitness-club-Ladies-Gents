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
          "@type": ["HealthClub", "ExerciseGym", "SportsActivityLocation"],
          "@id": "https://www.3bfitnessclub.com/#healthclub",
          name: "3B Karaitivu Fitness Club Ladies & Gents",
          alternateName: ["3B Fitness Club Karaitivu", "3B Gym Karaitivu"],
          url: "https://www.3bfitnessclub.com/",
          logo: "https://www.3bfitnessclub.com/logo.png",
          image: "https://www.3bfitnessclub.com/logo.png",
          description:
            "3B Karaitivu Fitness Club is a premier gym located at 11 Main Street, Karaitivu (13250), Sri Lanka. Featuring separate Ladies-only and Gents training zones, personal coaching, cardio equipment, and free weights.",
          telephone: "+94672050465",
          email: "threebfitnessclub@hotmail.com",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "11 Main Street",
            addressLocality: "Karaitivu",
            addressRegion: "Eastern Province",
            postalCode: "13250",
            addressCountry: "LK",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 7.370929,
            longitude: 81.841554,
          },
          hasMap: "https://maps.app.goo.gl/ojZeovp1SpyDEEfFA",
          sameAs: [
            "https://www.facebook.com/profile.php?id=100075527632629",
            "https://maps.app.goo.gl/ojZeovp1SpyDEEfFA",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.4",
            reviewCount: "74",
            bestRating: "5",
            worstRating: "1",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "06:00",
              closes: "10:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "16:30",
              closes: "22:00",
            },
          ],
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Private Ladies-Only Zone", value: true },
            { "@type": "LocationFeatureSpecification", name: "Gents Training Zone", value: true },
            { "@type": "LocationFeatureSpecification", name: "Personal Coaching & 1-on-1 Training", value: true },
            { "@type": "LocationFeatureSpecification", name: "Cardio Equipment & Treadmills", value: true },
            { "@type": "LocationFeatureSpecification", name: "Free Weights & Power Racks", value: true },
            { "@type": "LocationFeatureSpecification", name: "Body Shaping & Fitness Programs", value: true },
          ],
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.3bfitnessclub.com/",
            },
          ],
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
 * Cinematic hero carries the page; everything after it is calm and evenly
 * spaced, with one full-bleed image break to stop the run of cards.
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
