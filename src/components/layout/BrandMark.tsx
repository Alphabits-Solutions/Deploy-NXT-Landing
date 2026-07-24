// Elegant SVG space structure logo used in the header as default/fallback.
export function BrandMark({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white shadow-md shadow-teal-500/20"
      style={style}
    >
      <svg className="h-6 w-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.108-7.843-.258" />
      </svg>
    </div>
  );
}
