import easyPuzzles from "./data/easy.txt?raw";
import mediumPuzzles from "./data/medium.txt?raw";
import hardPuzzles from "./data/hard.txt?raw";
import diabolicalPuzzles from "./data/diabolical.txt?raw";
import { useState, type FormEvent } from "react";
import GridLayout from "./GridLayout";
import Grid from "./Grid";

type difficultyType = "easy" | "medium" | "hard" | "diabolical";

const puzzlesFiles = {
  easy: easyPuzzles,
  medium: mediumPuzzles,
  hard: hardPuzzles,
  diabolical: diabolicalPuzzles,
};

function getPuzzle(index: number, difficulty: difficultyType) {
  return puzzlesFiles[difficulty].split("\n")[index].split(" ")[1].split("");
}

export default function App() {
  const [indexInput, setIndexInput] = useState("");
  const [difficultyInput, setDifficultyInput] =
    useState<difficultyType>("easy");
  const [puzzleIndex, setPuzzleIndex] = useState<null | number>(null);
  const [puzzleDifficulty, setPuzzleDifficulty] =
    useState<difficultyType>("easy");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      puzzleIndex === null ||
      ((puzzleIndex !== Number(indexInput) ||
        puzzleDifficulty !== difficultyInput) &&
        window.confirm("Leave current puzzle and lose progress?"))
    ) {
      setPuzzleIndex(Number(indexInput));
      setPuzzleDifficulty(difficultyInput);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-7 bg-slate-600">
      <form
        onSubmit={handleSubmit}
        className="flex w-150 items-center justify-start gap-3"
      >
        <input
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value)}
          pattern="^\d{1,5}$"
          required
          className="h-9 w-25 rounded-2xl bg-slate-50 text-center"
        />
        <select
          className="h-9 w-25 rounded-2xl bg-slate-50 text-center"
          onChange={(e) => setDifficultyInput(e.target.value as difficultyType)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="diabolical">Diabolical</option>
        </select>
      </form>
      <GridLayout>
        {typeof puzzleIndex === "number" && (
          <Grid
            puzzle={getPuzzle(puzzleIndex, puzzleDifficulty)}
            key={`${puzzleIndex}-${puzzleDifficulty}`}
          />
        )}
      </GridLayout>
    </main>
  );
}
