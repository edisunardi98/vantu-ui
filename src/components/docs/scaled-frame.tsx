"use client";

import { useEffect, useRef, useState } from "react";

/** Renders a page in an iframe at a fixed desktop width, scaled to fit its container. */
export function ScaledFrame({ src, title, width = 1440, height = 900 }: { src: string; title: string; width?: number; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry!.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: scale ? height * scale : undefined, aspectRatio: scale ? undefined : `${width}/${height}` }}>
      {scale > 0 && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{ width, height, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}
