import { useEffect, useState } from "react";
import puzzles from "./data/easy.txt?raw";
import Grid from "./Grid";
import Square from "./Square";

const puzzle = puzzles.split("\n")[2].split(" ")[1].split("");
const cellStartIndices = [0, 3, 6, 27, 30, 33, 54, 54, 57, 60];
const initialConflictedDigits = Array.from({ length: 81 }, () => false);

function getCell(index: number) {
  for (const i of cellStartIndices) {
    if (
      (index >= i && index < i + 3) ||
      (index >= i + 9 && index < i + 3 + 9) ||
      (index >= i + 18 && index < i + 3 + 18)
    ) {
      return i;
    }
  }
}

function getRow(index: number) {
  return Math.floor(index / 9);
}

function getColumn(index: number) {
  return index % 9;
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

      if (e.key === "ArrowUp" && focusedIndex > 8) {
        setFocusedIndex(focusedIndex - 9);
      } else if (e.key === "ArrowDown" && focusedIndex < 72) {
        setFocusedIndex(focusedIndex + 9);
      } else if (e.key === "ArrowRight" && (focusedIndex + 1) % 9 !== 0) {
        setFocusedIndex(focusedIndex + 1);
      } else if (e.key === "ArrowLeft" && focusedIndex % 9 !== 0) {
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
