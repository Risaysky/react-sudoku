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
  let highlightClass = "bg-slate-50";
  if (highlight === "same-digit") highlightClass = "bg-lime-400";
  if (highlight === "focus") highlightClass = "bg-lime-300";

  return (
    <div
      className={`content-center text-center text-3xl focus:outline-none ${highlightClass}`}
      onFocus={() => {
        onFocus(index);
      }}
      tabIndex={isPresolved ? -1 : 0}
    >
      {digit === "0" ? "" : digit}
    </div>
  );
}
