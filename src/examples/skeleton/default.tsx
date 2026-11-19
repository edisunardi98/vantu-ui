import { Skeleton } from "@/components/ui/skeleton";

export default function Example() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-md border border-line bg-surface">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="flex items-center gap-3 border-b border-line-subtle px-4 py-3 last:border-0">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-2.5 w-48" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}
