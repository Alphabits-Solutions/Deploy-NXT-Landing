// Supporter / partner logos shown in the marquee strip.
// To swap in a logo, drop the image in public/images/supporters/
// and point src at it here.
export interface Supporter {
  name: string;
  src: string;
}

export const SUPPORTERS: Supporter[] = [
  { name: "MeitY", src: "/images/supporters/meity.png" },
  { name: "DPIIT Startup India", src: "/images/supporters/startup-india.png" },
  { name: "IN-SPACe", src: "/images/supporters/in-space.png" },
  { name: "SISFS", src: "/images/supporters/sisfs.png" },
  { name: "KIIF", src: "/images/supporters/kiif.png" },
  { name: "i-Hub", src: "/images/supporters/i-hub.png" },
  { name: "Sanchi Connect", src: "/images/supporters/sanchi-connect.png" },
  { name: "Ahmedabad University Venture Studio", src: "/images/supporters/venture-studio.png" }
];
