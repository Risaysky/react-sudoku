import { useCallback, useEffect, useState } from "react";
import Square from "./Square";
import Keyboard from "./Keyboard";

const initialConflictedDigits = Array.from({ length: 81 }, () => false);
const GRID_WIDTH = 9;
const CELL_WIDTH = 3;

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
  const [writeMode, setWriteMode] = useState<"normal" | "center" | "corner">(
    "normal",
  );
  const conflictedDigits = calcConflictedDigits();
  const isWon =
    solveDigits.every((digit) => digit !== "0" && digit.length === 1) &&
    conflictedDigits.every((conflict) => conflict === false);

  function calcConflictedDigits() {
    const conflictedAcc = [...initialConflictedDigits];
    for (const [index1, digit1] of solveDigits.entries()) {
      if (digit1 === "0" || digit1.length > 1) continue;
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
    if (isWon || focusedIndex === null) return "default";

    if (index === focusedIndex) return "focus";

    if (
      solveDigits[focusedIndex] === digit &&
      focusedIndex !== index &&
      digit !== "0" &&
      digit.length === 1
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

  const changeSquare = useCallback(
    function (
      digit: string,
      index: number | null,
      writeMode: string = "normal",
    ) {
      if (index === null) return;
      if (puzzle[index] !== "0") return;

      switch (writeMode) {
        case "normal":
          setSolveDigits((solveDigits) => {
            const temp = [...solveDigits];
            temp[index] = digit === solveDigits[index] ? "0" : digit;
            return temp;
          });
          break;

        case "corner":
          setSolveDigits((solveDigits) => {
            const temp = [...solveDigits];
            if (temp[index].length === 1) {
              temp[index] = digit + "0";
            } else {
              if (new RegExp(digit + "(?=.*0)").test(temp[index])) {
                temp[index] = temp[index].replace(
                  new RegExp(digit + "(?=.*0)"),
                  "",
                );
              } else {
                temp[index] = digit + temp[index];
              }
            }
            return temp;
          });
          break;

        case "center":
          setSolveDigits((solveDigits) => {
            const temp = [...solveDigits];
            if (temp[index].length === 1) {
              temp[index] = "0" + digit;
            } else {
              if (new RegExp("(?<=0.*)" + digit).test(temp[index])) {
                temp[index] = temp[index].replace(
                  new RegExp("(?<=0.*)" + digit),
                  "",
                );
              } else {
                temp[index] = temp[index] + digit;
              }
            }
            return temp;
          });
          break;
      }
    },
    [puzzle],
  );

  const changeWriteMode = useCallback(
    function () {
      switch (writeMode) {
        case "normal":
          setWriteMode("corner");
          break;
        case "corner":
          setWriteMode("center");
          break;
        case "center":
          setWriteMode("normal");
          break;
      }
    },
    [writeMode],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (focusedIndex === null) return;

      if (
        (e.key === "ArrowUp" || e.key.toLocaleLowerCase() === "k") &&
        getRow(focusedIndex) > 0
      ) {
        setFocusedIndex(focusedIndex - GRID_WIDTH);
      } else if (
        (e.key === "ArrowDown" || e.key.toLocaleLowerCase() === "j") &&
        getRow(focusedIndex) < GRID_WIDTH - 1
      ) {
        setFocusedIndex(focusedIndex + GRID_WIDTH);
      } else if (
        (e.key === "ArrowRight" || e.key.toLocaleLowerCase() === "l") &&
        getColumn(focusedIndex) < GRID_WIDTH - 1
      ) {
        setFocusedIndex(focusedIndex + 1);
      } else if (
        (e.key === "ArrowLeft" || e.key.toLocaleLowerCase() === "h") &&
        getColumn(focusedIndex) > 0
      ) {
        setFocusedIndex(focusedIndex - 1);
      } else if (e.key.toLowerCase() === "c") {
        changeWriteMode();
      } else if (e.key === "Backspace" || e.key.toLocaleLowerCase() === "d") {
        changeSquare("0", focusedIndex);
      } else if (e.key.match(/^[1-9]$/)) {
        changeSquare(e.key, focusedIndex, writeMode);
      }
    }

    if (!isWon) document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    changeSquare,
    focusedIndex,
    writeMode,
    isWon,
    puzzle,
    solveDigits,
    changeWriteMode,
  ]);

  return (
    <>
      <div className="relative grid aspect-square w-full grid-cols-9 grid-rows-9 overflow-hidden rounded-3xl bg-slate-50 shadow-md/40 select-none">
        {solveDigits &&
          solveDigits.map((d, i) => (
            <Square
              key={i}
              index={i}
              isPresolved={puzzle[i] !== "0"}
              isConflicted={conflictedDigits[i]}
              digit={d}
              highlight={calcHighlight(d, i)}
              onFocus={() => setFocusedIndex(i)}
            />
          ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute h-0.5 w-full ${(i + 1) % 3 === 0 ? "z-10 bg-slate-400" : "bg-slate-300"}`}
            style={{ top: `calc(${i + 1}/9 * 100% - 2px / 2)` }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute h-full w-0.5 ${(i + 1) % 3 === 0 ? "z-10 bg-slate-400" : "bg-slate-300"}`}
            style={{ left: `calc(${i + 1}/9 * 100% - 2px / 2` }}
          />
        ))}
      </div>
      <Keyboard
        changeSquare={changeSquare}
        focusedIndex={focusedIndex}
        writeMode={writeMode}
        changeWriteMode={changeWriteMode}
      />
    </>
  );
}
