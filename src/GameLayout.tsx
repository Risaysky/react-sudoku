import { useCallback, useEffect, useState } from "react";
import Square from "./Square";
import Keyboard from "./Keyboard";

const initialConflictedDigits = Array.from({ length: 81 }, () => false);
const GRID_WIDTH = 9;
const CELL_WIDTH = 3;

const gutterTemplate = Array.from({ length: 8 });

function getCell(index: number) {
  const cellRow = Math.floor(getRow(index) / CELL_WIDTH);
  const cellColumn = Math.floor(getColumn(index) / CELL_WIDTH);
  return `${cellRow}-${cellColumn}`;
}

function getRow(index: number) {
  return Math.floor(index / GRID_WIDTH);
}

function getColumn(index: number) {
  return index % GRID_WIDTH;
}

type GridProps = { puzzle: string[] };

export default function Grid({ puzzle }: GridProps) {
  const [solveDigits, setSolveDigits] = useState(puzzle);
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);
  const conflictedDigits = calcConflictedDigits();
  const isWon =
    solveDigits.every((digit) => digit !== "0") &&
    conflictedDigits.every((conflict) => conflict === false);

  function calcConflictedDigits() {
    const conflictedAcc = [...initialConflictedDigits];
    for (const [index1, digit1] of solveDigits.entries()) {
      if (digit1 === "0") continue;
      const cell1 = getCell(index1);
      for (const [index2, digit2] of solveDigits.entries()) {
        if (index1 === index2) continue;
        if (
          (cell1 === getCell(index2) ||
            getColumn(index1) === getColumn(index2) ||
            getRow(index1) === getRow(index2)) &&
          digit1 === digit2
        )
          conflictedAcc[index1] = true;
      }
    }
    return conflictedAcc;
  }

  function calcHighlight(digit: string, index: number) {
    if (isWon) return "default";

    if (index === focusedIndex) return "focus";

    if (focusedIndex === null) return "default";

    if (
      solveDigits[focusedIndex] === digit &&
      focusedIndex !== index &&
      digit !== "0"
    )
      return "same-digit";

    if (
      getCell(index) === getCell(focusedIndex) ||
      getColumn(index) === getColumn(focusedIndex) ||
      getRow(index) === getRow(focusedIndex)
    )
      return "geometry";

    return "default";
  }

  function handleFocus(index: number) {
    setFocusedIndex(index);
  }

  const changeSquare = useCallback(
    function (digit: string, index: number | null) {
      if (index === null) return;
      if (puzzle[index] !== "0") return;
      setSolveDigits((solveDigits) => {
        const temp = [...solveDigits];
        temp[index] = digit === solveDigits[index] ? "0" : digit;
        return temp;
      });
    },
    [puzzle],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (focusedIndex === null) return;

      if (e.key === "ArrowUp" && getRow(focusedIndex) > 0) {
        setFocusedIndex(focusedIndex - GRID_WIDTH);
      } else if (
        e.key === "ArrowDown" &&
        getRow(focusedIndex) < GRID_WIDTH - 1
      ) {
        setFocusedIndex(focusedIndex + GRID_WIDTH);
      } else if (
        e.key === "ArrowRight" &&
        getColumn(focusedIndex) < GRID_WIDTH - 1
      ) {
        setFocusedIndex(focusedIndex + 1);
      } else if (e.key === "ArrowLeft" && getColumn(focusedIndex) > 0) {
        setFocusedIndex(focusedIndex - 1);
      }

      if (e.key === "Backspace") {
        changeSquare("0", focusedIndex);
        return;
      }

      if (e.key.match(/^[1-9]$/)) {
        changeSquare(e.key, focusedIndex);
        return;
      }
    }

    if (!isWon) document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [changeSquare, focusedIndex, isWon, puzzle, solveDigits]);

  return (
    <>
      <div className="relative grid aspect-square w-full grid-cols-9 grid-rows-9 overflow-hidden rounded-3xl bg-slate-50 text-[clamp(1.125rem,6vw,2.25rem)] shadow-md/40 select-none">
        {solveDigits &&
          solveDigits.map((d, i) => (
            <Square
              key={i}
              index={i}
              isPresolved={puzzle[i] !== "0"}
              isConflicted={conflictedDigits[i]}
              digit={d}
              highlight={calcHighlight(d, i)}
              onFocus={handleFocus}
            />
          ))}
        {gutterTemplate.map((_, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute h-0.5 w-full ${(i + 1) % 3 === 0 ? "z-10 bg-slate-400" : "bg-slate-300"}`}
            style={{ top: `calc(${i + 1}/9 * 100% - .125rem)` }}
          />
        ))}
        {gutterTemplate.map((_, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute h-full w-0.5 ${(i + 1) % 3 === 0 ? "z-10 bg-slate-400" : "bg-slate-300"}`}
            style={{ left: `calc(${i + 1}/9 * 100% - .125rem)` }}
          />
        ))}
      </div>
      <Keyboard changeSquare={changeSquare} focusedIndex={focusedIndex} />
    </>
  );
}
