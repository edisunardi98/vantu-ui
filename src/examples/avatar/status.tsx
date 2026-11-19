import { Avatar } from "@/components/ui/avatar";

export default function Example() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end gap-4">
        <Avatar name="Sarah Chen" size="xs" status="online" />
        <Avatar name="Sarah Chen" size="sm" status="online" />
        <Avatar name="Sarah Chen" size="md" status="away" />
        <Avatar name="Sarah Chen" size="lg" status="busy" />
        <Avatar name="Sarah Chen" size="xl" status="offline" />
        <Avatar name="Sarah Chen" size="2xl" status="online" />
      </div>
      <div className="flex items-end gap-4">
        <Avatar name="Jordan Blake" size="md" verified />
        <Avatar name="Jordan Blake" size="lg" verified />
        <Avatar name="Jordan Blake" size="xl" verified status="online" />
      </div>
    </div>
  );
}
