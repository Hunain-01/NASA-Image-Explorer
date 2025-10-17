import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No images available for this date.
      </p>
    );
  }

  const total = images.length;
  const current = images[index];

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      <div className="relative w-full max-w-3xl">
        <img
          src={current.url}
          alt={current.caption}
          className="rounded-xl shadow-lg w-full h-[600px] object-cover"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Caption */}
      <div className="text-center max-w-2xl mt-3">
        <p className="italic text-gray-300">{current.caption}</p>
        <p className="text-sm text-gray-400 mt-1">{current.date}</p>
        <p className="text-xs text-gray-500 mt-1">
          Image {index + 1} of {total}
        </p>
      </div>
    </div>
  );
}
