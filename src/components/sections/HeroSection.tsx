import { Rocket, ChevronRight, Sparkles } from "lucide-react";
import { EarthNight } from "../EarthNight";

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

// Astradyne-style hero section (Section 1)
export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative -mt-20 min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* 3D night Earth scene over a deep-space gradient.
          Fills the whole section — including behind the transparent nav — so the
          hero reads as one seamless starfield with no band or cut aura at the top. */}
      <div className="absolute inset-0 z-0">
        <EarthNight />
        {/* Dark futuristic overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-slate-950/10 to-slate-900/20 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Content Box */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-40 pb-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text panel */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 text-teal-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="h-3 w-3 animate-spin" /> Modular •
            Multifunctional • Scalable
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Mission-Critical <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
              Space Infrastructure
            </span>{" "}
            <br />
            for the Next Generation Satellites
          </h1>

          <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
            Engineering system that powers next generation of Satellites and
            Space Missions
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onNavigate("products")}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] flex items-center gap-2 active:scale-98"
            >
              Explore Products
              <Rocket className="h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:border-teal-400/50 flex items-center gap-2"
            >
              Inquire Directly
              <ChevronRight className="h-5 w-5 text-teal-400" />
            </button>
          </div>
        </div>

        {/* Satellite showcase — the main subject */}
        <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
          {/* soft teal halo behind the satellite */}
          <div className="absolute inset-8 bg-teal-500/15 blur-3xl rounded-full" />
          {/* slant wrapper — tilts the satellite down-right; float animation lives on the img so drift + tilt don't fight */}
          <div className="relative rotate-[-25deg] scale-100 lg:scale-125 lg:-translate-x-8 xl:scale-[1.35] xl:-translate-x-6 2xl:scale-[1.6] 2xl:translate-x-16">
            <img
              src="/images/Solar_Panel.png"
              alt="DeployNXT deployable solar array satellite"
              className="w-full max-w-2xl animate-[float_7s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* Telemetry Stats Overlay Panel (Astradyne style) */}
        {/* <div className="lg:col-span-5">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono tracking-wider text-slate-400 font-bold uppercase">LIVE STATUS TELEMETRY</span>
              </div>
              <span className="text-xs font-mono text-teal-400">TRL-4 </span>
            </div> */}

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-2 gap-4">

              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Solar Array Fold Ratio</div>
                <div className="text-2xl font-bold text-teal-400 font-mono mt-1">15 : 1</div>
                <div className="text-[10px] text-emerald-400/90 font-mono mt-1">▲ Industry Record</div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Specific Power</div>
                <div className="text-2xl font-bold text-teal-400 font-mono mt-1">150 W/kg</div>
                <div className="text-[10px] text-emerald-400/90 font-mono mt-1">● 70% Lighter weight</div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Planned Deployment Reliability</div>
                <div className="text-2xl font-bold text-teal-400 font-mono mt-1">99.998%</div>
                <div className="text-[10px] text-emerald-400/90 font-mono mt-1">● Fully Redundant Springs</div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Launch</div>
                <div className="text-2xl font-bold text-teal-400 font-mono mt-1">Q1/Q2 2027</div>
                <div className="text-[10px] text-emerald-400/90 font-mono mt-1">▲ Tech Demo Mission</div>
              </div>

            </div> */}

        {/* Mini visual representation of deployable solar ribs */}
        {/* <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Origami Rib Deployment Sequence</span>
                <span className="text-[10px] font-mono text-emerald-400">100% DEPLOYED</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full w-[100%] rounded-full animate-[shimmer_2s_infinite_linear]" />
              </div>
              <div className="grid grid-cols-4 text-center text-[8px] font-mono text-slate-500">
                <span>STOWED</span>
                <span>RELEASE</span>
                <span>EXPANDING</span>
                <span className="text-teal-400 font-bold">LOCKED</span>
              </div>
            </div>

          </div>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => onNavigate("products")}>
        <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">Scroll to Explore</span>
        <div className="w-5 h-8 border-2 border-slate-600 rounded-full p-1">
          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce mx-auto" />
        </div>
      </div> */}
    </section>
  );
}
