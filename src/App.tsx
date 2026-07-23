import React, { useState, useEffect } from "react";
import { 
  Home as HomeIcon, 
  Rocket, 
  Users, 
  Briefcase, 
  Mail, 
  MessageSquare, 
  ChevronRight, 
  Check, 
  Info, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Settings, 
  Minimize2, 
  MapPin,
  Clock,
  Send,
  Layers
} from "lucide-react";
import { convertGoogleDriveLink } from "./utils/googleDrive";

// --- CUSTOMIZABLE DATA SECTION ---

// 1. Careers (easily editable by the user)
interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const SAMPLE_JOBS: JobPosition[] = [
  {
    id: "propulsion-eng",
    title: "Senior Spacecraft Mechanical Engineer",
    department: "Mechanical Systems Engineering",
    location: "Bengaluru, India (On-Site)",
    type: "Full-Time",
    experience: "2+ Years",
    salary: "Competitive Space-Industry Standards",
    description: "We are seeking a visionary Propulsion Engineer to lead the design, thermal analysis, and hot-fire validation of our next-generation MS289 green thrusters. You will work directly with ISRO validation standards and help space-test systems that power commercial mega-constellations.",
    responsibilities: [
      "Lead hot-fire testing operations, propellant feed system calibration, and GNC integration.",
      "Conduct CFD and thermal analysis on green propellant thrusters operating up to 1300°C.",
      "Collaborate with manufacturing teams on additive manufacturing (3D metal printing) of thrust chambers.",
      "Draft and review technical qualification documents for launch vehicle integrations."
    ],
    requirements: [
      "Master's or PhD in Aerospace, Mechanical Engineering, or related deep-tech disciplines.",
      "Deep understanding of liquid propulsion, fluid mechanics, and non-toxic propellants.",
      "Hands-on experience with CAD/FEA tools (ANSYS Fluent, Siemens NX, Matlab).",
      "Prior exposure to spacecraft launch integrations or ISRO qualification protocols is highly desired."
    ]
  },
  {
    id: "gnc-specialist",
    title: "Aerospace Engineer",
    department: "Structures",
    location: "Bengaluru, India (On-site)",
    type: "Full-Time",
    experience: "1-2 Years",
    salary: "Industry Competitive + Equity Options",
    description: "Join the core team responsible for the sub-millisecond precision steering of our satellites. You will build and test GNC algorithms, simulate orbital maneuver telemetries, and design automated collision avoidance paths using our 4x1N thruster clusters.",
    responsibilities: [
      "Develop high-fidelity 6-DOF orbital simulation environments for modular thruster arrays.",
      "Design and implement GNC algorithms for orbital raising, station-keeping, and active debris avoidance.",
      "Integrate and test attitude hardware sensors (star trackers, IMUs, reaction wheels) with propulsion flight software.",
      "Analyze post-flight telemetry from active orbital missions to refine state-estimation algorithms."
    ],
    requirements: [
      "Bachelor's/Master's in Aerospace Engineering, Robotics, or Control Systems.",
      "Strong proficiency in C/C++ and MATLAB/Simulink for real-time flight control environments.",
      "Experience with Kalman Filtering, spacecraft dynamics, and attitude determination.",
      "Familiarity with ROS or flight computer architectures is a big plus."
    ]
  },
  {
    id: "structural-analyst",
    title: "Founder's Office Associate",
    department: "Mechanical Systems Engineering",
    location: "Bengaluru, India (On-site)",
    type: "Full-Time",
    experience: "1-2 Years",
    salary: "Standard + Performance Bonuses",
    description: "We are looking for a structural analyst who will ensure that our origami-inspired deployable solar arrays and modular propulsion systems withstand extreme launch loads and harsh thermal cycling in deep space.",
    responsibilities: [
      "Perform high-fidelity structural (static, modal, random vibration) and thermal analysis using FEM tools.",
      "Optimize deployable structures for light-weighting, focusing on high-strength carbon composites and thin-film metals.",
      "Define and oversee mechanical testing plans including sine/vibration sweeps and thermal vacuum (TVAC) chambers.",
      "Document safety factor metrics for launch provider reviews (SpaceX, ISRO, Rocket Lab)."
    ],
    requirements: [
      "Bachelor's degree in Mechanical, Civil, or Structural Engineering.",
      "2+ years of professional experience in structural/thermal finite element analysis (FEA).",
      "Expertise with tools like Abaqus, Nastran, or ANSYS.",
      "Passion for deployable mechanisms, space physics, and origami mathematics."
    ]
  }
];

