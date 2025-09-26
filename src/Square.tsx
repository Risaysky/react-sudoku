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

const cornerPositions = [
  "top-1 left-1",
  "top-1 right-1",
  "bottom-1 left-1",
  "bottom-1 right-1",
  "top-1 -translate-x-1/2",
  "bottom-1 -translate-x-1/2",
  "top-1/2 -translate-y-1/2 left-1",
  "top-1/2 -translate-y-1/2 right-1",
  "top-1/2 -translate-y-1/2 -translate-x-1/2",
];

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
  const normalDigits = digit.length === 1 && digit !== "0" ? digit : "";
  const cornerDigits = digit.split("0")[0]?.split("").sort().concat() || "";
  const centerDigits = digit.split("0").at(-1)?.split("").sort().concat() || "";

  return (
    <div
      className={`opacity @container relative h-full w-full content-center text-center focus:outline-none ${textColor} ${bgColor}`}
      onFocus={() => {
        onFocus(index);
      }}
      tabIndex={isPresolved ? -1 : 0}
    >
      {normalDigits ? (
        <span className="text-[50cqw]">{normalDigits}</span>
      ) : (
        <>
          <div className="absolute top-0 left-0 h-full w-full text-[20cqw]">
            {cornerDigits.map((d, i) => (
              <span className={`${cornerPositions[i]} absolute`} key={i}>
                {d}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: `min(calc(50cqw/${centerDigits.length}*3.5),30cqw)`,
            }}
          >
            {centerDigits}
          </span>
        </>
      )}
    </div>
  );
}
