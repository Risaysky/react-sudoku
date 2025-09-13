import { useEffect, useState } from "react";
import puzzles from "./data/easy.txt?raw";
import Grid from "./Grid";
import Square from "./Square";

const puzzle = puzzles.split("\n")[0].split(" ")[1].split("");

export default function App() {
  const [solveDigits, setSolveDigits] = useState(puzzle);
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

  function calcHighlight(digit: string, index: number) {
    if (index === focusedIndex) return "focus";
    if (focusedIndex === null || digit === "0") return "";
    if (solveDigits[focusedIndex] === digit && focusedIndex !== index)
      return "same-digit";
    return "";
  }

  function handleFocus(index: number) {
    setFocusedIndex(index);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (focusedIndex === null || puzzle[focusedIndex] !== "0") return;
      if (e.key.match(/^[1-9]$/)) {
        setSolveDigits((solveDigits) => {
          const temp = [...solveDigits];
          temp[focusedIndex] = e.key;
          return temp;
        });
      }
      if (e.key === "Backspace") {
        setSolveDigits((solveDigits) => {
          const temp = [...solveDigits];
          temp[focusedIndex] = "0";
          return temp;
        });
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex]);

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
