import type { JobPosition } from "../types";

// Careers (easily editable by the user)
export const SAMPLE_JOBS: JobPosition[] = [
  {
    id: "structures-mechanism-eng",
    title: "Senior Structures and Mechanism Engineer",
    department: "Mechanical-Systems Engineering",
    location: "Bengaluru, India (On-Site)",
    type: "Full-Time",
    experience: "4+ Years",
    description: "We are seeking for a talent to lead the design, analysis, prototyping, and qualification of deployable spacecraft systems. You will develop lightweight structures, precision deployment mechanisms, and flight-ready hardware for next-generation satellite platforms while working closely with manufacturing, testing, and systems engineering teams.",
    responsibilities: [
      "Lead the design of deployable spacecraft structures, mechanisms, and flight hardware.",
      "Perform structural, static, modal, and vibration analyses using FEA tools.",
      "Design lightweight CFRP, aluminum, and precision mechanical assemblies for space applications.",
      "Develop hinges, latches, HDRMs, deployment systems, and structural interfaces.",
      "Support prototype fabrication, assembly, integration, environmental testing, and qualification.",
      "Participate in PDR/CDR reviews, root-cause investigations, and design improvements."
    ],
    requirements: [
      "Bachelor's/Master's degree/PhD in Mechanical, Aerospace Engineering or equivalent.",
      "4+ years of experience designing Flight Hardware, Aerospace or Precision mechanical systems.",
      "Proficiency in either of SolidWorks, Siemens NX, ANSYS, Abaqus, Nastran, or equivalent CAD/structural analysis software.",
      "Strong understanding of composites, lightweight structures, mechanisms, and manufacturing.",
      "Familiarity with ECSS, NASA, or ISRO spacecraft design and qualification practices.",
      "Strong analytical, communication, and collaboration skills with a proactive approach and eagerness to learn."
    ]
  },
  {
    id: "gnc-specialist",
    title: "Aerospace Engineer",
    department: "Structures",
    location: "Bengaluru, India (On-site)",
    type: "Full-Time",
    experience: "1-2 Years",
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
