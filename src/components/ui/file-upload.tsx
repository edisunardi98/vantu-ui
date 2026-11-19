"use client";

import { CloudUpload, Loader2, RotateCcw, Trash2, X } from "lucide-react";
import { DropZone, FileTrigger } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Button } from "./button";
import { LinkButton } from "./link-button";

export interface FileUploadAreaProps {
  onFiles: (files: File[]) => void;
  /** Accepted MIME types or extensions, e.g. ["application/pdf", ".csv"]. */
  accept?: string[];
  hint?: string;
  allowsMultiple?: boolean;
  className?: string;
}

/** Dashed drop area with a browse button. Drag files in or pick them. */
export function FileUploadArea({ onFiles, accept, hint = "CSV, XLSX or PDF, up to 50 MB.", allowsMultiple = true, className }: FileUploadAreaProps) {
  const take = async (items: { kind: string; getFile?: () => Promise<File> }[]) => {
    const files = await Promise.all(items.filter((i) => i.kind === "file" && i.getFile).map((i) => i.getFile!()));
    if (files.length) onFiles(files);
  };
  return (
    <DropZone
      aria-label="Upload files"
      onDrop={(e) => take(e.items as unknown as { kind: string; getFile?: () => Promise<File> }[])}
      className={cx(
        "flex flex-col items-center rounded-lg border border-dashed border-line-strong bg-surface px-6 py-8 text-center outline-none transition-colors",
        "data-drop-target:border-accent data-drop-target:bg-accent-soft data-focus-visible:shadow-focus",
        className,
      )}
    >
      <span className="flex size-10 items-center justify-center rounded-[10px] bg-surface text-fg-secondary shadow-button">
        <CloudUpload className="size-4.5" aria-hidden />
      </span>
      <p className="mt-4 text-base font-medium text-fg">Choose a file or drag &amp; drop it here.</p>
      <p className="mt-1 text-sm text-fg-muted">{hint}</p>
      <FileTrigger acceptedFileTypes={accept} allowsMultiple={allowsMultiple} onSelect={(list) => list && onFiles(Array.from(list))}>
        <Button size="sm" className="mt-4">
          Browse file
        </Button>
      </FileTrigger>
    </DropZone>
  );
}

export type FileItemStatus = "uploading" | "done" | "error";

export interface FileItemProps {
  name: string;
  /** Bytes. */
  size: number;
  status: FileItemStatus;
  /** 0–100 while uploading. */
  progress?: number;
  error?: string;
  onRemove?: () => void;
  onRetry?: () => void;
  className?: string;
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

const extColor: Record<string, string> = { pdf: "bg-error", csv: "bg-success", xlsx: "bg-success", xls: "bg-success", png: "bg-info", jpg: "bg-info", doc: "bg-info", docx: "bg-info" };

/** Uploaded file card: in progress · done · error with retry. */
export function FileItem({ name, size, status, progress = 0, error = "Upload failed", onRemove, onRetry, className }: FileItemProps) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return (
    <div className={cx("flex gap-3 rounded-md border bg-surface p-3.5", status === "error" ? "border-error-border" : "border-line", className)}>
      <span className="relative flex h-10 w-8 shrink-0 items-end justify-center rounded-[5px] border border-line bg-subtle pb-1">
        <span className={cx("rounded-[3px] px-1 text-[8px] font-bold uppercase leading-[12px] text-white", extColor[ext] ?? "bg-fg-muted")}>{ext.slice(0, 4) || "file"}</span>
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-medium text-fg">{name}</div>
            <div className="mt-0.5 flex items-center gap-1.5 text-sm text-fg-muted">
              <span className="tabular">
                {status === "uploading" ? `${formatBytes((size * progress) / 100)} of ${formatBytes(size)}` : formatBytes(size)}
              </span>
              <span aria-hidden>·</span>
              {status === "uploading" && (
                <span className="inline-flex items-center gap-1">
                  <Loader2 className="size-3 animate-spin text-accent" aria-hidden /> Uploading…
                </span>
              )}
              {status === "done" && <span className="text-success-text">Completed</span>}
              {status === "error" && <span className="text-error-text">{error}</span>}
            </div>
          </div>
          {onRemove && (
            <button
              type="button"
              aria-label={status === "uploading" ? `Cancel ${name}` : `Remove ${name}`}
              onClick={onRemove}
              className="inline-flex size-6 items-center justify-center rounded-xs text-fg-muted outline-none hover:bg-muted hover:text-fg focus-visible:shadow-focus"
            >
              {status === "uploading" ? <X className="size-3.5" /> : <Trash2 className="size-3.5" />}
            </button>
          )}
        </div>
        {status === "uploading" && (
          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-active" role="progressbar" aria-valuenow={progress} aria-valuemax={100} aria-label={`Uploading ${name}`}>
            <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${progress}%` }} />
          </div>
        )}
        {status === "error" && onRetry && (
          <LinkButton tone="error" size="sm" onPress={onRetry} leadingIcon={<RotateCcw />} className="mt-2">
            Try again
          </LinkButton>
        )}
      </div>
    </div>
  );
}
