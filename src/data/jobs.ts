import type { JobPosition } from "../types";

// Careers (easily editable by the user)
export const SAMPLE_JOBS: JobPosition[] = [
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
