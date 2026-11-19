import { Home, Inbox, Send, Users } from "lucide-react";
import { NavItem, SectionLabel } from "@/components/ui/nav-item";

export default function Example() {
  return (
    <nav className="w-64 rounded-lg bg-app p-3">
      <NavItem icon={<Home />} label="Home" active />
      <NavItem icon={<Users />} label="Prospects" count={12486} />
      <SectionLabel>Outreach</SectionLabel>
      <NavItem icon={<Send />} label="Sequences" count={9} />
      <NavItem icon={<Inbox />} label="Inbox" badge={12} />
    </nav>
  );
}
