import type { ReactNode } from "react";

type GridProps = { children: ReactNode };

export default function Grid({ children }: GridProps) {
  return (
    <>
      <div className="relative grid h-150 w-150 grid-cols-9 grid-rows-9 overflow-hidden rounded-3xl select-none">
        {children}
        <div
          className="absolute h-1 w-full bg-slate-300"
          style={{ top: "calc(1/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-1 w-full bg-slate-300"
          style={{ top: "calc(2/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute z-10 h-1 w-full bg-slate-400"
          style={{ top: "calc(3/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-1 w-full bg-slate-300"
          style={{ top: "calc(4/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-1 w-full bg-slate-300"
          style={{ top: "calc(5/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute z-10 h-1 w-full bg-slate-400"
          style={{ top: "calc(6/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-1 w-full bg-slate-300"
          style={{ top: "calc(7/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-1 w-full bg-slate-300"
          style={{ top: "calc(8/9 * 100% - .125rem)" }}
        />

        <div
          className="absolute h-full w-1 bg-slate-300"
          style={{ left: "calc(1/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-full w-1 bg-slate-300"
          style={{ left: "calc(2/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute z-10 h-full w-1 bg-slate-400"
          style={{ left: "calc(3/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-full w-1 bg-slate-300"
          style={{ left: "calc(4/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-full w-1 bg-slate-300"
          style={{ left: "calc(5/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute z-10 h-full w-1 bg-slate-400"
          style={{ left: "calc(6/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-full w-1 bg-slate-300"
          style={{ left: "calc(7/9 * 100% - .125rem)" }}
        />
        <div
          className="absolute h-full w-1 bg-slate-300"
          style={{ left: "calc(8/9 * 100% - .125rem)" }}
        />
      </div>
    </>
  );
}
