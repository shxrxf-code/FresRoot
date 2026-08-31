"use client";
import { Star } from "iconsax-react";

export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = Math.round((rating - Math.floor(rating)) * 2);
        if (rating >= i) return <Star key={i} size={size} variant="Bold" className="fill-amber-400 text-amber-400" />;
        if (rating < i - 1 && rating !== i - 1) return <Star key={i} size={size} className="fill-gray-200 text-gray-200" />;
        return <Star key={i} size={size} variant="Bulk" className="fill-amber-400/40 text-amber-400" />;
      })}
    </span>
  );
}
