import { useState } from "react";
import puzzles from "./data/easy.txt?raw";
import Grid from "./Grid";
import Square from "./Square";

const puzzle = puzzles.split("\n")[0].split(" ")[1].split("");

export default function App() {
  const [solveDigits, setSolveDigits] = useState(puzzle);
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

  function calcSameDigitHighlight(digit: string) {
    if (focusedIndex === null || digit === "0") return false;
    return solveDigits[focusedIndex] === digit;
  }

  function handleFocus(index: number) {
    setFocusedIndex(index);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-600">
      <Grid>
        {solveDigits.map((d, i) => (
          <Square
            key={i}
            index={i}
            isPresolved={puzzle[i] !== "0"}
            digit={d}
            geometryHighlight={false}
            sameDigitHighlight={calcSameDigitHighlight(d)}
            onFocus={handleFocus}
          />
        ))}
      </Grid>
    </main>
  );
}
