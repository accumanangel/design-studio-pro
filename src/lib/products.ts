// Mock product catalogue for IXIA London.
// Structured so it can later be swapped for WooCommerce data.

import productMasterWalnut from "@/assets/product-master-walnut.jpg";
import productMasterMoss from "@/assets/product-master-moss.jpg";
import productMasterTerracotta from "@/assets/product-master-terracotta.jpg";
import productChildren from "@/assets/product-children.jpg";
import productGuest from "@/assets/product-guest.jpg";
import roomChildren from "@/assets/room-children.jpg";
import roomGuest from "@/assets/room-guest.jpg";
import roomMaster from "@/assets/room-master.jpg";
import detailWalnut from "@/assets/detail-walnut.jpg";
import swatchLightOak from "@/assets/swatch-light-oak.jpg";
import swatchMidOak from "@/assets/swatch-mid-oak.jpg";
import swatchWalnutWood from "@/assets/swatch-walnut.jpg";
import swatchKnobWhite from "@/assets/swatch-knob-white.jpg";
import swatchKnobGold from "@/assets/swatch-knob-gold.jpg";
import swatchKnobPink from "@/assets/swatch-knob-pink.jpg";
import swatchKnobBlack from "@/assets/swatch-knob-black.jpg";
import swatchDetailFlower from "@/assets/swatch-detail-flower.jpg";
import swatchDetailHeart from "@/assets/swatch-detail-heart.jpg";
import swatchDetailNone from "@/assets/swatch-detail-none.jpg";
import swatchHandleBronze from "@/assets/swatch-handle-bronze.jpg";
import swatchHandleGold from "@/assets/swatch-handle-gold.jpg";
import swatchHandleChrome from "@/assets/swatch-handle-chrome.jpg";
import swatchHandleBlack from "@/assets/swatch-handle-black.jpg";
import detailStone from "@/assets/detail-stone.jpg";

export type CollectionSlug = "childrens" | "guest-room" | "master-suite";

export type SwatchKind = "wood" | "paint" | "metal" | "material" | "detail";

export interface Swatch {
  id: string;
  label: string;
  colour?: string; // hex for the visual chip
  priceDelta?: number; // in pence
  disabled?: boolean;
  disabledReason?: string;
  image?: string; // maps to product hero for crossfade
  swatchImage?: string; // small illustrative thumbnail shown in the swatch chip
  description?: string;
}

export interface ConfigStep {
  key: string;
  label: string;
  eyebrow?: string;
  kind: SwatchKind;
  options: Swatch[];
  // When present, this step only shows if a parent step matches this value.
  requires?: { step: string; value: string };
}

export interface SizeOption {
  id: string;
  label: string;
  dims: string; // W × D × H
  priceDelta?: number;
}

export interface Product {
  slug: string;
  collection: CollectionSlug;
  collectionLabel: string;
  name: string;
  strapline: string;
  description: string;
  basePrice: number; // pence
  leadTime: string;
  heroImage: string;
  galleryImages: string[];
  sizes: SizeOption[];
  steps: ConfigStep[];
}

const gbp = (pounds: number) => Math.round(pounds * 100);

// --- Shared option pools ---
const woodTonesGeneric: Swatch[] = [
  { id: "light-oak", label: "Light Oak", colour: "#c9a678", image: productGuest, swatchImage: swatchLightOak },
  { id: "mid-oak", label: "Mid Oak", colour: "#a37a4a", image: productMasterWalnut, swatchImage: swatchMidOak },
  { id: "walnut", label: "Walnut", colour: "#4a2f22", image: productMasterWalnut, swatchImage: swatchWalnutWood },
];

const handleFinishes: Swatch[] = [
  { id: "bronze", label: "Bronze", colour: "#7a5230", swatchImage: swatchHandleBronze },
  { id: "gold", label: "Gold", colour: "#c9a24a", priceDelta: gbp(35), swatchImage: swatchHandleGold },
  { id: "chrome", label: "Chrome", colour: "#c2c6c8", swatchImage: swatchHandleChrome },
  { id: "black", label: "Black", colour: "#1c1a17", swatchImage: swatchHandleBlack },
];

const topOptions: Swatch[] = [
  {
    id: "wood-top",
    label: "Wooden top",
    colour: "#8a5a36",
    image: productMasterWalnut,
    description: "Solid timber, oiled by hand.",
  },
  {
    id: "stone-top",
    label: "Stone top",
    colour: "#d6cec2",
    priceDelta: gbp(180),
    image: detailStone,
    description: "Honed limestone, sealed for daily use.",
  },
];

