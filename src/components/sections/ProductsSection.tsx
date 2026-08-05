import { useState } from "react";
import { ChevronRight, ArrowUpRight, Cpu } from "lucide-react";
import { SPACE_PRODUCTS } from "../../data/products";
import { ProductImageSlideshow } from "../ProductImageSlideshow";

interface ProductsSectionProps {
  resolvedProdImgs: Record<string, string | null>;
  onProductContact: (productId: string, productName: string) => void;
}

// Manastu Space-inspired products section (Section 2)
export function ProductsSection({
  resolvedProdImgs,
  onProductContact,
}: ProductsSectionProps) {
  // Selected Product details view
  const [selectedProduct, setSelectedProduct] = useState<string | null>(
    "vyom-2u",
  );

  return (
    <section
      id="products"
      className="py-15 bg-white border-b border-slate-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-teal-600 font-bold text-xs font-mono uppercase tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 inline-block mb-2">
            Mission Critical Components
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            ⁠Modular, Deployable &amp; Scalable Space Structures
          </h2>
          <p className="text-slate-600 text-lg">
            ⁠Engineering lightweight, Multifunctional spacecraft structures that
            maximize power, reduce mass, and optimize stowed volume for small
            and micro-class satellites.
          </p>
        </div>

        {/* Interactive Product Showcase Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Product Selection List */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10.5px] font-mono text-meta uppercase tracking-[0.12em] font-medium block mb-2">
              SELECT A PRODUCT TECHNOLOGY
            </span>

            {SPACE_PRODUCTS.map((prod) => {
              const isSelected = selectedProduct === prod.id;
              return (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod.id)}
                  className={`w-full text-left px-5 py-[18px] rounded-[14px] border-[1.5px] border-accent transition-[transform,box-shadow] duration-[220ms] ${
                    isSelected
                      ? "bg-band shadow-[0_14px_34px_-16px_rgba(16,199,160,.7)]"
                      : "bg-card hover:-translate-y-[3px] hover:shadow-[0_16px_30px_-20px_rgba(11,22,34,.4)]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3
                        className={`font-grotesk font-bold text-base ${isSelected ? "text-white" : "text-ink"}`}
                      >
                        {prod.name}
                      </h3>
                      <p
                        className={`text-[12.5px] ${isSelected ? "text-dark-body" : "text-body"}`}
                      >
                        {prod.caption}
                      </p>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 mt-1 transition-transform ${isSelected ? "text-accent rotate-90" : "text-meta"}`}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {prod.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isSelected
                            ? "bg-white/10 text-accent border-transparent"
                            : "bg-white text-body border-hairline"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Product Card */}
          <div className="lg:col-span-7 flex">
            {SPACE_PRODUCTS.map((prod) => {
              if (prod.id !== selectedProduct) return null;

              const customImg = resolvedProdImgs[prod.id];
              const underDevelopment = prod.id === "ibooster";

              return (
                <div
                  key={prod.id}
                  className="w-full h-full flex flex-col bg-card border-[1.5px] border-accent rounded-3xl p-8 space-y-8 animate-[fadeIn_0.4s_ease-out]"
                >
                  {/* Header Details */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {prod.badges.map((b, idx) => (
                        <span
                          key={idx}
                          className="bg-teal-100 text-teal-800 text-xs font-mono font-bold px-3 py-1 rounded-full"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                      {prod.name}
                    </h3>
                    <p className="text-teal-600 text-sm font-semibold tracking-wide italic font-mono">
                      {prod.caption}
                    </p>
                  </div>

                  {/* Image space: auto-advancing, manually scrollable vertical slideshow.
                      Falls back to a Google Drive override or the schematic mock. */}
                  <div className="relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden bg-slate-900 shadow-inner flex items-center justify-center border border-slate-200">
                    <div
                      className={
                        underDevelopment
                          ? "w-full h-full blur-[3px] scale-[1.02] pointer-events-none select-none"
                          : "w-full h-full"
                      }
                    >
                      <ProductImageSlideshow
                        images={prod.images}
                        overrideSrc={customImg}
                        productName={prod.name}
                        fallback={
                          <div className="p-8 w-full h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">
                                  CROSS SECTION MODEL
                                </span>
                                <span className="text-xs font-mono text-emerald-400">
                                  STATUS: VALIDATED
                                </span>
                              </div>
                              <Cpu className="h-6 w-6 text-teal-500 animate-[spin_10s_infinite_linear]" />
                            </div>

                            {/* Beautiful schematic SVG representing space thruster propulsion core */}
                            <div className="flex justify-center my-4">
                              <svg
                                className="w-48 h-24 text-teal-400"
                                viewBox="0 0 200 100"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                {/* Outer housing */}
                                <path
                                  d="M40 30 H160 V70 H40 Z"
                                  strokeDasharray="3 3"
                                />
                                {/* Chamber */}
                                <path
                                  d="M70 40 H110 L130 30 L150 50 L130 70 L110 60 H70 Z"
                                  fill="currentColor"
                                  fillOpacity="0.1"
                                />
                                {/* Injector plates */}
                                <line
                                  x1="70"
                                  y1="40"
                                  x2="70"
                                  y2="60"
                                  strokeWidth="3"
                                />
                                {/* Exhaust plume */}
                                <path
                                  d="M150 50 L180 20 M150 50 L180 80 M150 50 L190 50"
                                  strokeDasharray="2 2"
                                  stroke="emerald"
                                />
                                <circle
                                  cx="110"
                                  cy="50"
                                  r="10"
                                  fill="currentColor"
                                  className="animate-ping text-teal-500/30"
                                />
                              </svg>
                            </div>

                            <div className="flex justify-between items-end text-[10px] font-mono text-slate-500">
                              <span>DeployNXTNXT CAD LABS v4.1</span>
                              <span>SCALE: 1:1.5</span>
                            </div>
                          </div>
                        }
                      />
                    </div>

                    {/* Under-development overlay (FLEX Class) */}
                    {underDevelopment && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-900/60 backdrop-blur-[2px] text-center px-6">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-slate-900 bg-teal-400 rounded-full px-3.5 py-1.5 shadow-lg">
                          Coming Soon
                        </span>
                        <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                          Under Development
                        </span>
                        <span className="text-xs md:text-sm text-slate-300 max-w-xs">
                          This product is currently in development. Details will
                          be available soon.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Detailed Paragraph Description */}
                  {/* <div className="space-y-4">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">SYSTEM OVERVIEW</h4>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {prod.description}
                    </p>
                  </div> */}

                  {/* Bullet Highlights */}
                  {/* <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-mono text-teal-600 uppercase tracking-wider font-bold">KEY INTEGRATION BENEFITS</h4>
                    <ul className="space-y-2">
                      {prod.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                          <Check className="h-4.5 w-4.5 text-teal-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}

                  {/* Tech Specifications Sheets */}
                  {/* <div className="space-y-4">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">DETAILED SPECIFICATIONS</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(prod.specs).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between border-b border-slate-200/60 pb-2 text-xs">
                          <span className="text-slate-500 font-medium">{key}</span>
                          <span className="text-slate-800 font-mono font-bold text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  {/* Contact Us CTA (Autofills and scrolls to Contact Form) */}
                  <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
                    <div className="text-xs text-slate-500">
                      Need tailored datasheets or custom payload simulations?
                    </div>
                    <button
                      onClick={() => onProductContact(prod.id, prod.name)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-teal-600/10 flex items-center gap-1.5 hover:scale-[1.02]"
                    >
                      Contact us for more
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
