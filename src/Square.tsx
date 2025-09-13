type SquareProps = {
  index: number;
  isPresolved: boolean;
  digit: string;
  highlight: string;
  onFocus: (index: number) => void;
};

export default function Square({
  index,
  isPresolved,
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
      highlightClass = "bg-sky-600/40";
      break;
    case "geometry":
      highlightClass = "bg-sky-300/30";
      break;
    default:
      break;
  }

  return (
    <div
      className={`opacity content-center text-center text-4xl focus:outline-none ${highlightClass}`}
      onFocus={() => {
        onFocus(index);
      }}
      tabIndex={isPresolved ? -1 : 0}
    >
      {digit === "0" ? "" : digit}
    </div>
  );
}
