import { type CodeLang, highlight } from "@/lib/source";
import { cx } from "@/utils/cx";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps {
  code: string;
  lang?: CodeLang;
  /** File name shown in the header bar. */
  title?: string;
  className?: string;
  maxHeight?: boolean;
  /** Hide the built-in copy button (when a surrounding toolbar already has one). */
  hideCopy?: boolean;
  /** "shell": subtle frame with the title + copy on it and the code in a white inner panel. */
  variant?: "plain" | "shell";
  lineNumbers?: boolean;
}

export async function CodeBlock({ code, lang = "tsx", title, className, maxHeight, hideCopy, variant = "plain", lineNumbers }: CodeBlockProps) {
  const html = await highlight(code, lang);
  const body = (
    <div
      className={cx("code overflow-auto px-4 py-3.5 font-mono text-[13px] leading-[1.7]", lineNumbers && "code-lines", maxHeight && "max-h-[480px]")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );

  if (variant === "shell") {
    return (
      <div className={cx("rounded-[16px] border border-line bg-subtle p-1", className)}>
        <div className="flex h-10 items-center justify-between gap-3 pl-3 pr-1.5">
          <span className="truncate font-mono text-sm text-fg-muted">{title}</span>
          {!hideCopy && <CopyButton value={code} className="bg-transparent shadow-none hover:bg-active" />}
        </div>
        <div className="overflow-hidden rounded-[12px] border border-line bg-surface shadow-card">{body}</div>
      </div>
    );
  }

  return (
    <div className={cx("overflow-hidden rounded-md border border-line bg-subtle", className)}>
      {title && (
        <div className="flex h-10 items-center justify-between border-b border-line bg-surface pl-4 pr-2">
          <span className="font-mono text-sm text-fg-secondary">{title}</span>
          {!hideCopy && <CopyButton value={code} />}
        </div>
      )}
      <div className="relative">
        {!title && !hideCopy && <CopyButton value={code} className="absolute right-2 top-2 z-10" />}
        <div
          className={cx("code overflow-auto px-4 py-3.5 font-mono text-[13px] leading-[1.6]", maxHeight && "max-h-[480px]")}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
