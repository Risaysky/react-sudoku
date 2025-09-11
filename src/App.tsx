import { useState } from "react";
import puzzles from "./data/easy.txt?raw";
import Grid from "./Grid";
import Square from "./Square";

const puzzle = puzzles.split("\n")[0].split(" ")[1].split("");

export default function App() {
  const [solveDigits, setSolveDigits] = useState(puzzle);

  function syncSolveDigit(solveDigit: string, index: number) {
    setSolveDigits((digits) => {
      const temp = [...digits];
      temp[index] = solveDigit;
      return temp;
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-600">
      <Grid>
        {puzzle.map((d, i) => (
          <Square
            key={i}
            baseDigit={d}
            index={i}
            syncSolveDigit={syncSolveDigit}
          />
        ))}
      </Grid>
    </main>
  );
}
