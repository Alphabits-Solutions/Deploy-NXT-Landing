import { useEffect, useState } from "react";
import { Check, ChevronRight, Send } from "lucide-react";
import { BLOG_ARTICLES } from "../../data/articles";

// Category-themed cover placeholders shown when an article has no image
const COVER_GRADIENTS: Record<string, string> = {
  "Mission Success":
    "linear-gradient(135deg, #0B1622 0%, #12303f 55%, #10C7A0 140%)",
  "IP & Innovation":
    "linear-gradient(135deg, #101d29 0%, #1b2b39 60%, #0E9E86 150%)",
  Sustainability:
    "linear-gradient(135deg, #0d2420 0%, #0E9E86 90%, #10C7A0 130%)",
};
const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #0B1622 0%, #1b2b39 60%, #10C7A0 150%)";

// Cards visible in the carousel at the current viewport width
function useCardsPerView() {
  const [cards, setCards] = useState(3);
  useEffect(() => {
    const update = () =>
      setCards(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cards;
}

// Blog / news & newsletter section (Section 5)
export function BlogSection() {
  const cardsPerView = useCardsPerView();
  const maxSlide = Math.max(0, BLOG_ARTICLES.length - cardsPerView);
  const [slide, setSlide] = useState(0);
  const currentSlide = Math.min(slide, maxSlide);
  const showNav = BLOG_ARTICLES.length > cardsPerView;

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) setSubscribed(true);
  };

  const gap = 26;
  const trackTransform = `translateX(calc(-${(currentSlide * 100) / cardsPerView}% - ${(gap * currentSlide) / cardsPerView}px))`;

  return (
    <section id="blog" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* Header block */}
        <div className="flex flex-col gap-3.5 mb-12 text-left max-w-[560px]">
          <span className="font-mono font-bold text-[13px] tracking-[.22em] uppercase text-teal-text">
            Latest from the Lab
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-ink tracking-[-.02em] leading-[1.08] font-grotesk">
            Aerospace Insights
          </h2>
          <p className="text-base text-body leading-[1.7]">
            Active payload operations, deployable research updates and sustainable
            space-flight breakthroughs — straight from the lab.
          </p>
        </div>

        {/* Carousel with arrows overlaid on the row edges */}
        <div className="relative">
          {/* Viewport — vertical padding + negative margins give the hover
              lift/shadow room to render inside the overflow-hidden viewport */}
          <div className="overflow-hidden pt-2 -mt-2 pb-12 -mb-12">
          <div
            className="flex gap-[26px] transition-transform duration-[550ms] ease-[cubic-bezier(.4,0,.2,1)]"
            style={{ transform: trackTransform }}
          >
            {BLOG_ARTICLES.map((article, idx) => (
              <article
                key={idx}
                style={{ width: `calc((100% - ${gap * (cardsPerView - 1)}px) / ${cardsPerView})` }}
                className="shrink-0 bg-card rounded-[18px] overflow-hidden cursor-pointer text-left transition-[transform,box-shadow] duration-[280ms] ease-out hover:-translate-y-[5px] hover:shadow-[0_24px_44px_-24px_rgba(11,22,34,.4)]"
              >
                <div className="relative h-[220px]">
                  {article.image ? (
                    <img src={article.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{ background: COVER_GRADIENTS[article.category] ?? DEFAULT_GRADIENT }}
                    />
                  )}
                  <span className="absolute top-4 left-4 font-mono text-[10.5px] font-bold uppercase bg-[#E4F5F0] text-[#0E9E86] border border-[#BFE9DF] px-[11px] py-[5px] rounded-md">
                    {article.category}
                  </span>
                </div>

                <div className="px-6 pt-6 pb-7">
                  <div className="font-mono text-xs text-[#93a3b0] mb-3">
                    {article.date} • {article.readTime}
                  </div>
                  <h3 className="text-xl font-bold text-[#0D1B2A] leading-[1.28] tracking-[-.01em] mb-3 [font-family:'Space_Grotesk',sans-serif]">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#5A6B7B] leading-[1.7] mb-[18px]">
                    {article.snippet}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#0E9E86]">
                    Read full article <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
          </div>

          {/* Edge arrows — round, teal-ringed, floating over the row edges */}
          {showNav && (
            <>
              <button
                type="button"
                aria-label="Previous articles"
                onClick={() => setSlide(Math.max(0, currentSlide - 1))}
                className="group absolute top-1/2 -translate-y-1/2 z-10 -left-3 sm:-left-[26px] h-14 w-14 rounded-full border-[1.5px] border-accent bg-white text-ink flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)] shadow-[0_12px_30px_-12px_rgba(11,22,34,.4),0_0_0_6px_rgba(16,199,160,.08)] hover:bg-accent hover:text-accent-ink hover:scale-[1.08] hover:shadow-[0_16px_34px_-10px_rgba(16,199,160,.6),0_0_0_8px_rgba(16,199,160,.14)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next articles"
                onClick={() => setSlide(Math.min(maxSlide, currentSlide + 1))}
                className="group absolute top-1/2 -translate-y-1/2 z-10 -right-3 sm:-right-[26px] h-14 w-14 rounded-full border-[1.5px] border-accent bg-white text-ink flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)] shadow-[0_12px_30px_-12px_rgba(11,22,34,.4),0_0_0_6px_rgba(16,199,160,.08)] hover:bg-accent hover:text-accent-ink hover:scale-[1.08] hover:shadow-[0_16px_34px_-10px_rgba(16,199,160,.6),0_0_0_8px_rgba(16,199,160,.14)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {showNav && (
          <div className="flex justify-center gap-[9px] mt-[38px]">
            {Array.from({ length: maxSlide + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-7 bg-[#10C7A0]" : "w-2 bg-[#d4dbe0]"
                }`}
              />
            ))}
          </div>
        )}

        {/* Newsletter panel */}
        <div className="relative mt-16 bg-[#0B1622] rounded-[22px] px-7 py-10 md:px-14 md:py-13 overflow-hidden grid gap-10 lg:gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Radial teal glow */}
          <div
            className="absolute -top-[120px] -right-[60px] h-[420px] w-[420px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(16,199,160,.18), transparent 70%)" }}
          />

          <div className="relative z-10 text-left space-y-4">
            <span className="font-mono font-bold text-[12.5px] tracking-[.16em] uppercase text-[#10C7A0] block">
              DeployNXT's News Subscription
            </span>
            <h3 className="text-2xl md:text-[34px] font-bold text-white leading-[1.12] [font-family:'Space_Grotesk',sans-serif]">
              Join the Sustainable Space Flight Movement
            </h3>
            <p className="text-[15.5px] text-[#8fa1b0] leading-[1.7] max-w-[440px]">
              Get bi-weekly briefings on non-toxic propellants, orbital regulations,
              structural mechanics, and pre-release access to tech datasheets.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex">
                {["KN", "RK", "HV"].map((initials, i) => (
                  <div
                    key={initials}
                    className={`h-[34px] w-[34px] rounded-full bg-[#1b2b39] border-2 border-[#0B1622] flex items-center justify-center font-mono text-[11px] font-bold text-[#cfe0ea] ${i > 0 ? "-ml-2" : ""}`}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-[13.5px] text-[#8fa1b0]">
                Joined by 840+ spacecraft system analysts &amp; deep-tech engineers.
              </span>
            </div>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="relative z-10 flex flex-col gap-4 text-left">
            <label
              htmlFor="news-email"
              className="font-mono text-xs text-[#8fa1b0] tracking-[.14em] uppercase"
            >
              Corporate Email Address
            </label>
            <input
              id="news-email"
              type="email"
              required
              placeholder="e.g. engineer@satellite-corp.com"
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
              disabled={subscribed}
              className="w-full bg-[#101d29] border border-[#22323f] rounded-xl px-[18px] py-4 font-mono text-sm text-[#e6eef3] focus:outline-none focus:border-[#10C7A0]"
            />
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="news-consent"
                required
                disabled={subscribed}
                className="accent-[#10C7A0] h-[15px] w-[15px] mt-0.5 shrink-0"
              />
              <label htmlFor="news-consent" className="text-[12.5px] text-[#8fa1b0] leading-tight select-none">
                I agree to receive orbital technology newsletters. Max 1 email every 14 days.
              </label>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-[rgba(16,199,160,.12)] border border-[rgba(16,199,160,.4)] text-[#10C7A0] rounded-xl px-[18px] py-[15px] font-mono text-[13px]">
                <Check className="h-4 w-4 shrink-0" />
                Transmission received — check your inbox to confirm.
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#10C7A0] hover:bg-[#0fb492] text-[#06231d] font-bold text-[15.5px] py-[17px] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Subscribe to Newsletter
                <Send className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
