import { Spinner } from "@/components/ui/spinner";

export default function Example() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="md" tone="neutral" />
      <span className="flex size-12 items-center justify-center rounded-md bg-accent">
        <Spinner size="md" tone="white" />
      </span>
    </div>
  );
}
