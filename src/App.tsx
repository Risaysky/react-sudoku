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
    <>
      <main className="flex flex-col items-center justify-center gap-7">
        <form
          onSubmit={handleSubmit}
          className="flex w-150 items-center justify-start gap-3"
        >
          <input
            value={indexInput}
            onChange={(e) => setIndexInput(e.target.value)}
            pattern="^\d{1,5}$"
            required
            placeholder="0-99999"
            className="h-9 w-25 rounded-2xl bg-slate-50 text-center"
          />
          <select
            className="h-9 w-25 rounded-2xl bg-slate-50 text-center"
            onChange={(e) =>
              setDifficultyInput(e.target.value as difficultyType)
            }
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="diabolical">Diabolical</option>
          </select>
          <button className="h-9 w-15 cursor-pointer rounded-2xl bg-sky-200 text-center active:bg-sky-200/70">
            Go
          </button>
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
      <footer className="flex justify-center pb-1 text-slate-100">
        Puzzles by&nbsp;
        <a
          className="flex items-baseline gap-0.5 text-sky-300 hover:underline"
          href="https://github.com/grantm/sudoku-exchange-puzzle-bank/tree/master"
          target="_blank"
        >
          grantm
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 17 17"
            height=".75rem"
            width=".75rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 2v7.5h-1v-5.668l-9.334 9.334-0.707-0.707 9.459-9.459h-5.918v-1h7.5zM11 16h-10v-10h6.574v-1h-7.574v12h12v-7.714h-1v6.714z"></path>
          </svg>
        </a>
      </footer>
    </>
  );
}
