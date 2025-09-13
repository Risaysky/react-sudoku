import { useEffect, useState } from "react";
import puzzles from "./data/easy.txt?raw";
import Grid from "./Grid";
import Square from "./Square";

const puzzle = puzzles.split("\n")[0].split(" ")[1].split("");
const cellStartIndices = [0, 3, 6, 27, 30, 33, 54, 54, 57, 60];

export default function App() {
  const [solveDigits, setSolveDigits] = useState(puzzle);
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

  function calcHighlight(digit: string, index: number) {
    if (index === focusedIndex) return "focus";

    if (focusedIndex === null) return "";

    if (
      solveDigits[focusedIndex] === digit &&
      focusedIndex !== index &&
      digit !== "0"
    )
      return "same-digit";

    if (
      index % 9 === focusedIndex % 9 ||
      Math.floor(index / 9) === Math.floor(focusedIndex / 9)
    )
      return "geometry";

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
    if (focusedCell === squareCell) return "geometry";

    return "";
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-600">
      <Grid>
        {solveDigits.map((d, i) => (
          <Square
            key={i}
            index={i}
            isPresolved={puzzle[i] !== "0"}
            digit={d}
            highlight={calcHighlight(d, i)}
            onFocus={handleFocus}
          />
        ))}
      </Grid>
    </main>
  );
}
