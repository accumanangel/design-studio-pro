// Static prototype content. Each excerpt is shortened and adapted from a public
// Google review of IXIA London — not verbatim, and not fetched at runtime.
// Replace with CMS or approved Google Business Profile data before launch.

export type TestimonialSource = "google";

export type StarRatingValue = 1 | 2 | 3 | 4 | 5;

export interface Testimonial {
  id: string;
  name: string;
  rating: StarRatingValue;
  excerpt: string;
  source: TestimonialSource;
  /** Link to the original review. Leave undefined until an approved URL is available. */
  sourceUrl?: string;
}

export const testimonialSourceLabels: Record<TestimonialSource, string> = {
  google: "Google Review",
};

export const featuredTestimonial: Testimonial = {
  id: "holly-noteboom-griffin",
  name: "Holly Noteboom Griffin",
  rating: 5,
  excerpt:
    "Kirsty transformed a challenging small room into a beautiful and functional guest space, with bespoke storage and thoughtful attention to every detail.",
  source: "google",
};

export const testimonials: Testimonial[] = [
  {
    id: "lindsay-barry",
    name: "Lindsay Barry",
    rating: 5,
    excerpt:
      "Friendly, creative, practical and professional, Kirsty offered thoughtful advice that balanced design, budget and everyday family life.",
    source: "google",
  },
  {
    id: "berks-mumontherun",
    name: "Berks MumontheRun",
    rating: 5,
    excerpt:
      "IXIA listened carefully, brought our vision to life and managed the renovation with confidence, energy and excellent communication.",
    source: "google",
  },
  {
    id: "cat-marshall",
    name: "Cat Marshall",
    rating: 5,
    excerpt:
      "A trusted creative collaborator whose attention to detail and confident use of colour elevated every bespoke interior feature.",
    source: "google",
  },
  {
    id: "simon-gill",
    name: "Simon Gill",
    rating: 5,
    excerpt:
      "Enthusiastic, professional and a delight to work with, Kirsty brought excellent taste and helped every space come alive.",
    source: "google",
  },
  {
    id: "nadia-taseer",
    name: "Nadia Taseer",
    rating: 5,
    excerpt:
      "Kirsty is talented, friendly and genuinely listens to her clients. Her ideas and completed spaces consistently feel exceptional.",
    source: "google",
  },
  {
    id: "joanna-sheward",
    name: "Joanna Sheward",
    rating: 5,
    excerpt:
      "Professional, responsive and friendly, with a fantastic experience from the beginning of the project through to completion.",
    source: "google",
  },
];
