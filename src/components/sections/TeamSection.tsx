import { TEAM_MEMBERS } from "../../data/team";

interface TeamSectionProps {
  onNavigate: (id: string) => void;
}

// DeployNXT team section (Section 3)
export function TeamSection({ onNavigate }: TeamSectionProps) {
  return (
    <section id="team" className="py-15 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header section (aligned with DeployNXT style, Teal colors with White background) */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-teal-600 font-mono font-bold text-xs tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 uppercase inline-block mb-2">
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
                className="relative overflow-hidden bg-white border-[1.5px] border-accent rounded-[18px] p-[30px] pb-[26px] transition-[transform,box-shadow] duration-[280ms] ease-out hover:-translate-y-[5px] hover:shadow-[0_22px_40px_-24px_rgba(11,22,34,.4)] flex flex-col justify-between space-y-6"
              >
                {/* Top-right green glow */}
                <div
                  className="pointer-events-none absolute -top-[70px] -right-[50px] h-[200px] w-[200px]"
                  style={{ background: "radial-gradient(circle, rgba(16,199,160,.18), transparent 70%)" }}
                />

                <div className="relative space-y-6">

                  {/* Top avatar and name header block */}
                  <div className="flex items-center gap-4">

                    {/* Avatar with gradient ring */}
                    <div className="h-[62px] w-[62px] rounded-full p-[2.5px] bg-gradient-to-br from-accent to-teal-text shrink-0">
                      <div className="h-full w-full rounded-full bg-[#eef3f2] flex items-center justify-center overflow-hidden">
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="font-grotesk font-bold text-xl text-teal-text">
                            {member.initials}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <h3 className="font-grotesk font-bold text-[19px] text-ink tracking-tight">
                        {member.name}
                      </h3>
                      <span className="inline-block bg-tag-bg text-teal-text border border-tag-border text-[10px] font-mono tracking-[0.08em] uppercase font-medium px-2.5 py-0.5 rounded-[5px]">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Bio paragraph */}
                  <p className="text-body text-sm md:text-[15px] leading-[1.7] text-left">
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
                <div className="relative flex items-center justify-between pt-4 border-t border-[#eef2f4]">
                  <span className="text-[10px] font-mono text-meta font-medium uppercase tracking-[0.12em]">
                    COMMITTED TO THE ORBIT
                  </span>
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[7px] text-[13.5px] font-bold text-teal-text hover:text-teal-text-hover transition-colors"
                  >
                    <span className="h-5 w-5 rounded-[4px] bg-teal-text text-white flex items-center justify-center font-grotesk text-[11px] font-bold">
                      in
                    </span>
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
