import { TEAM_MEMBERS } from "../../data/team";

interface TeamSectionProps {
  onNavigate: (id: string) => void;
}

// DeployNXT team section (Section 3)
export function TeamSection({ onNavigate }: TeamSectionProps) {
  return (
    <section id="team" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header section (aligned with DeployNXT style, Teal colors with White background) */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-teal-600 font-mono font-bold text-xs tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 uppercase">
            DEEP TECH TALENT PLATFORM
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-slate-600 text-lg">
            Cumulatively bringing 15+ years of combined experience working in space, telecom, and deep consulting sectors across 7 countries.
          </p>
        </div>

        {/* Team Grid Layout (Matches DeployNXT's premium structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {TEAM_MEMBERS.map((member, idx) => {
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-900/[0.02] transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-6">

                  {/* Top avatar and name header block */}
                  <div className="flex items-center gap-4">

                    {/* Avatar container */}
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white font-mono font-bold text-lg shadow-md shadow-teal-900/10">
                      {member.initials}
                    </div>

                    <div className="space-y-1 text-left">
                      <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">
                        {member.name}
                      </h3>
                      <div className="text-teal-600 text-xs font-mono tracking-widest uppercase font-bold">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  {/* Bio paragraph */}
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed text-left">
                    {member.bio}
                  </p>

                  {/* Highlights of past experience */}
                  {/* <div className="space-y-3 pt-2 text-left">
                    <span className="text-slate-500 text-[11px] font-mono tracking-wider uppercase font-bold block">
                      PRIOR CAREER HIGHLIGHTS
                    </span>
                    <div className="space-y-2">
                      {member.experience.map((exp, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-slate-700 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                          <span>{exp}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}

                </div>

                {/* Connect block with LinkedIn integration */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest">
                    COMMITTED TO THE ORBIT
                  </span>
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-3.5 py-1.5 rounded-lg transition-colors border border-teal-100"
                  >
                    {/* Custom Inline SVG for LinkedIn */}
                    <svg className="h-3.5 w-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>

              </div>
            );
          })}

        </div>

        {/* DeployNXT Credibility Banner */}
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-extrabold text-lg text-slate-900">
              Are you building serious deep-technology?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our founders have structured aerospace research, filed patents, and successfully sent systems to space. We act as real-world R&amp;D innovation partners to accelerate your spaceflight timeline.
            </p>
          </div>
          <button
            onClick={() => onNavigate("contact")}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0"
          >
            Collaborate With Us
          </button>
        </div>

      </div>
    </section>
  );
}
