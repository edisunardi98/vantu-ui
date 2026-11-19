import { Avatar, AvatarGroup, CompanyMark } from "@/components/ui/avatar";

export default function Example() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Avatar name="Jordan Blake" size="sm" />
        <Avatar name="Jordan Blake" size="md" />
        <Avatar name="Jordan Blake" size="lg" />
      </div>
      <div className="flex items-center gap-2">
        {(["blue", "green", "amber", "rose", "violet", "slate", "teal"] as const).map((c) => (
          <Avatar key={c} name="Sarah Chen" color={c} />
        ))}
      </div>
      <AvatarGroup names={["Sarah Chen", "Daniel Brooks", "Aisha Bello", "Oliver Grant", "Ryan Walsh", "Leah Moss"]} />
      <div className="flex items-center gap-3">
        <CompanyMark name="Ledgerly" size="sm" />
        <CompanyMark name="Ledgerly" size="md" />
        <CompanyMark name="Ledgerly" size="lg" />
        <CompanyMark name="Kinto" size="lg" color="#0f766e" />
      </div>
    </div>
  );
}
