"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardFooter, CardHeader, IconTile } from "@/components/ui/card";

export default function Example() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader
        icon={<IconTile><Sparkles /></IconTile>}
        title="AI recommended prospects"
        description="Ranked by ICP fit · refreshed 7:00 AM"
        actions={<Button size="sm" trailingIcon={<ArrowRight />}>View all</Button>}
      />
      <CardBody className="p-4 text-fg-secondary">Inner white panel for the card’s content.</CardBody>
      <CardFooter>38 new matches since yesterday</CardFooter>
    </Card>
  );
}
