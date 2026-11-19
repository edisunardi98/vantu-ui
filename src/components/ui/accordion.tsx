"use client";

import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button as AriaButton,
  Disclosure,
  DisclosureGroup,
  type DisclosureGroupProps,
  DisclosurePanel,
  Heading,
} from "react-aria-components";
import { cx } from "@/utils/cx";

export function Accordion({ className, ...props }: Omit<DisclosureGroupProps, "className"> & { className?: string }) {
  return <DisclosureGroup {...props} className={cx("flex flex-col gap-2", className)} />;
}

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Row with a +/× toggle. The open item becomes a white raised card. */
export function AccordionItem({ id, title, icon, children, className }: AccordionItemProps) {
  return (
    <Disclosure
      id={id}
      className={cx(
        "group rounded-md bg-subtle ring-1 ring-inset ring-line transition-[background,box-shadow]",
        "hover:bg-muted data-expanded:bg-surface data-expanded:shadow-card data-expanded:hover:bg-surface",
        className,
      )}
    >
      <Heading>
        <AriaButton
          slot="trigger"
          className="flex w-full cursor-default items-center gap-3 rounded-md px-4 py-3.5 text-left text-base font-medium text-fg outline-none data-focus-visible:shadow-focus [&_svg]:size-4"
        >
          {icon && <span className="text-fg-secondary">{icon}</span>}
          <span className="flex-1">{title}</span>
          <Plus aria-hidden className="text-fg-muted transition-transform duration-200 group-data-expanded:rotate-45" />
        </AriaButton>
      </Heading>
      {/* Padding only while open: a closed panel stays in the DOM (hidden="until-found", so find-in-page works) and would otherwise keep its bottom padding. */}
      <DisclosurePanel className="px-4 text-base text-fg-secondary group-data-expanded:-mt-1 group-data-expanded:pb-4">{children}</DisclosurePanel>
    </Disclosure>
  );
}
