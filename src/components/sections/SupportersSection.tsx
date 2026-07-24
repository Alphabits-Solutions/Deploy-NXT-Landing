import { useState } from "react";
import { SUPPORTERS } from "../../data/supporters";

// The 6 logos repeated so each half of the track is wider than any viewport,
// keeping the -50% loop seamless on large screens.
const REPEATS = 6;
const LOOP = Array.from({ length: REPEATS }, () => SUPPORTERS).flat();

// Slim dark band with an infinite right-to-left logo marquee (Section 2.5)
export function SupportersSection() {
  // Set via onMouseMove (not CSS :hover) so a logo only highlights when the
  // mouse actually moves over it — not when logos drift under a resting cursor.
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="supporters" className="bg-slate-950 py-14 overflow-hidden border-t border-white/5 scroll-mt-20">

      {/* Compact uppercase label, matching the hero's mono badge style */}
      <p className="text-center text-teal-400 text-xs font-mono font-bold tracking-[0.3em] uppercase">
        Our Supporters
      </p>

      {/* Marquee: track slides -50% for a seamless loop */}
      <div className="marquee relative mt-10">
        <div className="marquee-track flex items-center">
          {LOOP.map((supporter, i) => (
            <img
              key={`${supporter.name}-${i}`}
              src={supporter.src}
              alt={supporter.name}
              aria-hidden={i >= SUPPORTERS.length}
              onMouseMove={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`h-14 w-auto mx-20 shrink-0 transition-all duration-300 ${
                hovered === i
                  ? "opacity-100 scale-110 drop-shadow-[0_0_12px_rgba(45,212,191,0.45)]"
                  : "opacity-60"
              }`}
              draggable={false}
            />
          ))}
        </div>

        {/* Edge fade masks so logos slide in/out gracefully */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
      </div>

    </section>
  );
}
