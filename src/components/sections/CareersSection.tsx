import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Clock } from "lucide-react";
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
      <section id="careers" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-teal-600 font-mono font-bold text-xs tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 uppercase">
              WE ARE HIRING IN BENGALURU
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Shape the Future of Space Tech
            </h2>
            <p className="text-slate-600 text-lg">
              Work on mission-critical subsystems that power, guide, and propel next-generation satellites. Join our high-speed aerospace engineering workspace.
            </p>
          </div>

          {/* Job Openings Board */}
          <div className="space-y-4 max-w-4xl mx-auto">

            {SAMPLE_JOBS.map((job) => {
              const isExpanded = expandedJob === job.id;
              return (
                <div
                  key={job.id}
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    isExpanded
                      ? "bg-slate-50 border-teal-500 shadow-md"
                      : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  {/* Job Accordion Header */}
                  <button
                    onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                    className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-teal-50 text-teal-800 border border-teal-100 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                          {job.department}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2.5 py-0.5 rounded-full">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          Experience: {job.experience}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                      <span className="text-xs text-teal-600 font-mono font-bold hidden md:inline">
                        {isExpanded ? "Collapse Details" : "View Requirements"}
                      </span>
                      <div className={`p-2 rounded-full border ${isExpanded ? "bg-teal-600 text-white border-teal-600" : "bg-slate-50 text-slate-400 border-slate-200"}`}>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </button>

                  {/* Job Accordion Content */}
                  {isExpanded && (
                    <div className="px-6 pb-8 md:px-8 md:pb-10 border-t border-slate-200/60 pt-6 space-y-6 text-left animate-[fadeIn_0.3s_ease-out]">

                      {/* Description */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">ROLE SUMMARY</h4>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">KEY RESPONSIBILITIES</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-slate-700 text-sm flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-100">
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">QUALIFICATIONS</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="text-slate-700 text-sm flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-100">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                        <div className="text-xs text-slate-500">
                          Salary budget: <span className="font-semibold text-slate-700 font-mono">{job.salary}</span>
                        </div>
                        <button
                          onClick={() => setApplyJob(job)}
                          className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-teal-600/10 active:scale-[0.98]"
                        >
                          Apply For This Position
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* Quick Notice */}
          <div className="mt-12 text-center text-sm text-slate-500">
            Don't see a role matching your skill set? We are always on the look out for space pioneers.
            <button
              onClick={onSpeculativePitch}
              className="text-teal-600 hover:text-teal-700 font-bold ml-1 hover:underline"
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
