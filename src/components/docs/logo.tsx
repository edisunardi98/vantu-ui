import Link from "next/link";
import { VantuMark } from "./vantu-mark";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-sm text-lg font-semibold tracking-tight text-fg outline-none focus-visible:shadow-focus">
      <VantuMark className="size-7 rounded-[8px] shadow-button-primary" />
      Vantu<span className="font-normal text-fg-muted">UI</span>
    </Link>
  );
}
