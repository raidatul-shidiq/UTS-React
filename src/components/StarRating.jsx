import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({
  rating = 0,
  setRating,
  maxRating = 5,
  readOnly = false,
  size = 18,
  showValue = false,
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.round(displayRating);

          return (
            <button
              type="button"
              key={index}
              disabled={readOnly}
              onClick={() => {
                if (!readOnly && setRating) {
                  setRating(starValue);
                }
              }}
              onMouseEnter={() => {
                if (!readOnly) {
                  setHoverRating(starValue);
                }
              }}
              onMouseLeave={() => {
                if (!readOnly) {
                  setHoverRating(0);
                }
              }}
              className={`p-0.5 transition-transform duration-150 ${
                readOnly
                  ? 'cursor-default'
                  : 'cursor-pointer hover:scale-125 focus:outline-none'
              }`}
              title={readOnly ? `${rating} dari 5 bintang` : `Beri ${starValue} bintang`}
            >
              <Star
                size={size}
                className={`transition-colors duration-150 ${
                  isFilled
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-stone-300 fill-stone-100'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-bold text-amber-700 ml-1">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
}
