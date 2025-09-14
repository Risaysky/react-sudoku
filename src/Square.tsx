type SquareProps = {
  index: number;
  isPresolved: boolean;
  isConflicted: boolean;
  digit: string;
  highlight: "focus" | "same-digit" | "geometry" | null;
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
  let highlightClass;
  switch (highlight) {
    case "focus":
      highlightClass = "bg-sky-500/40";
      break;
    case "same-digit":
      highlightClass = "bg-sky-600/30";
      break;
    case "geometry":
      highlightClass = "bg-sky-300/30";
      break;
    default:
      break;
  }

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
