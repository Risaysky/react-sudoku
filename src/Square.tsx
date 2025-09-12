type SquareProps = {
  index: number;
  isPresolved: boolean;
  digit: string;
  geometryHighlight: boolean;
  sameDigitHighlight: boolean;
  onFocus: (index: number) => void;
};

export default function Square({
  index,
  isPresolved,
  digit,
  geometryHighlight,
  sameDigitHighlight,
  onFocus,
}: SquareProps) {
  return (
    <div
      className={`content-center text-center text-3xl ${sameDigitHighlight ? "bg-red-400" : "bg-slate-50"}`}
      onFocus={() => onFocus(index)}
      tabIndex={isPresolved ? -1 : 0}
    >
      {isPresolved ? digit : ""}
    </div>
  );
}
