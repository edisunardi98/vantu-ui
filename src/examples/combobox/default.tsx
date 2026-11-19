"use client";

import { Building2 } from "lucide-react";
import { Combobox, ComboboxItem } from "@/components/ui/combobox";

const companies = ["Ledgerly", "Northpeak", "Verdant Cloud", "Fathom Data", "Brightlane", "Tidewater Analytics", "Stackwise", "Relaywork", "Parcelio", "Plinth"];

export default function Example() {
  return (
    <Combobox label="Company" placeholder="Search companies…" icon={<Building2 />} className="w-full max-w-72">
      {companies.map((c) => (
        <ComboboxItem key={c} id={c}>
          {c}
        </ComboboxItem>
      ))}
    </Combobox>
  );
}
