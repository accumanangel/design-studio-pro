import { ZoomIn } from "lucide-react";

interface ProductCardImageProps {
  src: string;
  productName: string;
  backgroundClassName?: string;
}

export function ProductCardImage({
  src,
  productName,
  backgroundClassName = "bg-ivory",
}: ProductCardImageProps) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden ${backgroundClassName}`}>
      <img
        src={src}
        alt={productName}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
      />
      <span
        className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-background/70 bg-background/90 text-brand-accent shadow-sm transition-all group-hover:scale-105 group-hover:bg-brand-accent group-hover:text-white group-focus-visible:scale-105"
        aria-hidden="true"
      >
        <ZoomIn className="size-4" strokeWidth={1.6} />
      </span>
      <span className="sr-only">View {productName} details</span>
    </div>
  );
}
