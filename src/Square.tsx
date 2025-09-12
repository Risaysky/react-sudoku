type SquareProps = {
  index: number;
  isPresolved: boolean;
  digit: string;
  focusHighlight: boolean;
  geometryHighlight: boolean;
  sameDigitHighlight: boolean;
  onFocus: (index: number) => void;
};

export default function Square({
  index,
  isPresolved,
  digit,
  focusHighlight,
  geometryHighlight,
  sameDigitHighlight,
  onFocus,
}: SquareProps) {
  let highlight = "bg-slate-50";
  if (sameDigitHighlight) highlight = "bg-lime-400";
  if (focusHighlight) highlight = "bg-lime-300";

  return (
    <div
      className={`content-center text-center text-3xl ${highlight}`}
      onFocus={() => {
        onFocus(index);
      }}
      tabIndex={isPresolved ? -1 : 0}
    >
      {digit === "0" ? "" : digit}
    </div>
  );
}