// --- Children's bedside ---
const childrensProduct: Product = {
  slug: "the-marlow",
  collection: "childrens",
  collectionLabel: "Children's Suite",
  name: "The Marlow",
  strapline: "A first bedside, gently proportioned.",
  description:
    "Hand-painted or lightly waxed in the workshop, The Marlow was drawn for a child's first grown-up room — round-cornered, quietly detailed, and finished with a knob small enough for small hands.",
  basePrice: gbp(485),
  leadTime: "6–8 weeks",
  heroImage: productChildren,
  galleryImages: [productChildren, roomChildren, detailWalnut, detailStone],
  sizes: [
    { id: "small", label: "Small", dims: "38 × 32 × 46 cm" },
    { id: "large", label: "Large", dims: "45 × 38 × 54 cm", priceDelta: gbp(60) },
  ],
  steps: [
    {
      key: "finish",
      label: "Finish",
      eyebrow: "Wooden or painted",
      kind: "material",
      options: [
        { id: "wooden", label: "Wooden", colour: "#a37a4a" },
        { id: "painted", label: "Painted", colour: "#8b9484" },
      ],
    },
    {
      key: "wood-tone",
      label: "Wood tone",
      kind: "wood",
      requires: { step: "finish", value: "wooden" },
      options: woodTonesGeneric,
    },
    {
      key: "paint-colour",
      label: "Paint colour",
      kind: "paint",
      requires: { step: "finish", value: "painted" },
      options: [
        { id: "dark-blue", label: "Dark Blue", colour: "#3a4a63", image: productChildren },
        { id: "grey", label: "Grey", colour: "#8f8b83", image: productChildren },
        { id: "pale-green", label: "Pale Green", colour: "#a8b5a1", image: productChildren },
        { id: "off-white", label: "Off White", colour: "#ece5d7", image: productChildren },
      ],
    },
    {
      key: "detail",
      label: "Decorative detail",
      kind: "detail",
      options: [
        { id: "flower", label: "Flower detail", colour: "#e4d5c2", priceDelta: gbp(45), swatchImage: swatchDetailFlower },
        { id: "heart", label: "Heart detail", colour: "#e4d5c2", priceDelta: gbp(45), swatchImage: swatchDetailHeart },
        { id: "none", label: "No detail", colour: "#efe9de", swatchImage: swatchDetailNone },
      ],
    },
    {
      key: "knob",
      label: "Knob",
      kind: "metal",
      options: [
        { id: "small-white", label: "Small white knob", colour: "#f2ede4", swatchImage: swatchKnobWhite },
        { id: "small-gold", label: "Small gold knob", colour: "#c9a24a", priceDelta: gbp(25), swatchImage: swatchKnobGold },
        { id: "pink", label: "Pink knob", colour: "#dda9a3", swatchImage: swatchKnobPink },
        { id: "black", label: "Black knob", colour: "#1c1a17", swatchImage: swatchKnobBlack },
      ],
    },
  ],
};

// --- Guest room ---
const guestProduct: Product = {
  slug: "the-abinger",
  collection: "guest-room",
  collectionLabel: "Guest Suite",
  name: "The Abinger",
  strapline: "Restrained, warm, ready for arrivals.",
  description:
    "Simple lines, quiet joinery, and a top that lives well with a lamp, a jug of water and a well-read book. The Abinger is drawn for the guests you welcome most.",
  basePrice: gbp(720),
  leadTime: "8–10 weeks",
  heroImage: productGuest,
  galleryImages: [productGuest, roomGuest, detailWalnut, detailStone],
  sizes: [
    { id: "small", label: "Small", dims: "42 × 36 × 52 cm" },
    { id: "large", label: "Large", dims: "50 × 40 × 58 cm", priceDelta: gbp(90) },
  ],
  steps: [
    {
      key: "finish",
      label: "Finish",
      eyebrow: "Wooden or painted",
      kind: "material",
      options: [
        { id: "wooden", label: "Wooden", colour: "#a37a4a" },
        { id: "painted", label: "Painted", colour: "#8b9484" },
      ],
    },
    {
      key: "wood-tone",
      label: "Wood tone",
      kind: "wood",
      requires: { step: "finish", value: "wooden" },
      options: woodTonesGeneric,
    },
    {
      key: "paint-colour",
      label: "Paint colour",
      kind: "paint",
      requires: { step: "finish", value: "painted" },
      options: [
        { id: "dark-blue", label: "Dark Blue", colour: "#3a4a63" },
        { id: "french-grey", label: "French Grey", colour: "#a8a9a2" },
        { id: "pale-green", label: "Pale Green", colour: "#a8b5a1", image: productMasterMoss },
        { id: "off-white", label: "Off White", colour: "#ece5d7" },
      ],
    },
    {
      key: "handle",
      label: "Handle finish",
      kind: "metal",
      options: handleFinishes,
    },
  ],
};

