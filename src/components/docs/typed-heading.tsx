"use client";

import { useEffect, useState } from "react";
import { cx } from "@/utils/cx";

const TYPE_MS = 85;
const DELETE_MS = 40;
const HOLD_MS = 1900;
const GAP_MS = 320;

/**
 * Two-line display heading: the first line types and erases each of `words`
 * in turn behind a soft block caret; the second line stays put. Screen readers
 * get the whole sentence once, and reduced-motion users see the first word, static.
 */
export function TypedHeading({ words, rest, className }: { words: string[]; rest: string; className?: string }) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(words[0]!.length);
  const [phase, setPhase] = useState<"hold" | "delete" | "type">("hold");
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (still || words.length < 2) return;
    const word = words[i]!;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "hold") t = setTimeout(() => setPhase("delete"), HOLD_MS);
    else if (phase === "delete") {
      if (len > 0) t = setTimeout(() => setLen(len - 1), DELETE_MS);
      else
        t = setTimeout(() => {
          setI((i + 1) % words.length);
          setPhase("type");
        }, GAP_MS);
    } else {
      if (len < word.length) t = setTimeout(() => setLen(len + 1), TYPE_MS);
      else setPhase("hold");
    }
    return () => clearTimeout(t!);
  }, [phase, len, i, words, still]);

  const shown = still ? words[0]! : words[i]!.slice(0, len);

  return (
    <h1 className={cx("font-semibold tracking-[-0.045em] text-fg", className)}>
      <span className="sr-only">
        {words.join(", ")} {rest}
      </span>
      {/* Fixed 1em line (leading is 1) so erasing the word never changes the layout height. */}
      <span aria-hidden className="flex h-[1em] items-center justify-center whitespace-nowrap">
        <span className="inline-flex h-full items-center">
          {shown}
          <span
            data-caret
            className={cx("ml-[0.05em] inline-block h-[0.82em] w-[0.07em] translate-y-[0.04em] rounded-[2px] bg-accent/30", phase === "hold" || still ? "animate-caret" : "")}
          />
        </span>
      </span>
      <span aria-hidden className="block whitespace-nowrap">
        {rest}
      </span>
    </h1>
  );
}
