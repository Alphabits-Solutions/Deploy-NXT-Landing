import { useState } from "react";
import { Check, Mail, MapPin, ShieldCheck } from "lucide-react";
import type { ContactFormData } from "../../types";

interface ContactSectionProps {
  contactForm: ContactFormData;
  setContactForm: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export const EMPTY_CONTACT_FORM: ContactFormData = {
  name: "",
  email: "",
  org: "",
  interest: "general",
  message: ""
};

// Contact form section (Section 6). The form state is lifted to App so the
// Products and Careers sections can prefill it before scrolling here.
export function ContactSection({ contactForm, setContactForm }: ContactSectionProps) {
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Handle general contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm(EMPTY_CONTACT_FORM);
    }, 6000);
  };

  return (
    <section id="contact" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-teal-600 font-mono font-bold text-xs tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 uppercase inline-block">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
                Let's Collaborate On Your Next Flight
              </h2>
              <p className="text-slate-600 text-base md:text-lg">
                Submit technical queries, request physical sizing simulations, or initiate standard launch-integration NDAs. Our systems engineering department responds within 24 hours.
              </p>
            </div>

            {/* Physical Contact Details (Aligning with DeployNXT details) */}
            <div className="space-y-4">

              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <MapPin className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">Headquarters (R&amp;D Division)</div>
                  <p className="text-xs text-slate-600 mt-1">
                    905, Prabhakunj Heights, Station Road, Navsari, Gujarat, India, 396445
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <MapPin className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">Design &amp; Testing Facility</div>
                  <p className="text-xs text-slate-600 mt-1">
                    Whitefield Aerospace Corridor, Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <Mail className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 text-sm">Direct Email Channels</div>
                  <div className="text-xs text-teal-600 font-mono font-bold mt-1 space-y-1">
                    <p>Corporate: contact@deploynxt.com</p>
                    {/* <p>Space Integration Desk: engineering@aethernxt.space</p> */}
                  </div>
                </div>
              </div>

            </div>

            {/* Quality Standards Badge */}
            <div className="border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                <span>Aerospace Integration Assured</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every communication is held in strict compliance under aerospace-grade bilateral NDAs. We ensure design data security according to ISO 27001 requirements.
              </p>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">

              <div className="text-left space-y-1">
                <h3 className="font-bold text-xl text-slate-900">Secure Consultation Portal</h3>
                <p className="text-xs text-slate-500 font-mono">ENCRYPTED TRANSMISSION PROTOCOL ACTIVE</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 text-left">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kunal Naik"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. k.naik@deploynxt.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Organization / Agency</label>
                    <input
                      type="text"
                      placeholder="e.g. Satellite Launch Corp"
                      value={contactForm.org}
                      onChange={(e) => setContactForm({...contactForm, org: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Primary Topic of Interest</label>
                    <select
                      value={contactForm.interest}
                      onChange={(e) => setContactForm({...contactForm, interest: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium cursor-pointer"
                    >
                      <option value="general">General Corporate Inquiry</option>
                      <option value="vyom-2u">VYOM-2U Green Propulsion System</option>
                      <option value="ibooster">iBooster Propulsion Suite</option>
                      <option value="thruster-array">Modular Green Thruster (4x1N)</option>
                      <option value="careers">Careers &amp; Engineering Hiring</option>
                      <option value="patents">Origami Deployable Patent Collab</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Your Message / Sizing Requirements *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Please specify payload dimensions, desired total impulse, target launch schedule, or specific skills you are presenting."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full bg-white border border-slate-200 focus:border-teal-600 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="nda-checkbox" required className="accent-teal-500 h-4 w-4" />
                  <label htmlFor="nda-checkbox" className="text-xs text-slate-500 select-none">
                    I authorize the systems engineering team to review this message under mutual NDA protocols.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-6 py-4 rounded-xl transition-all shadow-md shadow-teal-600/10 hover:shadow-teal-600/20 active:scale-[0.98] text-center"
                >
                  Submit Systems Query
                </button>

              </form>

              {/* Animated contact success banner */}
              {contactSubmitted && (
                <div className="bg-teal-900 border border-teal-500/30 rounded-2xl p-6 text-left space-y-3 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-teal-500/20 text-teal-400">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="font-extrabold text-white text-base">Transmission Dispatched Successfully!</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Your query has been assigned to <span className="text-teal-400 font-bold">Kunal Naik</span> and the Systems Engineering desk. We have initialized a secure file container to receive your payload specifications.
                  </p>
                  <div className="text-[10px] font-mono text-teal-400/80">
                    SECURE ID REFERENCE: TX-{Math.floor(100000 + Math.random() * 900000)}
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
