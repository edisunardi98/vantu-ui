"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button as AriaButton,
  Dialog,
  DialogTrigger,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";

export { DialogTrigger };

export interface ModalProps extends Omit<ModalOverlayProps, "children" | "className"> {
  title: string;
  description?: string;
  /** Footer content, typically secondary + primary buttons. Receives `close`. */
  footer?: (close: () => void) => ReactNode;
  /** Left side of the footer, e.g. "128 prospects selected". */
  footerNote?: ReactNode;
  /** `modal` is 560px centered; `drawer` is 480px full-height docked right. */
  variant?: "modal" | "drawer";
  children?: ReactNode;
}

/** Shared header/footer parts for dialogs and drawers. */
export function Modal({ title, description, footer, footerNote, variant = "modal", children, ...props }: ModalProps) {
  const drawer = variant === "drawer";
  return (
    <ModalOverlay
      {...props}
      isDismissable
      className={cx(
        "fixed inset-0 z-50 flex bg-inverse/30 backdrop-blur-[1px]",
        drawer ? "justify-end" : "items-center justify-center p-4",
      )}
    >
      <AriaModal
        className={cx(
          "flex flex-col bg-surface shadow-popover outline-none",
          drawer ? "h-full w-full max-w-[480px]" : "max-h-[85vh] w-full max-w-[560px] rounded-lg",
        )}
      >
        <Dialog className="flex min-h-0 flex-1 flex-col outline-none">
          {({ close }) => (
            <>
              <header className="flex items-start gap-3 border-b border-line px-5 py-4">
                <div className="min-w-0 flex-1">
                  <Heading slot="title" className="text-lg font-medium text-fg">
                    {title}
                  </Heading>
                  {description && <p className="mt-0.5 text-sm text-fg-muted">{description}</p>}
                </div>
                <AriaButton
                  aria-label="Close"
                  onPress={close}
                  className="inline-flex size-8 items-center justify-center rounded-sm text-fg-muted shadow-button outline-none data-hovered:bg-subtle data-hovered:text-fg data-focus-visible:shadow-focus"
                >
                  <X className="size-4" />
                </AriaButton>
              </header>
              <div className="min-h-0 flex-1 overflow-auto px-5 py-4">{children}</div>
              {footer && (
                <footer className="flex items-center gap-3 border-t border-line bg-subtle px-5 py-3 [border-bottom-left-radius:inherit] [border-bottom-right-radius:inherit]">
                  <div className="flex-1 text-sm text-fg-muted">{footerNote}</div>
                  {footer(close)}
                </footer>
              )}
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}
