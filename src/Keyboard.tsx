const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "X"];

type KeyboardProps = {
  changeSquare: (digit: string, index: number | null) => void;
  focusedIndex: number | null;
};

export default function Keyboard({
  changeSquare,
  focusedIndex,
}: KeyboardProps) {
  return (
    <div className="flex h-9 w-full justify-between">
      {keys.map((key, keyIndex) => (
        <button
          key={key}
          onClick={
            keyIndex < 9
              ? () => changeSquare(key, focusedIndex)
              : () => changeSquare("0", focusedIndex)
          }
          className={`${focusedIndex !== null ? "hover:cursor-pointer active:bg-slate-50/70" : "bg-slate-50/70"} w-full max-w-9 content-center rounded-2xl bg-slate-50 text-center`}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
