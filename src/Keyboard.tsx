const eraserIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="1.25"
    viewBox="0 0 24 24"
    height="90%"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path>
    <path d="M22 21H7"></path>
    <path d="m5 11 9 9"></path>
  </svg>
);

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

type KeyboardProps = {
  changeSquare: (digit: string, index: number | null) => void;
  focusedIndex: number | null;
};

export default function Keyboard({
  changeSquare,
  focusedIndex,
}: KeyboardProps) {
  return (
    <div className="flex h-14 w-full justify-between gap-3 rounded-lg bg-slate-50 px-3 py-3 text-2xl shadow-md/40">
      {keys.map((key, keyIndex) => (
        <button
          key={keyIndex}
          onClick={() => changeSquare(key, focusedIndex)}
          className="w-full max-w-11 content-center rounded-md text-center hover:cursor-pointer hover:bg-sky-200/70 active:bg-sky-200/50"
        >
          {key}
        </button>
      ))}
      <button
        onClick={() => changeSquare("0", focusedIndex)}
        className="flex w-full max-w-11 items-center justify-center rounded-md hover:cursor-pointer hover:bg-sky-200/70 active:bg-sky-200/50"
      >
        {eraserIcon}
      </button>
    </div>
  );
}
