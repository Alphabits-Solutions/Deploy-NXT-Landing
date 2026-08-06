import { useRef, useState } from "react";
import { Check, Minimize2, Paperclip, Upload, X } from "lucide-react";
import { Select } from "./ui/Select";
import {
  ACCEPTED_FILE_EXTENSIONS,
  formatFileSize,
  validateFile,
} from "../utils/fileUpload";

const EXPERIENCE_OPTIONS = [
  { value: "junior", label: "Entry level (0 - 2 Years)" },
  { value: "mid", label: "Mid level (2 - 5 Years)" },
  { value: "senior", label: "Senior level (5 - 8 Years)" },
  { value: "director", label: "Principal / Director (8+ Years)" },
];
import type { JobPosition } from "../types";

interface JobApplicationModalProps {
  job: JobPosition;
  onClose: () => void;
}

const EMPTY_APPLY_FORM = {
  name: "",
  email: "",
  phone: "",
  experience: "mid",
  coverLetter: ""
};

// Career application modal (opens from the Careers section)
export function JobApplicationModal({ job, onClose }: JobApplicationModalProps) {
  const [applyForm, setApplyForm] = useState(EMPTY_APPLY_FORM);
  const [applySubmitted, setApplySubmitted] = useState(false);
  // Resume attachment lives in local state (a File isn't part of the text form).
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate a chosen resume against the allowed types and size cap.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setResume(null);
      e.target.value = "";
      return;
    }

    setFileError(null);
    setResume(file);
  };

  // Clear the current resume and reset the underlying input.
  const removeResume = () => {
    setResume(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle job apply submit
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // A resume upload is required to submit.
    if (!resume) {
      setFileError("Please attach your resume.");
      return;
    }
    setApplySubmitted(true);
    setTimeout(() => {
      setApplySubmitted(false);
      setApplyForm(EMPTY_APPLY_FORM);
      removeResume();
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-200 text-left space-y-6 relative max-h-[90vh] overflow-y-auto text-slate-900">

        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-teal-600 uppercase tracking-wider font-bold">
              SECURE CAREER PORTAL
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">Apply: {job.title}</h3>
            <p className="text-xs text-slate-500 font-mono">Location: {job.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
          >
            <Minimize2 className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleApplySubmit} className="space-y-4">

          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Your Full Name *</label>
            <input
              type="text"
              required
              value={applyForm.name}
              onChange={(e) => setApplyForm({...applyForm, name: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Contact Email *</label>
              <input
                type="email"
                required
                value={applyForm.email}
                onChange={(e) => setApplyForm({...applyForm, email: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Phone Number *</label>
              <input
                type="tel"
                required
                value={applyForm.phone}
                onChange={(e) => setApplyForm({...applyForm, phone: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Total Relevant Experience *</label>
            <Select
              variant="modal"
              value={applyForm.experience}
              options={EXPERIENCE_OPTIONS}
              onChange={(v) => setApplyForm({...applyForm, experience: v})}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Resume / CV *</label>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_FILE_EXTENSIONS}
              onChange={handleFileChange}
              className="hidden"
            />
            {resume ? (
              <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <Paperclip className="h-4 w-4 text-teal-600 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-slate-900 font-medium truncate">
                    {resume.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {formatFileSize(resume.size)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeResume}
                  aria-label="Remove resume"
                  className="shrink-0 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 w-full bg-slate-50 border border-dashed border-slate-300 hover:border-teal-600 hover:bg-white rounded-xl px-4 py-3 text-sm text-slate-500 font-medium transition-all focus:outline-none focus:border-teal-600 cursor-pointer"
              >
                <Upload className="h-4 w-4 text-teal-600 shrink-0" />
                Upload (PDF, DOC, PPT · 10MB)
              </button>
            )}
            {fileError && (
              <p className="mt-2 text-xs text-red-600 font-mono">
                {fileError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Brief Cover Note / Space Ambitions</label>
            <textarea
              rows={3}
              placeholder="Tell us about a physical mechanism or system you are proud of designing."
              value={applyForm.coverLetter}
              onChange={(e) => setApplyForm({...applyForm, coverLetter: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 rounded-xl p-4 text-sm focus:outline-none font-medium"
            />
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
            By submitting this form, you authorize our recruitment partners at <span className="text-teal-600 font-bold">DeployNXT</span> to store and qualify your profile for active aerospace roles.
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-md shadow-teal-600/10 cursor-pointer"
            >
              Submit Application
            </button>
          </div>

        </form>

        {applySubmitted && (
          <div className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="h-16 w-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
              <Check className="h-8 w-8" />
            </div>
            <h4 className="font-extrabold text-xl text-slate-900">Application Transmitted!</h4>
            <p className="text-sm text-slate-600 max-w-xs">
              Hi {applyForm.name}, your application for the <strong>{job.title}</strong> has been logged. Our recruitment desk will review your resume and follow up with orbital tests.
            </p>
            <button
              onClick={() => {
                setApplySubmitted(false);
                onClose();
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
