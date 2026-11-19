import { cx } from "@/utils/cx";

const tones = { accent: "var(--color-accent)", success: "var(--color-success)", warning: "var(--color-warning)", error: "var(--color-error)" };

export interface CircularProgressProps {
  value: number;
  max?: number;
  /** Diameter in px (48–80 in the design). */
  size?: number;
  /** Ring thickness in px. */
  thickness?: number;
  tone?: keyof typeof tones;
  /** Center label. Defaults to the percentage; `false` hides it. */
  label?: React.ReactNode | false;
  "aria-label"?: string;
  className?: string;
}

/** Ring progress for completion and quota widgets. */
export function CircularProgress({ value, max = 100, size = 56, thickness = 5, tone = "accent", label, className, ...props }: CircularProgressProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-label={props["aria-label"] ?? "Progress"}
      className={cx("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-active)" strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tones[tone]}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      {label !== false && (
        <span className="absolute text-sm font-semibold tabular text-fg" style={{ fontSize: Math.max(10, size / 5) }}>
          {label ?? `${Math.round(pct * 100)}%`}
        </span>
      )}
    </div>
  );
}

export interface GaugeProps {
  value: number;
  max: number;
  /** Caption under the number, e.g. "out of 20". */
  caption?: string;
  /** Width in px; height is half. */
  width?: number;
  className?: string;
}

/** Semicircle gauge with a big number — for balances and quotas (e.g. "10 out of 20"). */
export function Gauge({ value, max, caption, width = 200, className }: GaugeProps) {
  const thickness = width * 0.16;
  const r = (width - thickness) / 2;
  const half = Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const h = width / 2 + thickness / 2;
  const arc = `M ${thickness / 2} ${width / 2} A ${r} ${r} 0 0 1 ${width - thickness / 2} ${width / 2}`;
  return (
    <div role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={caption ?? "Gauge"} className={cx("relative inline-block", className)} style={{ width, height: h }}>
      <svg width={width} height={h} aria-hidden>
        <path d={arc} fill="none" stroke="var(--color-active)" strokeWidth={thickness} />
        <path
          d={arc}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={thickness}
          strokeDasharray={half}
          strokeDashoffset={half * (1 - pct)}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="text-metric text-fg">{value}</span>
        {caption && <span className="mt-1 text-label text-[10px] text-fg-muted">{caption}</span>}
      </div>
    </div>
  );
}
