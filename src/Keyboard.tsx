import { BsPencil } from "react-icons/bs";
import { CiEraser } from "react-icons/ci";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

type KeyboardProps = {
  writeMode: "normal" | "center" | "corner";
  changeWriteMode: () => void;
  changeSquare: (
    digit: string,
    index: number | null,
    writeMode?: "normal" | "center" | "corner",
  ) => void;
  focusedIndex: number | null;
};

export default function Keyboard({
  writeMode,
  changeWriteMode,
  changeSquare,
  focusedIndex,
}: KeyboardProps) {
  return (
    <div className="grid w-full grid-cols-11 items-center gap-0.5 gap-y-2 rounded-lg bg-slate-50 px-3 py-3 shadow-md/40 select-none">
      {keys.map((key, keyIndex) => (
        <button
          key={keyIndex}
          onClick={() => changeSquare(key, focusedIndex, writeMode)}
          className={`@container relative flex aspect-square items-center justify-center rounded-md hover:cursor-pointer hover:bg-sky-200/50 active:bg-sky-200/80`}
        >
          <span className="text-[60cqw]">{key}</span>
        </button>
      ))}
      <button
        onClick={() => changeSquare("0", focusedIndex)}
        className="@container flex aspect-square items-center justify-center rounded-md hover:cursor-pointer hover:bg-sky-200/50 active:bg-sky-200/80"
      >
        <CiEraser className="text-[50cqw]" />
      </button>
      <button
        onClick={changeWriteMode}
        className="@container relative flex aspect-square flex-col items-center justify-center rounded-md hover:cursor-pointer hover:bg-sky-200/50 active:bg-sky-200/80"
      >
        <span className="absolute -top-1 text-[25cqw]">{writeMode}</span>
        <BsPencil className="text-[50cqw]" />
      </button>
    </div>
  );
}
