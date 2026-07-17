"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type RotatingTextProps = {
  words: string[];
  interval?: number;
  className?: string;
  transition?: Transition;
};

const defaultTransition: Transition = {
  type: "spring",
  damping: 24,
  stiffness: 320,
};

/**
 * Animate UI style rotating text: cycles through `words`, animating each word in
 * per-character. Used for the hero headline ("...for those brave at heart").
 */
export function RotatingText({
  words,
  interval = 2400,
  className,
  transition = defaultTransition,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [interval, next, words.length]);

  const characters = useMemo(() => Array.from(words[index]), [words, index]);

  return (
    <span className={cn("inline-flex overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="inline-flex"
          aria-label={words[index]}
        >
          {characters.map((char, i) => (
            <motion.span
              key={`${index}-${i}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                ...transition,
                delay: i * 0.025,
              }}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
