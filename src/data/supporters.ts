// Supporter / partner logos shown in the marquee strip.
// To swap in a real logo, overwrite the SVG file in public/images/supporters/
// (or change the src here to point at any image file).
export interface Supporter {
  name: string;
  src: string;
}

export const SUPPORTERS: Supporter[] = [
  { name: "NASA", src: "/images/supporters/supporter-1.svg" },
  { name: "Qualcomm", src: "/images/supporters/supporter-2.svg" },
  { name: "SpaceX", src: "/images/supporters/supporter-3.svg" },
  { name: "Airbus", src: "/images/supporters/supporter-4.svg" },
  { name: "Boeing", src: "/images/supporters/supporter-5.svg" },
  { name: "Rocket", src: "/images/supporters/supporter-6.svg" }
];
