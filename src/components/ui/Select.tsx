import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** Visual style: "light" (form fields) or "modal" (rounded-xl slate fields). */
  variant?: "light" | "modal";
  placeholder?: string;
  className?: string;
}

// Fully custom, accessible dropdown that replaces the native <select> so the
// open panel can be styled (rounded panel, hover states, teal highlight).
// Supports mouse, click-outside-to-close, and keyboard navigation.
export function Select({
  value,
  options,
  onChange,
  variant = "light",
  placeholder = "Select an option",
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // When opening, focus the currently selected option.
  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      setActiveIndex(idx < 0 ? 0 : idx);
    }
  }, [open, value, options]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const commit = (idx: number) => {
    const opt = options[idx];
    if (opt) onChange(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) commit(activeIndex);
        else setOpen(true);
        break;
      case "Escape":
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const triggerBase =
    variant === "modal"
      ? "w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 py-3 text-sm font-medium text-slate-900"
      : "w-full bg-field border-[1.5px] border-hairline rounded-[10px] pl-[15px] pr-11 py-[13px] text-sm font-mono text-ink";

  const triggerFocus =
    variant === "modal"
      ? "focus:border-teal-600"
      : "focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/[0.14]";

  const openBorder =
    variant === "modal"
      ? "border-teal-600"
      : "border-accent bg-white ring-4 ring-accent/[0.14]";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={`${triggerBase} ${triggerFocus} ${open ? openBorder : ""} flex items-center justify-between text-left cursor-pointer transition-all focus:outline-none`}
      >
        <span className={selected ? "" : "text-meta"}>
          {selected ? selected.label : placeholder}
        </span>
      </button>
      <ChevronDown
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-meta transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      />

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-30 mt-2 w-full max-h-60 overflow-auto rounded-xl border border-hairline bg-white p-1.5 shadow-[0_20px_40px_-16px_rgba(11,22,34,.35)] animate-[fadeIn_0.12s_ease-out]"
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isActive = idx === activeIndex;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => commit(idx)}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors ${
                  isActive ? "bg-tag-bg text-teal-text" : "text-ink"
                } ${isSelected ? "font-semibold" : ""}`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="h-4 w-4 text-accent shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
