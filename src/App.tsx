import { useEffect, useState } from "react";
import puzzles from "./data/easy.txt?raw";
import Grid from "./Grid";
import Square from "./Square";

const puzzle = puzzles.split("\n")[0].split(" ")[1].split("");

export default function App() {
  const [solveDigits, setSolveDigits] = useState(puzzle);
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

  function calcSameDigitHighlight(digit: string, index: number) {
    if (focusedIndex === null || digit === "0") return false;
    return solveDigits[focusedIndex] === digit && focusedIndex !== index;
  }

  function handleFocus(index: number) {
    setFocusedIndex(index);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (focusedIndex === null || !e.key.match(/^\d$/)) return;
      setSolveDigits((digs) => {
        const temp = [...digs];
        temp[focusedIndex] = e.key;
        return temp;
      });
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
            focusHighlight={i === focusedIndex}
            geometryHighlight={false}
            sameDigitHighlight={calcSameDigitHighlight(d, i)}
            onFocus={handleFocus}
          />
        ))}
      </Grid>
    </main>
  );
}
