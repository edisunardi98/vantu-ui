import { cx } from "@/utils/cx";

export type AvatarColor = "blue" | "green" | "amber" | "rose" | "violet" | "slate" | "teal";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

const colors: Record<AvatarColor, string> = {
  blue: "bg-avatar-blue-bg text-avatar-blue-fg",
  green: "bg-avatar-green-bg text-avatar-green-fg",
  amber: "bg-avatar-amber-bg text-avatar-amber-fg",
  rose: "bg-avatar-rose-bg text-avatar-rose-fg",
  violet: "bg-avatar-violet-bg text-avatar-violet-fg",
  slate: "bg-avatar-slate-bg text-avatar-slate-fg",
  teal: "bg-avatar-teal-bg text-avatar-teal-fg",
};

// size/avatar-sm|md|lg — 24 in tables, 32 in lists, 40 in headers.
const sizes: Record<AvatarSize, string> = {
  xs: "size-5 text-[8px]",
  sm: "size-6 text-[9px]",
  md: "size-8 text-xs",
  lg: "size-10 text-base",
  xl: "size-12 text-lg",
  "2xl": "size-14 text-xl",
};

// Indicator diameter scales with the avatar.
const indicator: Record<AvatarSize, string> = {
  xs: "size-1.5 ring-1",
  sm: "size-2 ring-[1.5px]",
  md: "size-2.5 ring-2",
  lg: "size-3 ring-2",
  xl: "size-3.5 ring-2",
  "2xl": "size-4 ring-[2.5px]",
};

const statusColor: Record<AvatarStatus, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-error",
  offline: "bg-fg-disabled",
};

const palette = Object.keys(colors) as AvatarColor[];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

/** Stable color per name, so the same person always gets the same tint. */
function colorFor(name: string): AvatarColor {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length]!;
}

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  /** Presence dot, bottom-right. */
  status?: AvatarStatus;
  /** Verified check, top-right. */
  verified?: boolean;
  className?: string;
}

/** People are circular initials on a soft tint, or a photo. Optional presence and verified marks. */
export function Avatar({ name, src, size = "md", color, status, verified, className }: AvatarProps) {
  const face = (
    <span
      title={name}
      className={cx(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        sizes[size],
        !src && colors[color ?? colorFor(name)],
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span aria-hidden>{initialsOf(name)}</span>
      )}
    </span>
  );
  if (!status && !verified) return face;
  return (
    <span className="relative inline-flex shrink-0">
      {face}
      {status && (
        <span
          role="img"
          aria-label={status}
          className={cx("absolute bottom-0 right-0 rounded-full ring-surface", indicator[size], statusColor[status])}
        />
      )}
      {verified && (
        <span role="img" aria-label="Verified" className={cx("absolute -right-0.5 -top-0.5 flex items-center justify-center rounded-full bg-accent text-white ring-surface", indicator[size])}>
          <svg viewBox="0 0 12 12" className="size-[70%]" aria-hidden>
            <path d="M3 6.2 5 8l4-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </span>
  );
}

export function AvatarGroup({ names, size = "sm", max = 4 }: { names: string[]; size?: AvatarSize; max?: number }) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  return (
    <div className="flex -space-x-1.5">
      {shown.map((n) => (
        <Avatar key={n} name={n} size={size} className="ring-2 ring-surface" />
      ))}
      {rest > 0 && (
        <span className={cx("inline-flex items-center justify-center rounded-full bg-muted font-medium text-fg-secondary ring-2 ring-surface", sizes[size])}>
          +{rest}
        </span>
      )}
    </div>
  );
}

export interface CompanyMarkProps {
  name: string;
  size?: AvatarSize;
  /** Brand color for the square mark. Defaults to inverse. */
  color?: string;
  className?: string;
}

/** Companies are square marks with a brand color. */
export function CompanyMark({ name, size = "md", color, className }: CompanyMarkProps) {
  return (
    <span
      title={name}
      style={color ? { backgroundColor: color } : undefined}
      className={cx(
        "inline-flex shrink-0 items-center justify-center bg-inverse font-semibold text-fg-inverse",
        size === "xs" || size === "sm" ? "size-6 rounded-[6px] text-[10px]" : size === "md" ? "size-8 rounded-sm text-sm" : "size-10 rounded-[10px] text-base",
        className,
      )}
    >
      <span aria-hidden>{name[0]?.toUpperCase()}</span>
    </span>
  );
}
