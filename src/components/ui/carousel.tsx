"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/utils/cx";
import { StepperDots } from "./step-indicator";

export interface CarouselProps {
  /** Each child is one slide. */
  children: ReactNode;
  /** Accessible name for the carousel. */
  label: string;
  /** Slides visible at once on wide screens (1–3). */
  perView?: 1 | 2 | 3;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

/** Scroll-snap slides with arrows and dots. Swipe, drag or use the buttons; arrows keys work when focused. */
export function Carousel({ children, label, perView = 1, showArrows = true, showDots = true, className }: CarouselProps) {
  const slides = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const pages = Math.max(1, slides.length - perView + 1);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    const slide = el?.children[Math.max(0, Math.min(slides.length - 1, i))] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, [slides.length]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
      setIndex(Math.round(el.scrollLeft / (w + 12)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const arrow =
    "absolute top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-fg-secondary shadow-button outline-none transition hover:text-fg focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-0 [&_svg]:size-4";

  return (
    <section aria-roledescription="carousel" aria-label={label} className={cx("relative flex flex-col gap-4", className)}>
      <div className="relative">
        <div
          ref={track}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(index + 1);
            if (e.key === "ArrowLeft") goTo(index - 1);
          }}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth rounded-lg outline-none [scrollbar-width:none] focus-visible:shadow-focus [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((s, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className={cx("shrink-0 snap-start", perView === 1 ? "w-full" : perView === 2 ? "w-full sm:w-[calc(50%-6px)]" : "w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]")}
            >
              {s}
            </div>
          ))}
        </div>
        {showArrows && (
          <>
            <button type="button" aria-label="Previous slide" onClick={() => goTo(index - 1)} disabled={index <= 0} className={cx(arrow, "left-2")}>
              <ChevronLeft />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => goTo(index + 1)} disabled={index >= pages - 1} className={cx(arrow, "right-2")}>
              <ChevronRight />
            </button>
          </>
        )}
      </div>
      {showDots && pages > 1 && <StepperDots className="self-center" count={pages} current={Math.min(index, pages - 1)} onChange={goTo} />}
    </section>
  );
}
