"use client";

import { TextArea as AriaTextArea, TextField, type TextFieldProps } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Description, ErrorMessage, Label, fieldBase } from "./field";

export interface TextareaProps extends Omit<TextFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

/** Multiline field — 14 Regular at 140% line height, min height 96. */
export function Textarea({ label, description, errorMessage, placeholder, rows = 4, className, ...props }: TextareaProps) {
  return (
    <TextField {...props} isInvalid={props.isInvalid ?? Boolean(errorMessage)} className={cx("flex flex-col gap-2", className)}>
      {label && <Label>{label}</Label>}
      <AriaTextArea placeholder={placeholder} rows={rows} className={cx(fieldBase, "min-h-24 resize-y px-3 py-2.5 leading-[1.4]")} />
      {description && !errorMessage && <Description>{description}</Description>}
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </TextField>
  );
}
