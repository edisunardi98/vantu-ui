"use client";

import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

export default function Example() {
  return (
    <Accordion defaultExpandedKeys={["credits"]} className="w-full max-w-lg">
      <AccordionItem id="credits" icon={<Sparkles />} title="How are AI credits counted?">
        One credit per AI search and one per enriched contact. Re-running a saved search only counts new matches.
      </AccordionItem>
      <AccordionItem id="billing" icon={<CreditCard />} title="Can I change plans mid-cycle?">
        Yes. Upgrades apply immediately and are prorated; downgrades take effect at the next renewal.
      </AccordionItem>
      <AccordionItem id="security" icon={<ShieldCheck />} title="Where is my data stored?">
        In SOC 2 Type II certified data centers in the US or EU, depending on your workspace region.
      </AccordionItem>
    </Accordion>
  );
}
