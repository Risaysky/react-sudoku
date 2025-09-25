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
  const bgColor = isConflicted
    ? conflictedStyle[highlight]
    : nonConflictedStyle[highlight];

  const textColor = isPresolved
    ? "text-slate-900"
    : isConflicted
      ? "text-red-400"
      : "text-blue-500";
  const digitDisplay =
    digit.length === 1
      ? digit === "0"
        ? ""
        : digit
      : digit.slice(1).split("").sort().join("");

  return (
    <div
      className={`opacity h-full w-full content-center text-center focus:outline-none ${digit.length === 1 ? "text-[clamp(1.125rem,6vw,2.25rem)]" : "text-sm"} ${textColor} ${bgColor}`}
      onFocus={() => {
        onFocus(index);
      }}
      tabIndex={isPresolved ? -1 : 0}
    >
      {digitDisplay}
    </div>
  );
}
