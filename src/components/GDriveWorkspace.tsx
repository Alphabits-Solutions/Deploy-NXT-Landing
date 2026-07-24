import { useState } from "react";
import { Check, Layers, Minimize2, Settings } from "lucide-react";

interface GDriveWorkspaceProps {
  onSave: (logoLink: string, prodImgLinks: Record<string, string>) => void;
}

// Premium floating workspace / Google Drive link converter (bottom left).
// Lets the user preview Google Drive-hosted logo and product images live.
export function GDriveWorkspace({ onSave }: GDriveWorkspaceProps) {
  // Workspace UI drawer toggle
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [tempLogoInput, setTempLogoInput] = useState("");
  const [tempProdInputs, setTempProdInputs] = useState<Record<string, string>>({
    "vyom-2u": "",
    "ibooster": "",
    "thruster-array": ""
  });

  // Sync temp inputs with official state on save
  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(tempLogoInput, { ...tempProdInputs });
    setIsWorkspaceOpen(false);
  };

  // Clear or reset to sample links in helper
  const handleLoadSampleGdrive = () => {
    const sampleLogo = "https://drive.google.com/file/d/1e-bneVl9SSUyppg3YoBOt2ENMZ75ICBp/view?usp=sharing"; // Dummy ID format
    const sampleVyom = "https://drive.google.com/file/d/1e-bneVl9SSUyppg3YoBOt2ENMZ75ICBp/view?usp=sharing";
    setTempLogoInput(sampleLogo);
    setTempProdInputs({
      "vyom-2u": sampleVyom,
      "ibooster": "",
      "thruster-array": ""
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">

      {/* Toggle Button */}
      <button
        onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
        className="bg-slate-900 text-white hover:bg-teal-600 transition-all duration-300 px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2 group font-mono text-xs font-bold cursor-pointer"
      >
        <Settings className={`h-4.5 w-4.5 text-teal-400 ${isWorkspaceOpen ? "rotate-90" : "animate-[spin_6s_infinite_linear]"}`} />
        {isWorkspaceOpen ? "Minimize Google Drive Tool" : "Google Drive Image Link Helper"}
      </button>

      {/* Workspace drawer */}
      {isWorkspaceOpen && (
        <div className="mt-2 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-6 shadow-2xl w-80 md:w-96 text-left space-y-4 max-h-[75vh] overflow-y-auto animate-[fadeIn_0.3s_ease-out] relative text-slate-900">

          <div className="flex justify-between items-start border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-teal-600" />
                G-Drive Workspace
              </h4>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">DIRECT-IMAGE CONVERSION ENGINE</p>
            </div>
            <button
              onClick={() => setIsWorkspaceOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed">
              Google Drive links normally block standard <span className="font-mono bg-slate-100 px-1 py-0.5 rounded">&lt;img&gt;</span> tags.
              Our built-in <span className="font-bold text-teal-700">converter</span> instantly converts share links into live direct download images!
            </p>
            <div className="bg-teal-50 text-teal-800 p-3 rounded-xl text-xs space-y-1 border border-teal-100">
              <div className="font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> How to use:
              </div>
              <p className="leading-normal">
                1. Upload your image/logo to Google Drive.<br />
                2. Set sharing to "Anyone with the link can view".<br />
                3. Paste the share link below to see it live!
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveWorkspace} className="space-y-4">

            {/* Logo Link input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-600">
                TOP-LEFT LOGO DRIVE LINK:
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/file/d/1e-bneVl9SSUyppg3YoBOt2ENMZ75ICBp/view?usp=sharing"
                value={tempLogoInput}
                onChange={(e) => setTempLogoInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Product 1 image input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-600">
                VYOM-2U IMAGE DRIVE LINK:
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/file/d/1e-bneVl9SSUyppg3YoBOt2ENMZ75ICBp/view?usp=sharing"
                value={tempProdInputs["vyom-2u"]}
                onChange={(e) => setTempProdInputs({
                  ...tempProdInputs,
                  "vyom-2u": e.target.value
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Product 2 image input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-600">
                iBOOSTER IMAGE DRIVE LINK:
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/file/d/1e-bneVl9SSUyppg3YoBOt2ENMZ75ICBp/view?usp=sharing"
                value={tempProdInputs["ibooster"]}
                onChange={(e) => setTempProdInputs({
                  ...tempProdInputs,
                  "ibooster": e.target.value
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Product 3 image input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-600">
                THRUSTER ARRAY DRIVE LINK:
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/file/d/.../view"
                value={tempProdInputs["thruster-array"]}
                onChange={(e) => setTempProdInputs({
                  ...tempProdInputs,
                  "thruster-array": e.target.value
                })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleLoadSampleGdrive}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-3 py-2 rounded-lg transition-colors font-mono cursor-pointer"
              >
                Generate Dummy ID
              </button>
              <button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-bold px-3 py-2 rounded-lg transition-colors text-center cursor-pointer"
              >
                Apply &amp; Refresh Live Website
              </button>
            </div>

          </form>

          {/* Help Note */}
          <div className="text-[10px] text-slate-400 leading-normal border-t border-slate-100 pt-3">
            The converter runs live in the React app! You can inspect the function in <span className="font-mono">src/utils/googleDrive.ts</span> to copy its logic for other sites.
          </div>

        </div>
      )}

    </div>
  );
}
