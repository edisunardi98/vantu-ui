"use client";

import type { ReactNode } from "react";
import {
  Group,
  Input as AriaInput,
  TextField,
  type TextFieldProps,
} from "react-aria-components";
import { cx } from "@/utils/cx";
import { Description, ErrorMessage, Label, fieldBase } from "./field";

export interface InputProps extends Omit<TextFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  /** 16px icon rendered inside the field, before the text. */
  icon?: ReactNode;
  /** Content rendered at the end of the field, e.g. a <Kbd>. */
  trailing?: ReactNode;
  className?: string;
  inputClassName?: string;
}

export function Input({
  label,
  description,
  errorMessage,
  placeholder,
  icon,
  trailing,
  className,
  inputClassName,
  ...props
}: InputProps) {
  const hasAdornment = Boolean(icon || trailing);
  return (
    <TextField
      {...props}
      isInvalid={props.isInvalid ?? Boolean(errorMessage)}
      className={cx("flex flex-col gap-2", className)}
    >
      {label && <Label>{label}</Label>}
      {hasAdornment ? (
        <Group className={cx(fieldBase, "flex h-10 items-center gap-2 px-3 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-fg-muted")}>
          {icon}
          <AriaInput placeholder={placeholder} className={cx("h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-fg-muted", inputClassName)} />
          {trailing}
        </Group>
      ) : (
        <AriaInput placeholder={placeholder} className={cx(fieldBase, "h-10 px-3", inputClassName)} />
      )}
      {description && !errorMessage && <Description>{description}</Description>}
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </TextField>
  );
}