// 2. Team Members (exactly like DeployNXT, Teal themed)
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  experience: string[];
  linkedinUrl: string;
  initials: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Kunal Naik",
    role: "Co-Founder",
    bio: "Former Spacecraft Mechanical Engineer with 6+ years of specialized experience in the space industry. Master of Science in Space Studies from the prestigious International Space University (Luxembourg/France). Highly active in advanced structural concepts and origami-based deployable architectures.",
    experience: [
      "Spacecraft Mechanical Engineer, Axelspace Corporation (Tokyo, Japan)",
      "Spacecraft Engineer, Maana Electric (Dubai, Luxembourg)",
      "Mechanical and Deployable Structures Engineer, Adamant Composites Ltd. (Greece)"
    ],
    linkedinUrl: "https://in.linkedin.com/in/kunalnaik0013",
    initials: "KN"
  },
  {
    name: "Rama Theertha Kasi",
    role: "Co-Founder",
    bio: "An electronics and communications engineer-turned former strategy consultant for space, aerospace, defence, and telecom clients across India and Europe.",
    experience: [
      "VP, Strategy and International Affairs (Part-time), OrbitAid",
      "Co-Founder and Consultant, Access Hub",
      "Spectrum Engineer, River Advisers (Previously ManSat)",
      "Interim Communication Sub-system Lead for Mars Robotic Mission, NASA Ames Research Center"
    ],
    linkedinUrl: "https://www.linkedin.com/in/rama-theertha-kasi", // Fallback link
    initials: "RK"
  },
  // {
  //   name: "Dr. Helena Vance",
  //   role: "GNC Systems Lead",
  //   bio: "PhD in Astronautical Engineering from MIT. Former Flight Dynamics Engineer at NASA's Jet Propulsion Laboratory (JPL). Specializes in autonomous deep-space maneuvering and high-precision spacecraft steering arrays.",
  //   experience: [
  //     "Senior GNC Analyst at NASA Jet Propulsion Laboratory (JPL)",
  //     "Author of 12+ Peer-reviewed Publications on Micro-thruster Guidance",
  //     "Postdoctoral Fellow in Space Physics at Stanford University"
  //   ],
  //   linkedinUrl: "https://in.linkedin.com/in/kunalnaik0013",
  //   initials: "HV"
  // },
  // {
  //   name: "Saurabh Joshi",
  //   role: "Lead Avionics & Embedded Software",
  //   bio: "8+ years developing highly reliable flight software and embedded controllers. Former systems integrator for ISRO rocket stages. Expert in sub-millisecond thruster command loops and fail-safe system architectures.",
  //   experience: [
  //     "Avionics Consultant for ISRO PSLV Auxiliary Payloads",
  //     "Embedded Systems Expert with Real-Time Operating Systems (RTOS)",
  //     "Technical Lead for High-Performance Spacecraft Telemetry"
  //   ],
  //   linkedinUrl: "https://in.linkedin.com/in/kunalnaik0013",
  //   initials: "SJ"
  // }
];

// 3. Products (inspired by Manastu Space, Teal branding)
interface SpaceProduct {
  id: string;
  name: string;
  caption: string;
  description: string;
  badges: string[];
  specs: Record<string, string>;
  details: string[];
}

