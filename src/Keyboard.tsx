import { BsPencil } from "react-icons/bs";
import { CiEraser } from "react-icons/ci";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

type KeyboardProps = {
  isMarking: boolean;
  onToggleMarking: () => void;
  changeSquare: (
    digit: string,
    index: number | null,
    isMarking?: boolean,
  ) => void;
  focusedIndex: number | null;
};

export default function Keyboard({
  isMarking,
  onToggleMarking,
  changeSquare,
  focusedIndex,
}: KeyboardProps) {
  return (
    <div className="flex h-14 w-full justify-between gap-3 rounded-lg bg-slate-50 px-3 py-3 text-2xl shadow-md/40">
      {keys.map((key, keyIndex) => (
        <button
          key={keyIndex}
          onClick={() => changeSquare(key, focusedIndex, isMarking)}
          className="w-full max-w-11 content-center rounded-md text-center hover:cursor-pointer hover:bg-sky-200/50 active:bg-sky-200/80"
        >
          {key}
        </button>
      ))}
      <button
        onClick={() => changeSquare("0", focusedIndex)}
        className="flex w-full max-w-11 items-center justify-center rounded-md hover:cursor-pointer hover:bg-sky-200/50 active:bg-sky-200/80"
      >
        <CiEraser size="100%" />
      </button>
      <button
        onClick={onToggleMarking}
        className={`flex w-full max-w-11 items-center justify-center rounded-md active:bg-sky-200/80 ${isMarking ? "bg-sky-200" : "hover:bg-sky-200/50"} hover:cursor-pointer`}
      >
        <BsPencil size="75%" />
      </button>
    </div>
  );
}
