const nonConflictedStyle = {
  default: "",
  focus: "bg-sky-500/40",
  "same-digit": "bg-sky-600/30",
  geometry: "bg-sky-300/30",
};

const conflictedStyle = {
  default: "bg-red-400/40",
  focus: "bg-sky-500/40",
  "same-digit": "bg-red-400/40",
  geometry: "bg-red-400/40",
};

type SquareProps = {
  index: number;
  isPresolved: boolean;
  isConflicted: boolean;
  digit: string;
  highlight: "focus" | "same-digit" | "geometry" | "default";
  onFocus: (index: number) => void;
};

export default function Square({
  index,
  isPresolved,
  isConflicted,
  digit,
  highlight,
  onFocus,
}: SquareProps) {
  const highlightClass = isConflicted
    ? conflictedStyle[highlight]
    : nonConflictedStyle[highlight];

  return (
    <div
      className={`opacity content-center text-center text-4xl focus:outline-none ${isPresolved ? "text-slate-900" : isConflicted ? "text-red-400" : "text-blue-500"} ${highlightClass}`}
      onFocus={() => {
        onFocus(index);
      }}
      tabIndex={isPresolved ? -1 : 0}
    >
      {digit === "0" ? "" : digit}
    </div>
  );
}