const SPACE_PRODUCTS: SpaceProduct[] = [
  {
    id: "vyom-2u",
    name: "FOLD class Deployable Solar Panels",
    caption: "Sustainable plug-and-play agile orbit maneuvers.",
    description: "A modular, non-toxic space-tested satellite propulsion system designed for small satellites up to 100 kg. Delivering unmatched Δv for orbit raising, station-keeping, collision avoidance, and responsible end-of-life de-orbiting. Replaces toxic, carcinogenic hydrazine with proprietary eco-friendly MS289 propellant.",
    badges: ["Modular/Adaptable", "TRL-8 Verified", "Zero Toxicity", "100kg Class"],
    specs: {
      "Propellant Blend": "MS289 (Hazard index: Salt)",
      "Average Thrust": "1.0 N",
      "Specific Impulse (Isp)": "285 seconds",
      "Integration Complexity": "Zero (Plug-and-play CAN-bus)",
      "Wet Mass": "3.2 kg"
    },
    details: [
      "In-orbit demonstrated on ISRO's POEM-4 platform.",
      "Modular block design allows customizable propellant tanks to easily size up or down.",
      "Completely eliminates toxic propellant safety gear, saving up to $150k in launch campaign prep."
    ]
  },
  {
    id: "ibooster",
    name: "FLEX class Deployable Solar Panels",
    caption: "High-impulse, modular propulsion for medium satellites.",
    description: "An advanced green propulsion suite built for satellites in the 100–500 kg class. Specially engineered in a modular format to support both commercial mega-constellations and strategic defense missions. Highly reliable, customizable tank sizing, and ultra-fast deployment.",
    badges: ["Heavy Duty", "Customizable Tanks", "DRDO Partner Tech", "100-500kg Class"],
    specs: {
      "Propellant Type": "MS289 Green Propellant",
      "Configuration": "4x1N Thruster Array",
      "Specific Impulse": "290 seconds",
      "Total Impulse": "150,000 Ns",
      "Operating Temperature": "Up to 1350°C"
    },
    details: [
      "Engineered for deep-space trajectory adjustments and strategic orbital maneuvers.",
      "Includes redundant flow-control valves and ultra-fast response heater arrays.",
      "Successfully integrated and validated for defense research agency requirements."
    ]
  },
  {
    id: "thruster-array",
    name: "Body-Mounted Solar Panels",
    caption: "Multi-directional precision attitude control.",
    description: "An adaptable cluster of four 1-Newton green thrusters integrated into a singular mechanical structure. This setup provides active, instantaneous roll, pitch, and yaw maneuvering, perfect for extreme target pointing and agile attitude operations.",
    badges: ["4x1N Array", "Agile Maneuvering", "Plug & Play", "Sub-millisecond Precision"],
    specs: {
      "Thrusters Included": "4 x 1-Newton Thrusters",
      "Response Time": "< 5 milliseconds",
      "Dry Mass": "850 grams",
      "Operating Temp Range": "-40°C to 125°C",
      "Power Draw": "12W (Peak firing)"
    },
    details: [
      "High frequency pulsing allows sub-millimeter level positioning on orbits.",
      "Integrated mechanical manifold prevents thermal transfer to the satellite bus.",
      "Fully compatible with both MS289 and standard green propulsion propellant derivatives."
    ]
  }
];

// 4. News / Blog Articles
interface BlogArticle {
  title: string;
  category: string;
  date: string;
  readTime: string;
  snippet: string;
}

const BLOG_ARTICLES: BlogArticle[] = [
  {
    title: "VYOM-2U Achieves TRL-8 After Validation on ISRO's POEM-4 Platform",
    category: "Mission Success",
    date: "June 2026",
    readTime: "4 min read",
    snippet: "Our flagship green propulsion system successfully fired in orbit, validating the MS289 non-toxic propellant chemistry and sub-millisecond telemetry control under active space environments."
  },
  {
    title: "DeployNXT Partners with Patomic Labs to File Three New Patents for Origami Deployables",
    category: "IP & Innovation",
    date: "April 2026",
    readTime: "3 min read",
    snippet: "By blending origami fold math with carbon fiber structural layers, we have locked down key patents that will reduce spacecraft solar array storage volume by a massive 75%."
  },
  {
    title: "Why MS289 Green Fuel is Changing the Regulatory Landscape of Commercial Spaceflight",
    category: "Sustainability",
    date: "January 2026",
    readTime: "6 min read",
    snippet: "With the international phase-out of carcinogenic hydrazine, our table-salt-safe propellant blend offers standard satellite manufacturers an immediate, drop-in replacement."
  }
];

