import { useState } from "react";
import { SUPPORTERS } from "../../data/supporters";

// The logos repeated so each half of the track is wider than any viewport,
// keeping the -50% loop seamless on large screens.
const REPEATS = 4;
const LOOP = Array.from({ length: REPEATS }, () => SUPPORTERS).flat();

// Slim dark band with an infinite right-to-left logo marquee (Section 2.5)
export function SupportersSection() {
  // Set via onMouseMove (not CSS :hover) so a logo only highlights when the
  // mouse actually moves over it — not when logos drift under a resting cursor.
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="supporters" className="relative bg-band py-14 overflow-hidden border-t border-white/5 scroll-mt-20">

      {/* Radial teal glow overlay — same treatment as the Careers band, so the
          dark navy reads as navy (not flat black) across the full-width band. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 80% 0%, rgba(16,199,160,.16), transparent 55%)" }}
      />

      {/* Compact uppercase label, matching the hero's mono badge style */}
      <p className="relative text-center text-teal-400 text-xs font-mono font-bold tracking-[0.3em] uppercase">
        Our Supporters
      </p>

      {/* Marquee: track slides -50% for a seamless loop */}
      <div className="marquee relative mt-10">
        <div className="marquee-track flex items-center">
          {LOOP.map((supporter, i) => (
            // White tile behind each logo — several are dark artwork on a
            // transparent background and would vanish against the dark band.
            <div
              key={`${supporter.name}-${i}`}
              aria-hidden={i >= SUPPORTERS.length}
              onMouseMove={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`mx-10 shrink-0 rounded-xl bg-white px-8 py-4 transition-all duration-300 ${
                hovered === i
                  ? "opacity-100 scale-110 drop-shadow-[0_0_12px_rgba(45,212,191,0.45)]"
                  : "opacity-80"
              }`}
            >
              <img
                src={supporter.src}
                alt={supporter.name}
                className="h-12 w-auto max-w-[180px] object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Edge fade masks so logos slide in/out gracefully */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-band to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-band to-transparent pointer-events-none" />
      </div>

    </section>
  );
}
