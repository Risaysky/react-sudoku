import type { ReactNode } from "react";

const gutterTemplate = Array.from({ length: 8 });

type GridProps = { children: ReactNode };

export default function Grid({ children }: GridProps) {
  return (
    <>
      <div className="relative grid h-150 w-150 grid-cols-9 grid-rows-9 overflow-hidden rounded-3xl bg-slate-50 select-none">
        {children}
        {gutterTemplate.map((_, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute h-0.5 w-full ${(i + 1) % 3 === 0 ? "z-10 bg-slate-400" : "bg-slate-300"}`}
            style={{ top: `calc(${i + 1}/9 * 100% - .125rem)` }}
          />
        ))}
        {gutterTemplate.map((_, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute h-full w-0.5 ${(i + 1) % 3 === 0 ? "z-10 bg-slate-400" : "bg-slate-300"}`}
            style={{ left: `calc(${i + 1}/9 * 100% - .125rem)` }}
          />
        ))}
      </div>
    </>
  );
}
