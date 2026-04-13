"use client";

import { useCallback, useMemo, useState } from "react";
import { wordPuzzleWords } from "@/data/games";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_WRONG = 8;

function pickWord() {
  return wordPuzzleWords[Math.floor(Math.random() * wordPuzzleWords.length)]!;
}

export function WordPuzzleGame() {
  const [secret, setSecret] = useState(() => pickWord());
  const [guessed, setGuessed] = useState<Set<string>>(() => new Set());

  const wrongLetters = useMemo(() => {
    const w = new Set<string>();
    guessed.forEach((ch) => {
      if (!secret.includes(ch)) w.add(ch);
    });
    return w;
  }, [guessed, secret]);

  const wrong = wrongLetters.size;

  const won = useMemo(() => {
    return secret.split("").every((c) => guessed.has(c));
  }, [secret, guessed]);

  const lost = wrong >= MAX_WRONG;

  const guessLetter = useCallback(
    (letter: string) => {
      if (won || lost) return;
      if (guessed.has(letter)) return;
      setGuessed((prev) => new Set(prev).add(letter));
    },
    [guessed, won, lost],
  );

  const newGame = useCallback(() => {
    setSecret(pickWord());
    setGuessed(new Set());
  }, []);

  return (
    <div className="wordPuzzle">
      <div className="wordPuzzleStatus">
        <span>Wrong guesses: {wrong} / {MAX_WRONG}</span>
        {won && <span className="wordPuzzleWin">You got it!</span>}
        {lost && !won && (
          <span className="wordPuzzleLose">
            The word was: <strong>{secret}</strong>
          </span>
        )}
      </div>

      <div className="wordPuzzleWord" aria-live="polite">
        {secret.split("").map((ch, i) => (
          <span key={`${i}-${ch}`} className="wordPuzzleCell">
            {guessed.has(ch) ? ch : "_"}
          </span>
        ))}
      </div>

      <div className="wordPuzzleKeyboard" role="group" aria-label="Letter keyboard">
        {ALPHABET.map((letter) => {
          const used = guessed.has(letter);
          const correct = used && secret.includes(letter);
          const wrongLetter = used && !secret.includes(letter);
          return (
            <button
              key={letter}
              type="button"
              className={`wordPuzzleKey${correct ? " wordPuzzleKey--correct" : ""}${wrongLetter ? " wordPuzzleKey--wrong" : ""}`}
              disabled={used || won || lost}
              onClick={() => guessLetter(letter)}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <button type="button" className="btn btnPrimary wordPuzzleNew" onClick={newGame}>
        New word
      </button>
    </div>
  );
}
