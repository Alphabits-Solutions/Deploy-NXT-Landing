import { useState } from "react";
import { Check, ChevronRight, Send } from "lucide-react";
import { BLOG_ARTICLES } from "../../data/articles";

// Blog / news & newsletter section (Section 5)
export function BlogSection() {
  // Newsletter state
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  // Handle newsletter submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setNewsSubmitted(true);
      setTimeout(() => {
        setNewsSubmitted(false);
        setNewsEmail("");
      }, 5000);
    }
  };

  return (
    <section id="blog" className="py-15 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-teal-600 font-mono font-bold text-xs tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 uppercase inline-block mb-2">
            REPORTS &amp; UPDATES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Aerospace Insights &amp; Newsletters
          </h2>
          <p className="text-slate-600 text-lg">
            Stay in the loop with active payload operations, deployable research updates, and sustainable space-flight breakthroughs.
          </p>
        </div>

        {/* Grid Layout: Articles + Newsletter Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Articles Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold block mb-4">LATEST PRESS RELEASES</h3>

            {BLOG_ARTICLES.map((article, idx) => (
              <article key={idx} className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl space-y-3 hover:border-teal-500/40 transition-colors text-left">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span className="bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded border border-teal-100">
                    {article.category}
                  </span>
                  <div className="flex gap-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 leading-snug">
                  {article.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {article.snippet}
                </p>
                <button
                  onClick={() => {
                    alert(`Full press release text is being finalized for publish. Stay tuned! \n\nFocus Area: ${article.title}`);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700"
                >
                  Read full article <ChevronRight className="h-3 w-3" />
                </button>
              </article>
            ))}
          </div>

          {/* Newsletter Subscription Column */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden">
              {/* Visual Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />

              <div className="space-y-2 text-left relative z-10">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider font-bold">DeployNXT's NEWS SUBSCRIPTION</span>
                <h4 className="text-2xl font-bold">Join the Sustainable Space Flight Movement</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Get bi-weekly briefings on non-toxic propellants, orbital regulations, structural mechanics, and pre-release access to tech datasheets.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Corporate Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. engineer@satellite-corp.com"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="news-consent" required className="accent-teal-500 h-4 w-4" />
                  <label htmlFor="news-consent" className="text-[11px] text-slate-400 leading-tight select-none">
                    I agree to receive orbital technology newsletters. Max 1 email every 14 days.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-teal-500/10 flex items-center justify-center gap-2"
                >
                  Subscribe to Newsletter
                  <Send className="h-4 w-4" />
                </button>
              </form>

              {/* Animated success box */}
              {newsSubmitted && (
                <div className="bg-teal-950 border border-teal-500/30 rounded-2xl p-4 text-left flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
                  <div className="p-1 rounded-full bg-teal-500/20 text-teal-400 shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">Subscription Successful!</div>
                    <p className="text-xs text-slate-300 leading-normal">
                      Welcome to DeployNXT's News. We've dispatched your first orbit update dossier to your inbox.
                    </p>
                  </div>
                </div>
              )}

              <div className="border-t border-slate-800 pt-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">KN</div>
                    <div className="h-7 w-7 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">RK</div>
                    <div className="h-7 w-7 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">HV</div>
                  </div>
                  <span className="text-xs text-slate-400">Joined by 840+ spacecraft system analysts &amp; deep-tech engineers.</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
