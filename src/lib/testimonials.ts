// Static prototype content from IXIA London's client & supplier references.
// Card excerpts are shortened and adapted; `review` holds the full text.
// Nothing is fetched at runtime — replace with CMS or approved Google Business
// Profile data before launch.

export type TestimonialSource = "google" | "letter" | "direct";

export type StarRatingValue = 1 | 2 | 3 | 4 | 5;

export interface Project {
  title: string;
  summary: string;
  /** Project page on the live IXIA London website. */
  url: string;
}

export interface Testimonial {
  id: string;
  name: string;
  /** Company, role or location shown alongside the name. */
  affiliation?: string;
  /** Only Google reviews carry a star rating. */
  rating?: StarRatingValue;
  excerpt: string;
  /** Full review, one entry per paragraph. */
  review: string[];
  source: TestimonialSource;
  /** Link to the original review. Leave undefined until an approved URL is available. */
  sourceUrl?: string;
  /** Only set when the review relates to a published portfolio project. */
  project?: Project;
}

export const testimonialSourceLabels: Record<TestimonialSource, string> = {
  google: "Google Review",
  letter: "Client letter",
  direct: "Client testimonial",
};

const PORTFOLIO_URL = "https://ixialondon.com/portfolio";

export const projects = {
  berkshire: {
    title: "Berkshire Project",
    summary:
      "A seven-room family home renovation in Berkshire, including a master suite, sitting room, sun room and two bathrooms.",
    url: `${PORTFOLIO_URL}/berkshire-project/`,
  },
  pleydellAvenue: {
    title: "Chiswick – Pleydell Avenue",
    summary:
      "A small, oddly shaped former nursery in a Victorian Chiswick home, reworked as a guest bedroom with bespoke built-in cabinetry, storage and lighting.",
    url: `${PORTFOLIO_URL}/chiswick-pleydell-avenue/`,
  },
  clapham: {
    title: "Clapham Project",
    summary:
      "A show flat for two-bedroom apartments in Clapham’s Northcote Road Library development, designed with neutral palettes and quality finishes for broad appeal.",
    url: `${PORTFOLIO_URL}/clapham-project/`,
  },
  queensPark: {
    title: "Queens Park Project",
    summary:
      "A Queen’s Park home transformed into a warm, welcoming residence inspired by Scottish landscapes, with soft colours throughout.",
    url: `${PORTFOLIO_URL}/queens-park-project/`,
  },
  abingerRoad: {
    title: "Chiswick – Abinger Road",
    summary:
      "A ground-floor redesign of a Bedford Park period home, blending British Colonial style with Indian cultural elements through materials, colour and craftsmanship.",
    url: `${PORTFOLIO_URL}/chiswick-abinger-road/`,
  },
} satisfies Record<string, Project>;

