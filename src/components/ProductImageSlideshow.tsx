import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface ProductImageSlideshowProps {
  /** Local product image paths to cycle through */
  images: string[];
  /** Optional Google Drive (or other) override; when set, shows this single image instead */
  overrideSrc?: string | null;
  /** Alt text / label for the product */
  productName: string;
  /** Rendered when there are no images and no override */
  fallback: ReactNode;
  /** Auto-advance interval in ms */
  intervalMs?: number;
}

// Vertical scroll-snap slideshow: auto-advances every few seconds, pauses on hover,
// and is manually scrollable (wheel / trackpad / touch) with native snapping.
export function ProductImageSlideshow({
  images,
  overrideSrc,
  productName,
  fallback,
  intervalMs = 3000,
}: ProductImageSlideshowProps) {
  const slides = overrideSrc ? [overrideSrc] : images;

  // A single image (or override) needs no timer, dots, or scroll behavior.
  if (slides.length <= 1) {
    if (slides.length === 0) return <>{fallback}</>;
    return (
      <SingleImage src={slides[0]} productName={productName} fallback={fallback} />
    );
  }

  return (
    <MultiSlideshow
      slides={slides}
      productName={productName}
      intervalMs={intervalMs}
    />
  );
}

function SingleImage({
  src,
  productName,
  fallback,
}: {
  src: string;
  productName: string;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={productName}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function MultiSlideshow({
  slides,
  productName,
  intervalMs,
}: {
  slides: string[];
  productName: string;
  intervalMs: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  // Click-and-drag to scroll horizontally.
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const setActive = useCallback((i: number) => {
    activeIndexRef.current = i;
    setActiveIndex(i);
  }, []);

  const scrollToIndex = useCallback((i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActive(i);
  }, [setActive]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;
      const next = (activeIndexRef.current + 1) % slides.length;
      scrollToIndex(next);
    }, intervalMs);
  }, [intervalMs, scrollToIndex, slides.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Keep the active dot in sync while the user scrolls manually.
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== activeIndexRef.current) setActive(idx);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
    el.style.scrollSnapType = "none"; // free-scroll while dragging
    startTimer();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const drag = dragRef.current;
    if (!el || !drag.active) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 3) drag.moved = true;
    el.scrollLeft = drag.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const drag = dragRef.current;
    if (!el || !drag.active) return;
    drag.active = false;
    try { el.releasePointerCapture(e.pointerId); } catch { /* pointer already released */ }
    el.style.scrollSnapType = "";
    // Snap to the nearest slide after a free-scroll drag.
    if (drag.moved) {
      scrollToIndex(Math.round(el.scrollLeft / el.clientWidth));
      startTimer();
    }
  };

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onWheel={startTimer}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="h-full w-full flex overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((src, i) => (
          <div key={i} className="h-full w-full snap-center shrink-0">
            <img
              src={src}
              alt={`${productName} — view ${i + 1}`}
              draggable={false}
              className="w-full h-full object-cover select-none"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Show image ${i + 1}`}
            onClick={() => { scrollToIndex(i); startTimer(); }}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-4 h-1.5 bg-teal-400"
                : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
