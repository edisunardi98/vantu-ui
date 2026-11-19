import { BrandLockup, IntegrationMark, integrationIds } from "@/components/ui/integration-mark";

export default function Example() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-3 items-center gap-x-8 gap-y-4">
        <BrandLockup size="lg" />
        <BrandLockup size="lg" variant="wordmark" />
        <BrandLockup size="lg" variant="mark" />
        <BrandLockup size="sm" />
        <BrandLockup size="sm" variant="wordmark" />
        <BrandLockup size="sm" variant="mark" />
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {integrationIds.map((id) => (
          <IntegrationMark key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
