import { Dumbbell, Heart, Users, User } from "lucide-react";

/**
 * Single source of truth for the club's real-world details.
 *
 * These values also feed the schema.org JSON-LD in routes/index.tsx — phone,
 * address, and opening hours must stay in sync with the physical club and with
 * the Google Business listing. Don't drift them.
 */
export const CLUB = {
  name: "3B Karaitivu Fitness Club Ladies & Gents",
  shortName: "Karaitivu Fitness",
  phoneDisplay: "0672 050 465",
  phoneHref: "tel:+94672050465",
  street: "11 Main Street",
  locality: "Karaitivu",
  postalCode: "13250",
  country: "Sri Lanka",
  mapsUrl: "https://maps.google.com/?q=11+Main+Street+Karaitivu",
  rating: "4.4",
  reviewCount: "74",
  hours: {
    morning: "6:00 – 10:00 AM",
    evening: "4:30 – 10:00 PM",
  },
} as const;

export const faqs = [
  { q: "What are 3B Karaitivu Fitness Club's opening hours?", a: "We are open every day from 6:00 AM to 10:00 AM in the morning and from 4:30 PM to 10:00 PM in the evening." },
  { q: "Where is the gym located?", a: "We're at 11 Main Street, Karaitivu 13250, Sri Lanka — right in the heart of Karaitivu, easy to reach on foot or by vehicle." },
  { q: "Do you have a separate ladies-only section?", a: "Yes. 3B Karaitivu Fitness Club has a fully private Ladies-only zone with dedicated equipment, alongside a separate Gents section — both under one roof." },
  { q: "What services and training do you offer?", a: "Weight training, cardio, personal one-on-one coaching, and a dedicated ladies training space. Beginners and experienced members are both welcome." },
  { q: "How can I get membership pricing?", a: "Call us on 0672 050 465 or visit the club at 11 Main Street, Karaitivu. Monthly, quarterly and yearly plans are available." },
];

/**
 * The four zones. `tone: "lagoon"` marks the Ladies-only zone — teal rather
 * than pink, so the visual signal is privacy and calm rather than gender.
 */
export const zones = [
  { tag: "Power Zone", title: "Weight Training", desc: "Full free-weights floor with racks, benches and premium plates.", image: "power-zone", icon: Dumbbell, tone: "ember" },
  { tag: "Cardio Zone", title: "Treadmills & Cycles", desc: "Rows of treadmills, bikes and cross-trainers for every level.", image: "cardio-zone", icon: Heart, tone: "ember" },
  { tag: "Ladies Only", title: "Private Training Space", desc: "A dedicated, private zone designed exclusively for our ladies members.", image: "ladies-zone", icon: Users, tone: "lagoon" },
  { tag: "1-on-1", title: "Personal Training", desc: "Custom programs and hands-on coaching from experienced trainers.", image: "personal-training", icon: User, tone: "ember" },
] as const;

export const reviews = [
  { name: "Kavitha S.", text: "Ladies-only section is exactly what I was looking for. Trainers are respectful and equipment is well-kept.", stars: 5 },
  { name: "Rizwan A.", text: "Best gym in Karaitivu. Been a member for over a year — real progress and a friendly community.", stars: 5 },
  { name: "Nishani P.", text: "Clean, welcoming and the coaches actually care. Morning slots at 6 AM are perfect before work.", stars: 4 },
  { name: "Suresh K.", text: "Solid free-weights setup and great cardio zone. Highly recommend for anyone serious about training.", stars: 5 },
];
