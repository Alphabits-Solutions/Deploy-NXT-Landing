import {
  Home as HomeIcon,
  Rocket,
  Users,
  Briefcase,
  Mail,
  MessageSquare,
  type LucideIcon
} from "lucide-react";

interface FloatingNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const DOCK_ITEMS: { id: string; title: string; tooltip: string; icon: LucideIcon }[] = [
  { id: "home", title: "Home", tooltip: "Home", icon: HomeIcon },
  { id: "products", title: "Products", tooltip: "Products", icon: Rocket },
  { id: "team", title: "Team", tooltip: "Team", icon: Users },
  { id: "careers", title: "Careers", tooltip: "Careers", icon: Briefcase },
  { id: "blog", title: "Blog/Newsletter", tooltip: "Blog / Newsletter", icon: Mail },
  { id: "contact", title: "Contact Us", tooltip: "Contact Us", icon: MessageSquare }
];

// Floating right navigation sidebar dock
export function FloatingNav({ activeSection, onNavigate }: FloatingNavProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl rounded-full p-2 flex flex-col gap-2 items-center">
        {DOCK_ITEMS.map(({ id, title, tooltip, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === id
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110"
                : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
            }`}
            title={title}
          >
            <Icon className="h-5 w-5" />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              {tooltip}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
