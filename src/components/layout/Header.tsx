interface HeaderProps {
  activeSection: string;
  onNavigate: (id: string) => void;
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
export function Header({ activeSection, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* DeployNXT combined logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center transition-transform hover:scale-[1.02]"
        >
          <img
            src="/images/DNX%20Logo/DeployNXT_logo_combined.png"
            alt="DeployNXT — Design, Develop, Disrupt"
            className="h-12 w-auto object-contain"
          />
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
