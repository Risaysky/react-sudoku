import easyPuzzles from "./data/easy.txt?raw";
import mediumPuzzles from "./data/medium.txt?raw";
import hardPuzzles from "./data/hard.txt?raw";
import diabolicalPuzzles from "./data/diabolical.txt?raw";
import { useState, type FormEvent } from "react";
import GameLayout from "./GameLayout";
import { MdOpenInNew } from "react-icons/md";

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
      <main className="mx-auto flex w-full max-w-150 flex-col items-center justify-center gap-7 px-3">
        <form
          onSubmit={handleSubmit}
          className="flex min-w-1/2 items-center justify-between md:self-start"
        >
          <input
            value={indexInput}
            onChange={(e) => setIndexInput(e.target.value)}
            pattern="^\d{1,5}$"
            required
            placeholder="0-99999"
            className="h-9 w-1/3 rounded-2xl bg-slate-50 text-center shadow-md/40"
          />
          <select
            className="h-9 w-1/3 cursor-pointer rounded-2xl bg-slate-50 text-center shadow-md/40"
            onChange={(e) =>
              setDifficultyInput(e.target.value as difficultyType)
            }
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="diabolical">Diabolical</option>
          </select>
          <button className="h-9 w-1/4 cursor-pointer rounded-2xl bg-sky-200 text-center shadow-md/40 active:bg-sky-200/70">
            Go
          </button>
        </form>
        <GameLayout
          puzzle={
            typeof puzzleIndex === "number"
              ? getPuzzle(puzzleIndex, puzzleDifficulty)
              : []
          }
          key={`${puzzleIndex}-${puzzleDifficulty}`}
        />
      </main>
      <footer className="flex items-center justify-center pb-1 text-slate-100">
        Puzzles by&nbsp;
        <a
          className="flex items-center gap-0.5 text-sky-300 hover:underline"
          href="https://github.com/grantm/sudoku-exchange-puzzle-bank/tree/master"
          target="_blank"
        >
          grantm
          <MdOpenInNew />
        </a>
      </footer>
    </>
  );
}
