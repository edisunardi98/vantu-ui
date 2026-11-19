import { Divider } from "@/components/ui/divider";

export default function Example() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Divider />
      <Divider label="or" />
      <Divider label="Older" align="start" dashed />
      <div className="flex h-8 items-center gap-4 text-base text-fg-secondary">
        Prospects <Divider orientation="vertical" /> Companies <Divider orientation="vertical" /> Lists
      </div>
    </div>
  );
}