export default function App() {
  // --- STATE STORES ---
  const [activeSection, setActiveSection] = useState("home");
  
  // Custom Google Drive asset links (State driven, allowing users to test live!)
  const [logoLink, setLogoLink] = useState(""); // User can enter any Google Drive link
  const [prodImgLinks, setProdImgLinks] = useState<Record<string, string>>({
    "vyom-2u": "",
    "ibooster": "",
    "thruster-array": ""
  });
  
  // Workspace UI drawer toggle
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [tempLogoInput, setTempLogoInput] = useState("");
  const [tempProdInputs, setTempProdInputs] = useState<Record<string, string>>({
    "vyom-2u": "",
    "ibooster": "",
    "thruster-array": ""
  });

  // Selected Product details view
  const [selectedProduct, setSelectedProduct] = useState<string | null>("vyom-2u");
  
  // Expanded Job position details view
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  
  // Careers apply modal state
  const [applyJob, setApplyJob] = useState<JobPosition | null>(null);
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "mid",
    portfolio: "",
    coverLetter: ""
  });
  const [applySubmitted, setApplySubmitted] = useState(false);

  // General Contact Form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    org: "",
    interest: "general", // vyom-2u, ibooster, thruster-array, careers, general
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  // Scroll to helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
    }
  };

  // Tracking Active section on scroll
  useEffect(() => {
    const sections = ["home", "products", "team", "careers", "blog", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync temp inputs with official state on startup/save
  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    setLogoLink(tempLogoInput);
    setProdImgLinks({ ...tempProdInputs });
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

  // Auto-set contact product when clicked "Contact us for more"
  const handleProductContact = (productId: string, productName: string) => {
    setContactForm(prev => ({
      ...prev,
      interest: productId,
      message: `Hi team, I would like to request detailed technical documentation and a commercial quote for the ${productName}. Please get back to us.`
    }));
    scrollToSection("contact");
  };

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

  // Handle general contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({
        name: "",
        email: "",
        org: "",
        interest: "general",
        message: ""
      });
    }, 6000);
  };

  // Handle job apply submit
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    setTimeout(() => {
      setApplySubmitted(false);
      setApplyJob(null);
      setApplyForm({
        name: "",
        email: "",
        phone: "",
        experience: "mid",
        portfolio: "",
        coverLetter: ""
      });
    }, 4000);
  };

  // Generate resolved image urls (converting Google Drive links if provided)
  const resolvedLogo = logoLink ? convertGoogleDriveLink(logoLink) : null;
  const resolvedProdImgs: Record<string, string | null> = {
    "vyom-2u": prodImgLinks["vyom-2u"] ? convertGoogleDriveLink(prodImgLinks["vyom-2u"]) : null,
    "ibooster": prodImgLinks["ibooster"] ? convertGoogleDriveLink(prodImgLinks["ibooster"]) : null,
    "thruster-array": prodImgLinks["thruster-array"] ? convertGoogleDriveLink(prodImgLinks["thruster-array"]) : null
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white relative">
      
      {/* --- FLOATING RIGHT NAVIGATION SIDEBAR DOCK --- */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl rounded-full p-2 flex flex-col gap-2 items-center">
          
          {/* Home Icon */}
          <button 
            onClick={() => scrollToSection("home")}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === "home" 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110" 
                : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
            }`}
            title="Home"
          >
            <HomeIcon className="h-5 w-5" />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              Home
            </span>
          </button>

          {/* Products Icon */}
          <button 
            onClick={() => scrollToSection("products")}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === "products" 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110" 
                : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
            }`}
            title="Products"
          >
            <Rocket className="h-5 w-5" />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              Products
            </span>
          </button>

          {/* Team Icon */}
          <button 
            onClick={() => scrollToSection("team")}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === "team" 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110" 
                : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
            }`}
            title="Team"
          >
            <Users className="h-5 w-5" />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              Team
            </span>
          </button>

          {/* Careers Icon */}
          <button 
            onClick={() => scrollToSection("careers")}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === "careers" 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110" 
                : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
            }`}
            title="Careers"
          >
            <Briefcase className="h-5 w-5" />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              Careers
            </span>
          </button>

          {/* Blog/Newsletter Icon */}
          <button 
            onClick={() => scrollToSection("blog")}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === "blog" 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110" 
                : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
            }`}
            title="Blog/Newsletter"
          >
            <Mail className="h-5 w-5" />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              Blog / Newsletter
            </span>
          </button>

          {/* Contact Us Icon */}
          <button 
            onClick={() => scrollToSection("contact")}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === "contact" 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-110" 
                : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
            }`}
            title="Contact Us"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              Contact Us
            </span>
          </button>

        </div>
      </div>

      {/* --- GLASSY HEADER / NAVIGATION BAR --- */}
      <header className="sticky top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo element with Google Drive custom override */}
          <button 
            onClick={() => scrollToSection("home")} 
            className="flex items-center gap-3 group transition-transform hover:scale-[1.02]"
          >
            {resolvedLogo ? (
              <img 
                src={resolvedLogo} 
                alt="Custom Logo" 
                className="h-10 w-auto object-contain rounded-md shadow-sm border border-teal-50"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const sib = e.currentTarget.nextElementSibling;
                  if (sib) sib.removeAttribute("style");
                }}
              />
            ) : null}
            
            {/* Elegant SVG space structure logo as default/fallback */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white shadow-md shadow-teal-500/20" style={resolvedLogo ? {display: "none"} : {}}>
              <svg className="h-6 w-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.108-7.843-.258" />
              </svg>
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-semibold tracking-tight text-xl text-slate-900 group-hover:text-teal-600 transition-colors font-mono">
                DeployNXT
              </span>
              <span className="text-[9px] font-mono tracking-widest text-teal-600 font-bold uppercase leading-none">
                DEPLOYABLE SPACE INFRASTRUCTURE
              </span>
            </div>
          </button>

          {/* Standard Top Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("home")} className={`font-medium text-sm transition-colors hover:text-teal-600 ${activeSection === "home" ? "text-teal-600" : "text-slate-600"}`}>Home</button>
            <button onClick={() => scrollToSection("products")} className={`font-medium text-sm transition-colors hover:text-teal-600 ${activeSection === "products" ? "text-teal-600" : "text-slate-600"}`}>Products</button>
            <button onClick={() => scrollToSection("team")} className={`font-medium text-sm transition-colors hover:text-teal-600 ${activeSection === "team" ? "text-teal-600" : "text-slate-600"}`}>Team</button>
            <button onClick={() => scrollToSection("careers")} className={`font-medium text-sm transition-colors hover:text-teal-600 ${activeSection === "careers" ? "text-teal-600" : "text-slate-600"}`}>Careers</button>
            <button onClick={() => scrollToSection("blog")} className={`font-medium text-sm transition-colors hover:text-teal-600 ${activeSection === "blog" ? "text-teal-600" : "text-slate-600"}`}>Blog</button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/10 hover:shadow-teal-600/20 active:scale-[0.98]"
            >
              Contact Us
            </button>
          </nav>

        </div>
      </header>

      {/* --- ASTRADYNE HERO SECTION (SECTION 1) --- */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Background Image: Solar panels in space with Earth background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/solar_space.jpg" 
            alt="Solar Arrays in Deep Space with Earth Background" 
            className="w-full h-full object-cover opacity-100 mix-blend-screen scale-105 animate-[pulse_12s_infinite]"
          />
          {/* Dark futuristic overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent z-10" />
        </div>

        {/* Content Box */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text panel */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 text-teal-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="h-3 w-3 animate-spin" /> Miniaturizing mission-critical components
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Origami-Inspired <br />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                Deployable Structures
              </span> <br />
               for Space & Terrestrial Infrastructure
            </h1>

            <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
              Engineering ultra-lightweight, flexible solar arrays and other deployable structures. Reimagining satellite mobility and power density where mission performance cannot fail.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollToSection("products")}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] flex items-center gap-2 active:scale-98"
              >
                Explore Products
                <Rocket className="h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:border-teal-400/50 flex items-center gap-2"
              >
                Inquire Directly
                <ChevronRight className="h-5 w-5 text-teal-400" />
              </button>
            </div>

          </div>

          {/* Telemetry Stats Overlay Panel (Astradyne style) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono tracking-wider text-slate-400 font-bold uppercase">LIVE STATUS TELEMETRY</span>
                </div>
                <span className="text-xs font-mono text-teal-400">TRL-4 </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Solar Array Fold Ratio</div>
                  <div className="text-2xl font-bold text-teal-400 font-mono mt-1">15 : 1</div>
                  <div className="text-[10px] text-emerald-400/90 font-mono mt-1">▲ Industry Record</div>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Specific Power</div>
                  <div className="text-2xl font-bold text-teal-400 font-mono mt-1">150 W/kg</div>
                  <div className="text-[10px] text-emerald-400/90 font-mono mt-1">● 70% Lighter weight</div>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Planned Deployment Reliability</div>
                  <div className="text-2xl font-bold text-teal-400 font-mono mt-1">99.998%</div>
                  <div className="text-[10px] text-emerald-400/90 font-mono mt-1">● Fully Redundant Springs</div>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Launch</div>
                  <div className="text-2xl font-bold text-teal-400 font-mono mt-1">Q1/Q2 2027</div>
                  <div className="text-[10px] text-emerald-400/90 font-mono mt-1">▲ Tech Demo Mission</div>
                </div>

              </div>

              {/* Mini visual representation of deployable solar ribs */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Origami Rib Deployment Sequence</span>
                  <span className="text-[10px] font-mono text-emerald-400">100% DEPLOYED</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full w-[100%] rounded-full animate-[shimmer_2s_infinite_linear]" />
                </div>
                <div className="grid grid-cols-4 text-center text-[8px] font-mono text-slate-500">
                  <span>STOWED</span>
                  <span>RELEASE</span>
                  <span>EXPANDING</span>
                  <span className="text-teal-400 font-bold">LOCKED</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => scrollToSection("products")}>
          <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">Scroll to Explore</span>
          <div className="w-5 h-8 border-2 border-slate-600 rounded-full p-1">
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce mx-auto" />
          </div>
        </div>

      </section>

      {/* --- MANASTU SPACE PRODUCTS SECTION (SECTION 2) --- */}
      <section id="products" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-teal-600 font-bold text-xs font-mono uppercase tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
              DEPLOYABLE SOLAR PANELS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Sustainable, Modular &amp; Agile Space Structures
            </h2>
            <p className="text-slate-600 text-lg">
              Replacing heavy, bulky, traditional components with light-weight, deployable structures designed for smallsat and micro-class satellites.
            </p>
          </div>

          {/* Interactive Product Showcase Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Product Selection List */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold block mb-2">SELECT A PRODUCT TECHNOLOGY</span>
              
              {SPACE_PRODUCTS.map((prod) => {
                const isSelected = selectedProduct === prod.id;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.id)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                      isSelected 
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl translate-x-2" 
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg">{prod.name}</h3>
                        <p className={`text-xs ${isSelected ? "text-teal-300" : "text-teal-600 font-medium"}`}>
                          {prod.caption}
                        </p>
                      </div>
                      <ChevronRight className={`h-5 w-5 mt-1 transition-transform ${isSelected ? "text-teal-400 rotate-90" : "text-slate-400"}`} />
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {prod.badges.map((badge, idx) => (
                        <span 
                          key={idx} 
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            isSelected 
                              ? "bg-slate-800 text-teal-300" 
                              : "bg-white text-slate-600 border border-slate-200"
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}

              <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl space-y-2 mt-6">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                  <Info className="h-4 w-4 shrink-0 text-teal-600" />
                  <span>Custom Engineering Available</span>
                </div>
                <p className="text-xs text-teal-700 leading-relaxed">
                  Have unique thrust, tank volume, or structural payload constraints? Our engineering team designs custom fuel manifolds and micro-thruster groupings.
                </p>
              </div>
            </div>

            {/* Right Column: Detailed Product Card */}
            <div className="lg:col-span-7">
              {SPACE_PRODUCTS.map((prod) => {
                if (prod.id !== selectedProduct) return null;

                const customImg = resolvedProdImgs[prod.id];

                return (
                  <div 
                    key={prod.id} 
                    className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-8 animate-[fadeIn_0.4s_ease-out]"
                  >
                    
                    {/* Header Details */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {prod.badges.map((b, idx) => (
                          <span key={idx} className="bg-teal-100 text-teal-800 text-xs font-mono font-bold px-3 py-1 rounded-full">
                            {b}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">{prod.name}</h3>
                      <p className="text-teal-600 text-sm font-semibold tracking-wide italic font-mono">
                        {prod.caption}
                      </p>
                    </div>

                    {/* Image space (Support for Google Drive Direct Link, else fallback mock) */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner flex items-center justify-center border border-slate-200">
                      {customImg ? (
                        <img 
                          src={customImg} 
                          alt={prod.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.removeAttribute("style");
                          }}
                        />
                      ) : null}

                      {/* Mock schematic / visual fallback if no drive link is configured */}
                      <div 
                        className="p-8 w-full h-full flex flex-col justify-between" 
                        style={customImg ? {display: "none"} : {}}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">CROSS SECTION MODEL</span>
                            <span className="text-xs font-mono text-emerald-400">STATUS: VALIDATED</span>
                          </div>
                          <Cpu className="h-6 w-6 text-teal-500 animate-[spin_10s_infinite_linear]" />
                        </div>

                        {/* Beautiful schematic SVG representing space thruster propulsion core */}
                        <div className="flex justify-center my-4">
                          <svg className="w-48 h-24 text-teal-400" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                            {/* Outer housing */}
                            <path d="M40 30 H160 V70 H40 Z" strokeDasharray="3 3" />
                            {/* Chamber */}
                            <path d="M70 40 H110 L130 30 L150 50 L130 70 L110 60 H70 Z" fill="currentColor" fillOpacity="0.1" />
                            {/* Injector plates */}
                            <line x1="70" y1="40" x2="70" y2="60" strokeWidth="3" />
                            {/* Exhaust plume */}
                            <path d="M150 50 L180 20 M150 50 L180 80 M150 50 L190 50" strokeDasharray="2 2" stroke="emerald" />
                            <circle cx="110" cy="50" r="10" fill="currentColor" className="animate-ping text-teal-500/30" />
                          </svg>
                        </div>

                        <div className="flex justify-between items-end text-[10px] font-mono text-slate-500">
                          <span>DeployNXTNXT CAD LABS v4.1</span>
                          <span>SCALE: 1:1.5</span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Paragraph Description */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">SYSTEM OVERVIEW</h4>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100">
                      <h4 className="text-xs font-mono text-teal-600 uppercase tracking-wider font-bold">KEY INTEGRATION BENEFITS</h4>
                      <ul className="space-y-2">
                        {prod.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                            <Check className="h-4.5 w-4.5 text-teal-500 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Specifications Sheets */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">DETAILED SPECIFICATIONS</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(prod.specs).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between border-b border-slate-200/60 pb-2 text-xs">
                            <span className="text-slate-500 font-medium">{key}</span>
                            <span className="text-slate-800 font-mono font-bold text-right">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Us CTA (Autofills and scrolls to Contact Form) */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
                      <div className="text-xs text-slate-500">
                        Need tailored datasheets or custom payload simulations?
                      </div>
                      <button 
                        onClick={() => handleProductContact(prod.id, prod.name)}
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

      {/* --- DEPLOYNXT TEAM SECTION (SECTION 3) --- */}
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
                    <div className="space-y-3 pt-2 text-left">
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
                    </div>

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
              onClick={() => scrollToSection("contact")}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0"
            >
              Collaborate With Us
            </button>
          </div>

        </div>
      </section>

      {/* --- CAREERS SECTION (SECTION 4) --- */}
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
              onClick={() => {
                setContactForm(prev => ({
                  ...prev,
                  interest: "careers",
                  message: "Hi, I am interested in open applications at DeployNXT. My specialty is [Describe Specialty]."
                }));
                scrollToSection("contact");
              }} 
              className="text-teal-600 hover:text-teal-700 font-bold ml-1 hover:underline"
            >
              Send an open speculative pitch.
            </button>
          </div>

        </div>
      </section>

      {/* --- BLOG / NEWS & NEWSLETTER SECTION (SECTION 5) --- */}
      <section id="blog" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-teal-600 font-mono font-bold text-xs tracking-widest bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 uppercase">
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

      {/* --- CONTACT FORM SECTION (SECTION 6) --- */}
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

      {/* --- PREMIUM FLOATING WORKSPACE / GOOGLE DRIVE LINK CONVERTER (BOTTOM LEFT) --- */}
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

      {/* --- CAREER APPLICATION MODAL --- */}
      {applyJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-200 text-left space-y-6 relative max-h-[90vh] overflow-y-auto text-slate-900">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-teal-600 uppercase tracking-wider font-bold">
                  SECURE CAREER PORTAL
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Apply: {applyJob.title}</h3>
                <p className="text-xs text-slate-500 font-mono">Location: {applyJob.location}</p>
              </div>
              <button 
                onClick={() => setApplyJob(null)}
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
                  placeholder="e.g. Kunal Naik"
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
                    placeholder="e.g. k.naik@gmail.com"
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
                    placeholder="e.g. +91 96387 50700"
                    value={applyForm.phone}
                    onChange={(e) => setApplyForm({...applyForm, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Total Relevant Experience *</label>
                <select 
                  value={applyForm.experience}
                  onChange={(e) => setApplyForm({...applyForm, experience: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium cursor-pointer"
                >
                  <option value="junior">Entry level (0 - 2 Years)</option>
                  <option value="mid">Mid level (2 - 5 Years)</option>
                  <option value="senior">Senior level (5 - 8 Years)</option>
                  <option value="director">Principal / Director (8+ Years)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Resume / LinkedIn / Portfolio Link *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://linkedin.com/in/..."
                  value={applyForm.portfolio}
                  onChange={(e) => setApplyForm({...applyForm, portfolio: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium"
                />
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
                  onClick={() => setApplyJob(null)}
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
                  Hi {applyForm.name}, your application for the <strong>{applyJob.title}</strong> has been logged. Our recruitment desk will review your links and follow up with orbital tests.
                </p>
                <button 
                  onClick={() => {
                    setApplySubmitted(false);
                    setApplyJob(null);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- PREMIUM COMPREHENSIVE FOOTER --- */}
      <footer className="bg-slate-950 text-white pt-20 pb-12 relative overflow-hidden">
        
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Logo and brief brand text */}
            <div className="md:col-span-5 space-y-6 text-left">
              <button 
                onClick={() => scrollToSection("home")}
                className="flex items-center gap-3 text-left cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white shadow-md">
                  <svg className="h-6 w-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.108-7.843-.258" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold tracking-tight text-xl text-white font-mono">DeployNXT</span>
                  <span className="text-[9px] font-mono tracking-widest text-teal-400 font-bold uppercase">DEPLOYABLE SPACE SYSTEMS</span>
                </div>
              </button>

              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Engineering origami-based, high-strength deployable structures and zero-toxicity micro-propulsion architectures. Setting the benchmark for mission-critical orbit control.
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-teal-400" />
                  Space Tested POEM-4
                </span>
                <span>•</span>
                <span>TRL-8 Certified</span>
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h5 className="font-mono text-xs text-teal-400 uppercase tracking-widest font-bold">NAVIGATION</h5>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                <button onClick={() => scrollToSection("home")} className="hover:text-white transition-colors text-left py-1 cursor-pointer">Home</button>
                <button onClick={() => scrollToSection("products")} className="hover:text-white transition-colors text-left py-1 cursor-pointer">Products</button>
                <button onClick={() => scrollToSection("team")} className="hover:text-white transition-colors text-left py-1 cursor-pointer">Team</button>
                <button onClick={() => scrollToSection("careers")} className="hover:text-white transition-colors text-left py-1 cursor-pointer">Careers</button>
                <button onClick={() => scrollToSection("blog")} className="hover:text-white transition-colors text-left py-1 cursor-pointer">Blog</button>
                <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors text-left py-1 cursor-pointer">Contact</button>
              </div>
            </div>

            {/* Support / Partners */}
            <div className="md:col-span-4 space-y-4 text-left">
              <h5 className="font-mono text-xs text-teal-400 uppercase tracking-widest font-bold">ECOSYSTEM COLLABORATIONS</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                We work in direct integration with key governmental defense partners, satellite bus suppliers, and spaceflight talent networks including:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-3 py-1 rounded">DeployNXT Platform</span>
                <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-3 py-1 rounded">ISRO POEM-4</span>
                <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-3 py-1 rounded">Patomic Labs</span>
              </div>
            </div>

          </div>

          {/* Bottom copyright section */}
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
            <div>
              &copy; {new Date().getFullYear()} DeployNXT Private Limited. All Rights Reserved.
            </div>
            
            <div className="flex flex-wrap gap-6">
              <span className="hover:text-slate-300 cursor-pointer">Security Compliance</span>
              <span className="hover:text-slate-300 cursor-pointer">Bilateral NDA Terms</span>
              <span className="hover:text-slate-300 cursor-pointer">ITAR/EAR Controls</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
