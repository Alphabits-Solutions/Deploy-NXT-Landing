import { BrandMark } from "./BrandMark";

interface HeaderProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  resolvedLogo: string | null;
}

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "supporters", label: "Supporters" },
  { id: "team", label: "Team" },
  { id: "careers", label: "Careers" },
  { id: "blog", label: "Blog" }
];

// Glassy sticky header / navigation bar
export function Header({ activeSection, onNavigate, resolvedLogo }: HeaderProps) {
  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo element with Google Drive custom override */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 group transition-transform hover:scale-[1.02]"
        >
          {resolvedLogo ? (
            <img
              src={resolvedLogo}
              alt="Custom Logo"
              className="h-10 w-auto object-contain rounded-md shadow-sm border border-teal-50"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const sib = e.currentTarget.nextElementSibling;
                if (sib) sib.removeAttribute("style");
              }}
            />
          ) : null}

          {/* Elegant SVG space structure logo as default/fallback */}
          <BrandMark style={resolvedLogo ? { display: "none" } : {}} />

          <div className="flex flex-col text-left">
            <span className="font-semibold tracking-tight text-xl text-slate-900 group-hover:text-teal-600 transition-colors font-mono">
              DeployNXT
            </span>
            <span className="text-[9px] font-mono tracking-widest text-teal-600 font-bold uppercase leading-none">
              DEPLOYABLE SPACE INFRASTRUCTURE
            </span>
          </div>
        </button>

        {/* Standard Top Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`font-medium text-sm transition-colors hover:text-teal-600 ${activeSection === id ? "text-teal-600" : "text-slate-600"}`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => onNavigate("contact")}
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/10 hover:shadow-teal-600/20 active:scale-[0.98]"
          >
            Contact Us
          </button>
        </nav>

      </div>
    </header>
  );
}
