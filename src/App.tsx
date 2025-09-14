import { useEffect, useState } from "react";
import puzzles from "./data/easy.txt?raw";
import Grid from "./Grid";
import Square from "./Square";

const puzzle = puzzles.split("\n")[2].split(" ")[1].split("");
const cellStartIndices = [0, 3, 6, 27, 30, 33, 54, 54, 57, 60];
const initialConflictedDigits = Array.from({ length: 81 }, () => false);

export default function App() {
  const [solveDigits, setSolveDigits] = useState(puzzle);
  const [conflictedDigits, setConflictedDigits] = useState(
    initialConflictedDigits,
  );
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

  function calcHighlight(digit: string, index: number) {
    if (index === focusedIndex) return "focus";

    if (focusedIndex === null) return null;

    if (
      solveDigits[focusedIndex] === digit &&
      focusedIndex !== index &&
      digit !== "0"
    )
      return "same-digit";

    let squareCell;
    let focusedCell;

    for (const i of cellStartIndices) {
      if (
        (focusedIndex >= i && focusedIndex < i + 3) ||
        (focusedIndex >= i + 9 && focusedIndex < i + 3 + 9) ||
        (focusedIndex >= i + 18 && focusedIndex < i + 3 + 18)
      ) {
        focusedCell = i;
        break;
      }
    }

    for (const i of cellStartIndices) {
      if (
        (index >= i && index < i + 3) ||
        (index >= i + 9 && index < i + 3 + 9) ||
        (index >= i + 18 && index < i + 3 + 18)
      ) {
        squareCell = i;
        break;
      }
    }
    if (
      focusedCell === squareCell ||
      index % 9 === focusedIndex % 9 ||
      Math.floor(index / 9) === Math.floor(focusedIndex / 9)
    )
      return "geometry";

    return null;
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
    const conflictAcc = [...initialConflictedDigits];
    for (const [index1, digit1] of solveDigits.entries()) {
      if (digit1 === "0") continue;
      let cell1;
      for (const i of cellStartIndices) {
        if (
          (index1 >= i && index1 < i + 3) ||
          (index1 >= i + 9 && index1 < i + 3 + 9) ||
          (index1 >= i + 18 && index1 < i + 3 + 18)
        ) {
          cell1 = i;
          break;
        }
      }
      for (const [index2, digit2] of solveDigits.entries()) {
        if (index1 === index2) continue;

        let cell2;

        for (const i of cellStartIndices) {
          if (
            (index2 >= i && index2 < i + 3) ||
            (index2 >= i + 9 && index2 < i + 3 + 9) ||
            (index2 >= i + 18 && index2 < i + 3 + 18)
          ) {
            cell2 = i;
            break;
          }
        }

        if (
          (cell1 === cell2 ||
            index2 % 9 === index1 % 9 ||
            Math.floor(index2 / 9) === Math.floor(index1 / 9)) &&
          digit1 === digit2
        )
          conflictAcc[index1] = true;
      }
    }
    if (JSON.stringify(conflictAcc) !== JSON.stringify(conflictedDigits))
      setConflictedDigits(conflictAcc);
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
