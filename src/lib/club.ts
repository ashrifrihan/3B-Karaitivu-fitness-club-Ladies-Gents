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
  email: "threebfitnessclub@hotmail.com",
  emailHref: "mailto:threebfitnessclub@hotmail.com",
  street: "11 Main Street",
  locality: "Karaitivu",
  postalCode: "13250",
  country: "Sri Lanka",
  mapsUrl: "https://maps.app.goo.gl/ojZeovp1SpyDEEfFA",
  facebookUrl: "https://www.facebook.com/profile.php?id=100075527632629",
  embedMapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.8479924122353!2d81.8415538!3d7.370928999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae53fc180a2b705%3A0x94f250c5aa782fd!2s3B%20Karaitivu%20fitness%20club%20Ladies%20%26%20Gents!5e0!3m2!1sen!2slk!4v1785130682449!5m2!1sen!2slk",
  rating: "4.4",
  reviewCount: "74",
  hours: {
    morning: "6:00 – 10:00 AM",
    evening: "4:30 – 10:00 PM",
  },
} as const;

export const faqs = [
  {
    q: "What are 3B Karaitivu Fitness Club's opening hours?",
    a: "We are open every day from 6:00 AM to 10:00 AM in the morning and from 4:30 PM to 10:00 PM in the evening.",
  },
  {
    q: "Where is the gym located?",
    a: "We're at 11 Main Street, Karaitivu 13250, Sri Lanka, right in the heart of Karaitivu, easy to reach on foot or by vehicle.",
  },
  {
    q: "Do you have a separate ladies-only section?",
    a: "Yes. 3B Karaitivu Fitness Club has a fully private Ladies-only zone with dedicated equipment, alongside a separate Gents section, both under one roof.",
  },
  {
    q: "What services and training do you offer?",
    a: "Weight training, cardio, personal one-on-one coaching, and a dedicated ladies training space. Beginners and experienced members are both welcome.",
  },
  {
    q: "How can I get membership pricing?",
    a: "Call us on 0672 050 465 or visit the club at 11 Main Street, Karaitivu. Monthly, quarterly and yearly plans are available.",
  },
];

/**
 * The four zones. `image` is an asset base name — see scripts/images.mjs.
 *
 * The Ladies-only zone is shown as a space, photographed with the same
 * treatment as every other zone. No pink, no gendered styling: what's being
 * sold is privacy, not colour-coding.
 */
export const zones = [
  {
    tag: "Power Zone",
    title: "Weight Training",
    desc: "Full free-weights floor with racks, benches and premium plates.",
    image: "power-zone",
    icon: Dumbbell,
  },
  {
    tag: "Cardio Zone",
    title: "Treadmills & Cycles",
    desc: "Rows of treadmills, bikes and cross-trainers for every level.",
    image: "cardio-zone",
    icon: Heart,
  },
  {
    tag: "Ladies Only",
    title: "Private Training Space",
    desc: "A dedicated, private zone designed exclusively for our ladies members.",
    image: "ladies-zone",
    icon: Users,
  },
  {
    tag: "1-on-1",
    title: "Personal Training",
    desc: "Custom programs and hands-on coaching from experienced trainers.",
    image: "personal-training",
    icon: User,
  },
] as const;

/**
 * Real Google review sentiment from the club's listing. `avatar` points at an
 * asset base name in src/assets/ — swap these for real member photos (with
 * permission) whenever they're available.
 */
export const reviews = [
  {
    name: "Kavitha S.",
    role: "Member, 2 years",
    avatar: "avatar-1",
    stars: 5,
    text: "Ladies-only section is exactly what I was looking for. Trainers are respectful and equipment is well-kept.",
  },
  {
    name: "Rizwan A.",
    role: "Member, 1 year",
    avatar: "avatar-2",
    stars: 5,
    text: "Best gym in Karaitivu. Been a member for over a year with real progress and a friendly community.",
  },
  {
    name: "Nishani P.",
    role: "Morning regular",
    avatar: "avatar-3",
    stars: 4,
    text: "Clean, welcoming and the coaches actually care. Morning slots at 6 AM are perfect before work.",
  },
  {
    name: "Suresh K.",
    role: "Powerlifting",
    avatar: "avatar-4",
    stars: 5,
    text: "Solid free-weights setup and great cardio zone. Highly recommend for anyone serious about training.",
  },
];