// --- Master suite ---
const masterProduct: Product = {
  slug: "the-alcott",
  collection: "master-suite",
  collectionLabel: "Master Suite",
  name: "The Alcott",
  strapline: "A study in quiet geometry.",
  description:
    "Hand-turned in walnut or hand-painted in one of four workshop colours, with a choice of solid timber or honed stone top and brushed brass detailing. Drawn for the sanctuary of the master suite.",
  basePrice: gbp(1120),
  leadTime: "8–10 weeks",
  heroImage: productMasterWalnut,
  galleryImages: [productMasterWalnut, roomMaster, detailWalnut, detailStone],
  sizes: [
    { id: "small", label: "Small", dims: "45 × 40 × 55 cm" },
    { id: "large", label: "Large", dims: "54 × 42 × 60 cm", priceDelta: gbp(120) },
  ],
  steps: [
    {
      key: "finish",
      label: "Finish",
      eyebrow: "Wooden or painted",
      kind: "material",
      options: [
        { id: "wooden", label: "Wooden", colour: "#a37a4a", image: productMasterWalnut },
        { id: "painted", label: "Painted", colour: "#8b9484", image: productMasterMoss },
      ],
    },
    {
      key: "wood-tone",
      label: "Wood tone",
      kind: "wood",
      requires: { step: "finish", value: "wooden" },
      options: [
        { id: "light-oak", label: "Light Oak", colour: "#c9a678", image: productGuest, swatchImage: swatchLightOak },
        { id: "mid-oak", label: "Mid Oak", colour: "#a37a4a", image: productMasterWalnut, swatchImage: swatchMidOak },
        { id: "walnut", label: "Walnut", colour: "#4a2f22", image: productMasterWalnut, swatchImage: swatchWalnutWood },
      ],
    },
    {
      key: "paint-colour",
      label: "Paint colour",
      kind: "paint",
      requires: { step: "finish", value: "painted" },
      options: [
        { id: "buttery-yellow", label: "Buttery Yellow", colour: "#e6ce8e", image: productMasterMoss },
        { id: "moss-green", label: "Moss Green", colour: "#7a8865", image: productMasterMoss },
        { id: "plimsoll-blue", label: "Plimsoll Blue", colour: "#3a4a63", image: productMasterMoss, disabled: true, disabledReason: "Made to order this season" },
        { id: "terracotta", label: "Terracotta", colour: "#c47a5c", image: productMasterTerracotta },
      ],
    },
    {
      key: "top",
      label: "Top",
      kind: "material",
      options: topOptions,
    },
    {
      key: "handle",
      label: "Handle finish",
      kind: "metal",
      options: handleFinishes,
    },
  ],
};

export const products: Product[] = [childrensProduct, guestProduct, masterProduct];

export const collections: {
  slug: CollectionSlug;
  label: string;
  short: string;
  story: string;
  image: string;
}[] = [
  {
    slug: "childrens",
    label: "Children's Bedside Tables",
    short: "Children's",
    story:
      "Small in scale, gently detailed. Made for growing rooms and the years they hold.",
    image: roomChildren,
  },
  {
    slug: "guest-room",
    label: "Guest Room Bedside Tables",
    short: "Guest Room",
    story:
      "Restful proportions and a quiet joinery vocabulary. Designed for the guests you welcome most.",
    image: roomGuest,
  },
  {
    slug: "master-suite",
    label: "Master Suite Bedside Tables",
    short: "Master Suite",
    story:
      "Larger, more considered pieces. Solid timbers, honed stone, brushed brass.",
    image: roomMaster,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCollection(c: CollectionSlug): Product[] {
  return products.filter((p) => p.collection === c);
}

export function formatPrice(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: pence % 100 === 0 ? 0 : 2,
  }).format(pence / 100);
}
