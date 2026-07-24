interface FooterProps {
  onNavigate: (id: string) => void;
}

const FOOTER_LINKS = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "team", label: "Team" },
  { id: "careers", label: "Careers" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" }
];

// Premium comprehensive footer
export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 relative overflow-hidden">

      {/* Subtle decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Logo and brief brand text */}
          <div className="md:col-span-5 space-y-6 text-left">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white shadow-md">
                <svg className="h-6 w-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.108-7.843-.258" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-xl text-white font-mono">DeployNXT</span>
                <span className="text-[9px] font-mono tracking-widest text-teal-400 font-bold uppercase">DEPLOYABLE SPACE SYSTEMS</span>
              </div>
            </button>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Engineering origami-based, high-strength deployable structures and zero-toxicity micro-propulsion architectures. Setting the benchmark for mission-critical orbit control.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                Space Tested POEM-4
              </span>
              <span>•</span>
              <span>TRL-8 Certified</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4 text-left">
            {/* <h5 className="font-mono text-xs text-teal-400 uppercase tracking-widest font-bold">NAVIGATION</h5>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              {FOOTER_LINKS.map(({ id, label }) => (
                <button key={id} onClick={() => onNavigate(id)} className="hover:text-white transition-colors text-left py-1 cursor-pointer">
                  {label}
                </button>
              ))}
            </div> */}
          </div>

          {/* Support / Partners */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h5 className="font-mono text-xs text-teal-400 uppercase tracking-widest font-bold">ECOSYSTEM COLLABORATIONS</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              We work in direct integration with key governmental defense partners, satellite bus suppliers, and spaceflight talent networks including:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-3 py-1 rounded">DeployNXT Platform</span>
              <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-3 py-1 rounded">ISRO POEM-4</span>
              <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-3 py-1 rounded">Patomic Labs</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} DeployNXT Private Limited. All Rights Reserved.
          </div>

          {/* <div className="flex flex-wrap gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Security Compliance</span>
            <span className="hover:text-slate-300 cursor-pointer">Bilateral NDA Terms</span>
            <span className="hover:text-slate-300 cursor-pointer">ITAR/EAR Controls</span>
          </div> */}
        </div>

      </div>
    </footer>
  );
}
