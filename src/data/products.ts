import type { SpaceProduct } from "../types";

// Products (inspired by Manastu Space, Teal branding)
export const SPACE_PRODUCTS: SpaceProduct[] = [
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
  },
  {
    id: "custom-engineering",
    name: "Custom Engineering Available",
    caption: "Tailored deployable structures for your mission constraints.",
    description: "Have unique thrust, tank volume, or structural payload constraints? Our engineering team designs custom deployable structures, fuel manifolds, and micro-thruster groupings built around your mission profile — from first concept sketches through qualification and flight delivery.",
    badges: ["Bespoke Design", "Mission-Specific", "End-to-End Support", "Any Sat Class"],
    specs: {
      "Engagement Model": "Concept-to-flight partnership",
      "Design Cycle": "8-16 weeks (typical)",
      "Deliverables": "CAD, FEA reports, EM & FM units",
      "Compatibility": "CubeSat to 500kg class buses",
      "Support": "Dedicated engineering liaison"
    },
    details: [
      "Requirements workshop to translate mission constraints into structural specifications.",
      "Rapid prototyping with iterative design reviews at every milestone.",
      "Full qualification campaign support including vibration and thermal-vacuum testing."
    ]
  }
];

// Product ids used for the Google Drive image override workspace.
export const PRODUCT_IDS = SPACE_PRODUCTS.map((p) => p.id);
