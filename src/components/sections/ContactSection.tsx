import { useRef, useState } from "react";
import {
  Check,
  Handshake,
  Lock,
  Mail,
  MapPin,
  Paperclip,
  Target,
  Upload,
  X,
} from "lucide-react";
import type { ContactFormData } from "../../types";
import { Select } from "../ui/Select";

const INTEREST_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "careers", label: "Careers" },
  {
    value: "partnership",
    label: "Partnership & Collaboration",
  },
  { value: "vendor", label: "Vendor/Supplier" },
];

// Accepted attachment types and 10MB size cap for the contact form file field.
const ACCEPTED_FILE_EXTENSIONS = ".pdf,.doc,.docx,.ppt,.pptx";
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Format a byte count as a short human-readable size (e.g. "2.4 MB").
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface ContactSectionProps {
  contactForm: ContactFormData;
  setContactForm: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export const EMPTY_CONTACT_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  org: "",
  interest: "general",
  message: "",
};

// Contact form section (Section 6). The form state is lifted to App so the
// Products and Careers sections can prefill it before scrolling here.
export function ContactSection({
  contactForm,
  setContactForm,
}: ContactSectionProps) {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  // Attachment lives in local state (not ContactFormData) since a File isn't
  // serializable and the form state is lifted/prefilled by other sections.
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate a chosen file against the allowed types and size cap.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const nameOk = ACCEPTED_FILE_EXTENSIONS.split(",").some((ext) =>
      file.name.toLowerCase().endsWith(ext),
    );
    const typeOk = file.type === "" || ACCEPTED_FILE_TYPES.includes(file.type);
    if (!nameOk || !typeOk) {
      setFileError("Unsupported file type. Use PDF, DOC, or PPT.");
      setAttachment(null);
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File is too large. Maximum size is 10MB.");
      setAttachment(null);
      e.target.value = "";
      return;
    }

    setFileError(null);
    setAttachment(file);
  };

  // Clear the current attachment and reset the underlying input.
  const removeAttachment = () => {
    setAttachment(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle general contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm(EMPTY_CONTACT_FORM);
      removeAttachment();
    }, 6000);
  };

  return (
    <section id="contact" className="py-15 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-teal-600 font-mono font-bold text-xs tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 uppercase inline-block mb-2">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
                Let's Build the Future of Space Together!
              </h2>
              <p className="text-slate-600 text-base md:text-lg text-justify">
                Whether you're developing a satellite, exploring a new mission,
                or seeking an engineering partner, we're here to help.
              </p>
              <p className="text-slate-600 text-base md:text-lg text-justify">
                Connect with our team to discuss spacecraft structures,
                deployable systems, solar arrays, custom engineering, or
                collaborative R&amp;D. Our team typically responds within one
                business day.
              </p>
            </div>

            {/* Physical Contact Details (Aligning with DeployNXT details) */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <MapPin className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">
                    Engineering Presence
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Gujarat &amp; Karnataka, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <Mail className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">
                    Corporate Email
                  </div>
                  <div className="text-xs text-teal-600 font-mono font-bold mt-1">
                    contact@deploynxt.com
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <Handshake className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">
                    Collaboration
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Open to partnerships, customer engagements, and
                    collaborative R&amp;D.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <Lock className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">
                    Confidentiality Assured
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Technical discussions and project information are handled
                    under mutual NDAs upon request.
                  </p>
                </div>
              </div>

              {/* Quality Standards Badge */}
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <Target className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">
                    Mission-Driven Engineering
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Every project is approached with a focus on reliability,
                    manufacturability, and mission success, helping customers
                    reduce development time and technical risk.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 flex">
            <div className="w-full h-full flex flex-col bg-white border-[1.5px] border-accent rounded-[18px] p-9 space-y-6">
              <div className="text-left space-y-1.5">
                <h3 className="font-grotesk font-bold text-xl text-ink">
                  Let's Build Together
                </h3>
                <div className="inline-flex items-center gap-[7px] text-[10.5px] text-teal-text font-mono tracking-[0.12em]">
                  <span className="h-[7px] w-[7px] rounded-full bg-accent" />
                  ENCRYPTED TRANSMISSION PROTOCOL ACTIVE
                </div>
              </div>

              <form
                onSubmit={handleContactSubmit}
                className="flex-1 flex flex-col text-left"
              >
                {/* Normal field spacing; the message box grows to fill the card height */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10.5px] font-mono text-dark-body uppercase tracking-[0.12em] mb-2 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-field border-[1.5px] border-hairline rounded-[10px] px-[15px] py-[13px] text-sm text-ink font-mono transition-all focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/[0.14]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-mono text-dark-body uppercase tracking-[0.12em] mb-2 font-medium">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-field border-[1.5px] border-hairline rounded-[10px] px-[15px] py-[13px] text-sm text-ink font-mono transition-all focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/[0.14]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10.5px] font-mono text-dark-body uppercase tracking-[0.12em] mb-2 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full bg-field border-[1.5px] border-hairline rounded-[10px] px-[15px] py-[13px] text-sm text-ink font-mono transition-all focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/[0.14]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-mono text-dark-body uppercase tracking-[0.12em] mb-2 font-medium">
                        Organization / Company / Individual
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your organization name"
                        value={contactForm.org}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            org: e.target.value,
                          })
                        }
                        className="w-full bg-field border-[1.5px] border-hairline rounded-[10px] px-[15px] py-[13px] text-sm text-ink font-mono transition-all focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/[0.14]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10.5px] font-mono text-dark-body uppercase tracking-[0.12em] mb-2 font-medium">
                        Primary Topic of Interest
                      </label>
                      <Select
                        value={contactForm.interest}
                        options={INTEREST_OPTIONS}
                        onChange={(v) =>
                          setContactForm({ ...contactForm, interest: v })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-mono text-dark-body uppercase tracking-[0.12em] mb-2 font-medium">
                        Attach a File
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={ACCEPTED_FILE_EXTENSIONS}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {attachment ? (
                        <div className="flex items-center gap-3 w-full bg-field border-[1.5px] border-hairline rounded-[10px] px-[15px] py-[13px]">
                          <Paperclip className="h-4 w-4 text-accent shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm text-ink font-mono truncate">
                              {attachment.name}
                            </div>
                            <div className="text-[10.5px] text-dark-body font-mono">
                              {formatFileSize(attachment.size)}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeAttachment}
                            aria-label="Remove attachment"
                            className="shrink-0 text-dark-body hover:text-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 w-full bg-field border-[1.5px] border-dashed border-hairline rounded-[10px] px-[15px] py-[13px] text-sm text-dark-body font-mono transition-all hover:border-accent hover:bg-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/[0.14]"
                        >
                          <Upload className="h-4 w-4 text-accent shrink-0" />
                          Upload (PDF, DOC, PPT · 10MB)
                        </button>
                      )}
                      {fileError && (
                        <p className="mt-2 text-xs text-red-600 font-mono">
                          {fileError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="block text-[10.5px] font-mono text-dark-body uppercase tracking-[0.12em] mb-2 font-medium">
                      Your Message / Sizing Requirements
                    </label>
                    <textarea
                      required
                      placeholder="Tell us about your project, requirements, or how we can help you."
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="w-full flex-1 min-h-[120px] resize-y bg-field border-[1.5px] border-hairline rounded-[10px] px-[15px] py-[13px] text-sm text-ink font-mono transition-all focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/[0.14]"
                    />
                  </div>
                </div>

                {/* Consent + submit, pinned to the bottom of the card */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="nda-checkbox"
                      required
                      className="accent-teal-500 h-4 w-4"
                    />
                    <label
                      htmlFor="nda-checkbox"
                      className="text-xs text-slate-500 select-none"
                    >
                      I authorize the systems engineering team to review this
                      message under mutual NDA protocols.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-hover text-accent-ink font-bold text-[15px] p-4 rounded-xl transition-all active:scale-[0.98] text-center"
                  >
                    Submit Systems Query
                  </button>
                </div>
              </form>

              {/* Animated contact success banner */}
              {contactSubmitted && (
                <div className="bg-teal-900 border border-teal-500/30 rounded-2xl p-6 text-left space-y-3 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-teal-500/20 text-teal-400">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-extrabold text-white text-base">
                      Transmission Dispatched Successfully!
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Your query has been assigned to{" "}
                    <span className="text-teal-400 font-bold">Kunal Naik</span>{" "}
                    and the Systems Engineering desk. We have initialized a
                    secure file container to receive your payload
                    specifications.
                  </p>
                  <div className="text-[10px] font-mono text-teal-400/80">
                    SECURE ID REFERENCE: TX-
                    {Math.floor(100000 + Math.random() * 900000)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
