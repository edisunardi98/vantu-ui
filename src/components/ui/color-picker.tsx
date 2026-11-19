"use client";

import {
  Button as AriaButton,
  type Color,
  ColorArea,
  ColorField,
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  Dialog,
  DialogTrigger,
  Input,
  Label,
  Popover,
  SliderTrack,
} from "react-aria-components";
import { cx } from "@/utils/cx";

export interface ColorPickerProps extends Omit<AriaColorPickerProps, "children"> {
  label?: string;
  /** Preset swatches shown under the picker. */
  presets?: string[];
  className?: string;
}

const thumb = "size-5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.15),0_1px_3px_rgb(0_0_0/0.25)] data-focus-visible:size-6";

const defaultPresets = ["#635BFF", "#3B82F6", "#22A06B", "#D98B24", "#D64545", "#222224", "#14B8A6", "#EC4899"];

/** Swatch trigger that opens a saturation area, hue slider, hex field and presets. */
export function ColorPicker({ label, presets = defaultPresets, className, ...props }: ColorPickerProps) {
  return (
    <AriaColorPicker {...props}>
      <DialogTrigger>
        <AriaButton
          className={cx(
            "inline-flex h-10 cursor-default items-center gap-2.5 rounded-md bg-surface pl-1.5 pr-3 text-base text-fg shadow-button outline-none data-hovered:bg-subtle data-focus-visible:shadow-focus",
            className,
          )}
        >
          <ColorSwatch className="size-7 rounded-sm shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]" />
          {label && <span className="font-medium">{label}</span>}
          <SwatchValue />
        </AriaButton>
        <Popover offset={8} placement="bottom start" className="rounded-md bg-surface p-3 shadow-popover outline-none">
          <Dialog aria-label={label ?? "Color picker"} className="flex w-56 flex-col gap-3 outline-none">
            <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" className="h-40 w-full rounded-sm">
              <ColorThumb className={thumb} />
            </ColorArea>
            <ColorSlider colorSpace="hsb" channel="hue">
              <SliderTrack className="h-3 w-full rounded-full">
                <ColorThumb className={cx(thumb, "top-1/2")} />
              </SliderTrack>
            </ColorSlider>
            <ColorField className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-fg">Hex</Label>
              <Input className="h-9 rounded-sm border border-line-strong px-2.5 font-mono text-sm uppercase outline-none focus:border-accent focus:shadow-focus" />
            </ColorField>
            <ColorSwatchPicker className="flex flex-wrap gap-1.5">
              {presets.map((c) => (
                <ColorSwatchPickerItem key={c} color={c} className="rounded-[6px] outline-none data-focus-visible:shadow-focus data-selected:shadow-[0_0_0_2px_var(--color-surface),0_0_0_4px_var(--color-fg)]">
                  <ColorSwatch className="size-6 rounded-[6px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]" />
                </ColorSwatchPickerItem>
              ))}
            </ColorSwatchPicker>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </AriaColorPicker>
  );
}

function SwatchValue() {
  return (
    <ColorField aria-label="Hex value" isReadOnly className="contents">
      <Input className="w-[72px] cursor-default bg-transparent font-mono text-sm uppercase text-fg-secondary outline-none" tabIndex={-1} />
    </ColorField>
  );
}

export type { Color };
