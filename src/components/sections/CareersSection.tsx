import { useState } from "react";
import { ChevronDown, MapPin, Clock } from "lucide-react";
import { SAMPLE_JOBS } from "../../data/jobs";
import type { JobPosition } from "../../types";
import { JobApplicationModal } from "../JobApplicationModal";

interface CareersSectionProps {
  onSpeculativePitch: () => void;
}

// Careers section (Section 4)
export function CareersSection({ onSpeculativePitch }: CareersSectionProps) {
  // Expanded Job position details view
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  // Careers apply modal state
  const [applyJob, setApplyJob] = useState<JobPosition | null>(null);

  return (
    <>
      {/* Full-bleed dark section: breaks the run of white sections
          (Team -> Careers -> Blog) into white -> dark -> white rhythm. */}
      <section id="careers" className="relative overflow-hidden py-24 bg-band scroll-mt-20">

        {/* Radial teal glow overlay (full width) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 80% 0%, rgba(16,199,160,.16), transparent 55%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center gap-3 mb-12">
              <span className="font-mono font-bold text-[11px] tracking-[0.2em] text-accent uppercase">
                WE ARE HIRING IN BENGALURU
              </span>
              <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-white tracking-tight">
                Shape the Future of Space Tech
              </h2>
              <p className="text-dark-body text-base md:text-lg">
                Work on mission-critical subsystems that power, guide, and propel next-generation satellites. Join our high-speed aerospace engineering workspace.
              </p>
            </div>

          {/* Job Openings Board */}
          <div className="relative space-y-3 max-w-4xl mx-auto">

            {SAMPLE_JOBS.map((job) => {
              const isExpanded = expandedJob === job.id;
              return (
                <div
                  key={job.id}
                  className={`bg-inset border rounded-xl transition-colors overflow-hidden ${
                    isExpanded
                      ? "border-accent/45"
                      : "border-white/[0.07] hover:border-white/20"
                  }`}
                >
                  {/* Job Accordion Header */}
                  <button
                    onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                    className="w-full text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-wide">
                        <span className="text-dark-body uppercase">{job.department}</span>
                        <span className="text-accent uppercase">{job.type}</span>
                      </div>
                      <h3 className="font-grotesk text-lg md:text-xl font-semibold text-white">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-dark-body font-mono">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-dark-body" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-dark-body" />
                          Experience: {job.experience}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                      <span className="text-xs text-accent font-mono font-bold hidden md:inline">
                        {isExpanded ? "Collapse Details" : "View Requirements"}
                      </span>
                      <ChevronDown
                        className={`h-[18px] w-[18px] text-accent transition-transform duration-[250ms] ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Job Accordion Content */}
                  {isExpanded && (
                    <div className="px-5 pb-6 md:px-6 md:pb-7 border-t border-white/[0.08] pt-5 space-y-6 text-left animate-[fadeIn_0.3s_ease-out]">

                      {/* Description */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono text-dark-body uppercase tracking-wider font-bold">ROLE SUMMARY</h4>
                        <p className="text-dark-body text-sm leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-dark-body uppercase tracking-wider font-bold">KEY RESPONSIBILITIES</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-faint text-sm flex items-start gap-2 bg-white/[0.03] p-3 rounded-lg border border-white/[0.06]">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-dark-body uppercase tracking-wider font-bold">QUALIFICATIONS</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="text-faint text-sm flex items-start gap-2 bg-white/[0.03] p-3 rounded-lg border border-white/[0.06]">
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-text mt-2 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-6 border-t border-white/[0.08] flex flex-wrap gap-4 items-center justify-between">
                        <div className="text-xs text-dark-body">
                          Salary budget: <span className="font-semibold text-faint font-mono">{job.salary}</span>
                        </div>
                        <button
                          onClick={() => setApplyJob(job)}
                          className="bg-accent hover:bg-accent-hover text-accent-ink font-bold text-sm px-6 py-3 rounded-[9px] transition-all active:scale-[0.98]"
                        >
                          Apply Now →
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

            {/* Quick Notice */}
            <div className="relative mt-12 text-center text-sm text-dark-body">
              Don't see a role matching your skill set? We are always on the look out for space pioneers.
              <button
                onClick={onSpeculativePitch}
                className="text-accent hover:text-accent-hover font-bold ml-1 hover:underline"
              >
                Send an open speculative pitch.
              </button>
            </div>

        </div>
      </section>

      {/* Career application modal */}
      {applyJob && (
        <JobApplicationModal job={applyJob} onClose={() => setApplyJob(null)} />
      )}
    </>
  );
}
