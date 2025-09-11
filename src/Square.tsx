import { useState, type ChangeEvent } from "react";

type SquareProps = {
  baseDigit: string;
  index: number;
  syncSolveDigit: (solveDigit: string, index: number) => void;
};

export default function Square({
  baseDigit,
  index,
  syncSolveDigit,
}: SquareProps) {
  const isPresolved = baseDigit !== "0";
  const [inputDigit, setInputDigit] = useState(isPresolved ? baseDigit : "");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value.match(/^([1-9])?$/)) return;
    setInputDigit(e.target.value);
    syncSolveDigit(e.target.value, index);
  }

  return (
    <input
      className={`flex h-full items-center text-center text-4xl select-none focus:outline-none ${isPresolved ? "text-slate-600" : "text-blue-500"}`}
      value={inputDigit}
      onChange={handleChange}
      disabled={isPresolved}
      id={index.toString()}
      autoComplete="off"
    />
  );
}
