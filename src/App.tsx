import { useEffect, useState } from "react";
import puzzles from "./data/easy.txt?raw";
import Grid from "./Grid";
import Square from "./Square";

const puzzle = puzzles.split("\n")[2].split(" ")[1].split("");
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

export default function App() {
  const [solveDigits, setSolveDigits] = useState(puzzle);
  const [conflictedDigits, setConflictedDigits] = useState(
    initialConflictedDigits,
  );
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

  function calcHighlight(digit: string, index: number) {
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

      if (puzzle[focusedIndex] !== "0") return;

      if (e.key === "Backspace" || e.key === solveDigits[focusedIndex]) {
        setSolveDigits((solveDigits) => {
          const temp = [...solveDigits];
          temp[focusedIndex] = "0";
          return temp;
        });
        return;
      }

      if (e.key.match(/^[1-9]$/)) {
        setSolveDigits((solveDigits) => {
          const temp = [...solveDigits];
          temp[focusedIndex] = e.key;
          return temp;
        });
        return;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, solveDigits]);

  useEffect(() => {
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
    if (JSON.stringify(conflictedAcc) !== JSON.stringify(conflictedDigits))
      setConflictedDigits(conflictedAcc);
  }, [conflictedDigits, solveDigits]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-600">
      <Grid>
        {solveDigits.map((d, i) => (
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
      </Grid>
    </main>
  );
}