export const testimonials: Testimonial[] = [
  // Reviews linked to a project
  {
    id: "berks-mumontherun",
    name: "Berks MumontheRun",
    rating: 5,
    excerpt:
      "IXIA listened carefully, brought our vision to life and managed the renovation with confidence, energy and excellent communication.",
    review: [
      "We had the great pleasure of working with IXIA London on our recent home renovation and I can honestly say it was such a positive experience from start to finish. Kirsty and her extended team not only listened carefully to our vision, but brought it to reality after we had been mulling over ideas for far too long.",
      "Kirsty’s attention to detail, unfaltering energy and open mindset, drove the process forward at a pace that we needed to make it all happen! She can multi-task like the best of them and does an amazing job of shielding the client from all the numerous challenges that comes from procurement and managing trades!",
      "She fully respected and complemented our style preferences and we can’t underestimate how she also managed to balance out aesthetics with practicality within all her recommendations, not an easy combo to find. What we appreciated most, was her ability to manage the entire project seamlessly. She has a highly effective way of liaising with contractors and suppliers and maintains open communication throughout the process.",
      "From quality issues with procured items, to delays with deliveries (always the case!), we can’t think of anyone who can manage that more successfully and with such confidence. Our home now feels like a true reflection of who we are, but with the carefully thought through aesthetic finesse of IXIA London. We couldn’t recommend Kirsty enough.",
    ],
    source: "google",
    project: projects.berkshire,
  },
  {
    id: "holly-noteboom-griffin",
    name: "Holly Noteboom Griffin",
    rating: 5,
    excerpt:
      "Kirsty transformed a challenging small room into a beautiful and functional guest space, with bespoke storage and thoughtful attention to every detail.",
    review: [
      "The brief: take a small, oddly shaped room and transform it from a baby’s nursery to a beautiful, comfortable and functional guest space. Not only did Kirsty meet the brief, but she far surpassed our expectations.",
      "She cleverly designed a wall of bespoke cabinetry around a king size bed that took into account storage space for suitcases, personal items, nooks for reading lights and charging points – all while not making guests feel as though they are sleeping in a cave. It was a challenging project given the space limitations.",
      "In addition to creating an exceptionally functional space, Kirsty gave incredible attention to design details. From hidden storage space for sweets (for midnight feasts!), to door pulls, to intricate cabinet detailing, Kirsty thought of it all. Our guests feel as though they are staying in a very special place.",
      "The best part of the project – working with Kirsty! She is absolutely wonderful and we cannot recommend her enough.",
    ],
    source: "google",
    project: projects.pleydellAvenue,
  },
  {
    id: "west-resdev",
    name: "West ResDev",
    affiliation: "Hamptons",
    rating: 5,
    excerpt:
      "From the first consultation to the final touches, IXIA understood our client’s vision, communicated openly and turned it into reality.",
    review: [
      "Our experience with the Ixia team was nothing short of exceptional. From the initial consultation to the final touches, Ixia’s dedication to understanding our client’s vision and turning it into a reality was brilliant.",
      "The team maintained open communication throughout the project, valuing our input and ensuring that every decision aligned with the client’s preferences. Their professionalism, coupled with a genuine passion for their craft, made the entire process both seamless and enjoyable.",
      "It’s with great confidence that we recommend Ixia to anyone in search of a design company that goes above and beyond. Their ability to bring visions to life is unparalleled, and their unwavering dedication to their clients’ satisfaction sets them apart.",
    ],
    source: "google",
    project: projects.clapham,
  },
  {
    id: "elizabeth-bell",
    name: "Elizabeth Bell",
    rating: 5,
    excerpt:
      "Creative ideas, projects delivered to time and budget, and real empathy for the client – Kirsty brings all three, which is rare indeed.",
    review: [
      "There are designers who bring wonderful creative ideas, there are project managers who get work done to time, quality and budget, there are lovely people who build their client’s confidence with empathy and sensitivity – but people who can do all three are rare indeed.",
      "Kirsty demonstrated all these qualities and many more (fair pricing, attention to detail, great colleagues) whilst helping me transform some rather tired rooms into a bright stylish home, full of light and colour.",
      "I am delighted to recommend Kirsty and Ixia – both the outcome and the process were an absolute pleasure.",
    ],
    source: "google",
    project: projects.queensPark,
  },
  {
    id: "snehal-khanna",
    name: "Snehal Khanna",
    excerpt:
      "It is truly gratifying to have fulfilled our long cherished dream of creating warm and luxurious living spaces within our home.",
    review: [
      "Ashish and I would like to offer our heartfelt thanks to you for all your help and support over our renovation project this past year.",
      "It is truly gratifying to have fulfilled our long cherished dream of creating warm and luxurious living spaces within our home. We had a vision of what we wanted those spaces to feel like, but the sheer scope of the project was daunting for us to take on by ourselves.",
      "Throughout the project you enthusiastically channelled our ideas into actionable plans. You made many amazing recommendations, put us in contact with wonderful sales and trades people and were always there to resolve any issues that came up. You were patient when we struggled to make up our minds and you encouraged us to make the right choices that will serve us well for years to come.",
      "We’re enjoying our home so much more than we ever have! We feel very fortunate to have crossed paths with you on our design journey and look forward to working with you again in the future as well as recommending Ixia London to friends.",
    ],
    source: "letter",
    project: projects.abingerRoad,
  },

  // Reviews not linked to a project
  {
    id: "lindsay-barry",
    name: "Lindsay Barry",
    rating: 5,
    excerpt:
      "Friendly, creative, practical and professional, Kirsty offered thoughtful advice that balanced design, budget and everyday family life.",
    review: [
      "Kirsty is just super. She’s very friendly, creative, practical and professional. She thinks outside the box about design and budget and really cares about working as a team with her clients to deliver them the results they want.",
      "Thanks to Kirsty, I have a beautiful and functional kitchen bathroom – little decisions like encouraging me to tile behind the toilet rather than wallpaper (because it is a high traffic room and used by young boys!) – will make cleaning easier, and less chance to ruin the expensive wallpaper elsewhere!",
      "Thank you! I’ve recommended Kirsty to my friends already.",
    ],
    source: "google",
  },
  {
    id: "joanna-sheward",
    name: "Joanna Sheward",
    rating: 5,
    excerpt:
      "Professional, responsive and friendly, with a fantastic experience from the beginning of the project through to completion.",
    review: [
      "It’s always a pleasure to work with Kirsty – would highly recommend. Super professional, responsive & friendly too. A fantastic experience from start to finish!",
    ],
    source: "google",
  },
  {
    id: "cat-marshall",
    name: "Cat Marshall",
    affiliation: "Marshall Bespoke Furniture",
    rating: 5,
    excerpt:
      "A trusted creative collaborator whose attention to detail and confident use of colour elevated every bespoke interior feature.",
    review: [
      "Kirsty and I have collaborated on a number of projects, with Kirsty providing exceptional designs and myself creating the bespoke carpentry pieces.",
      "From bespoke bars to full feature shelving walls, Kirsty’s creativity, attention to detail and exceptional colour palette really brought Marshall Bespoke Furniture to life and provided the finishing touches to the customers’ homes.",
      "I wouldn’t hesitate to work with Kirsty again, or recommend her to anyone looking for an Interior Designer.",
    ],
    source: "google",
  },
  {
    id: "simon-gill",
    name: "Simon Gill",
    affiliation: "Simon Gill Architects",
    rating: 5,
    excerpt:
      "Enthusiastic, professional and a delight to work with, Kirsty brought excellent taste and helped every space come alive.",
    review: [
      "We worked with Kirsty as architects and had a fantastic experience. She was incredibly enthusiastic, very professional and brought her excellent taste to the project, knowing exactly how to make the spaces come alive.",
      "Most of all, she is a delight to work with – every meeting is a joy. I would absolutely recommend her to anyone planning to create interiors for a new house or revivify their current one.",
    ],
    source: "google",
  },
  {
    id: "katie-sparrow",
    name: "Katie Sparrow",
    rating: 5,
    excerpt:
      "Professional, passionate and truly client-led, Kirsty sourced over 100 items for our bedroom and en-suite – her service really does pay for itself.",
    review: [
      "Highly recommend Kirsty’s interior design service. She is professional, friendly, responsive, flexible, and incredibly passionate about what she does.",
      "She created mood boards based on our feedback and preferences, and sourced over 100 items for our bedroom and en-suite bathroom which were clearly presented in an Excel spreadsheet. Due to her amazing trade discounts, her interior design service really does pay for itself!!",
      "Her positive ‘can-do’ attitude is amazing, and she is truly client-led in the way that she works and can take the lead on your project to whatever extent works best for you. You won’t regret working with Kirsty!",
    ],
    source: "google",
  },
  {
    id: "amy-chapman",
    name: "Amy Chapman",
    affiliation: "Chiswick",
    excerpt:
      "Kirsty took care of everything and made our house look very beautiful. She has a fantastic eye and surpassed our expectations on a tricky brief.",
    review: [
      "We had an extension done a year ago which cut into our small dining room and living room area. We had a vision that we wanted this space divided into two very separate areas – a gentleman’s study and a light elegant living room. However we are a very busy family and did not have the time to finish our housing project off! We also needed help finishing off the new utility room and a new small bathroom.",
      "Kirsty was the answer to all our problems – she took care of everything and made our house look very beautiful. Kirsty is efficient, proactive and also sources products according to your budget and taste.",
      "Kirsty has a fantastic eye and surpassed our expectations regarding our tricky brief. We will be using Kirsty again and would highly recommend her to anyone.",
    ],
    source: "direct",
  },
  {
    id: "nadia-taseer",
    name: "Nadia Taseer",
    rating: 5,
    excerpt:
      "Kirsty is talented, friendly and genuinely listens to her clients. Her ideas and completed spaces consistently feel exceptional.",
    review: [
      "I’ve worked with Kirsty on quite a few projects and it has been a pleasure. Kirsty is super talented, friendly and really listens to what the client wants. Her ideas are amazing and the end result is always fantastic!",
    ],
    source: "google",
  },
];

export function getTestimonial(id: string): Testimonial | undefined {
  return testimonials.find((testimonial) => testimonial.id === id);
}
