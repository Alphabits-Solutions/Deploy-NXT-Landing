import { useEffect, useState } from "react";

export const SECTION_IDS = ["home", "products", "supporters", "team", "careers", "blog", "contact"];

/**
 * Tracks which page section is currently in view and provides
 * a smooth-scroll helper for the navigation elements.
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll to helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
    }
  };

  // Tracking Active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of SECTION_IDS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            // "supporters" has no nav link (it's folded under Products), so
            // highlight Products while it's in view instead of leaving the nav
            // with nothing active.
            setActiveSection(section === "supporters" ? "products" : section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { activeSection, scrollToSection };
}
