import { Plus, Send, Users } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { SequenceStep, type SequenceStepProps, SequenceWait } from "@/components/ui/sequence-step";

export interface SequenceFlowItem extends Omit<SequenceStepProps, "step" | "className"> {
  /** Wait shown on the connector before this step. */
  waitBefore?: string;
}

const Connector = () => <span aria-hidden className="mx-auto block h-4 w-px bg-line-strong" />;

/** A vertical flow, not a node graph: enrollment → step cards → wait pills on a 1px connector → add step. */
export function SequenceFlow({
  name = "Series B — VP Sales",
  description,
  enrollment = "128 prospects enrolled",
  steps,
  actions = <Button size="sm">Edit sequence</Button>,
  className,
}: {
  name?: ReactNode;
  /** Defaults to the step count. */
  description?: ReactNode;
  enrollment?: string;
  steps: SequenceFlowItem[];
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader
        icon={
          <IconTile tone="rose">
            <Send />
          </IconTile>
        }
        title={name}
        description={description ?? `${steps.length} steps · automatic`}
        actions={actions}
      />
      {/* Subtle panel so the white step cards stand out. */}
      <CardBody className="bg-subtle px-4 py-6">
    <ol className="mx-auto flex w-full max-w-xl flex-col">
      <li className="flex justify-center">
        <span className="inline-flex h-8 items-center gap-2 rounded-full bg-accent-soft px-3 text-sm font-medium text-accent-text">
          <Users aria-hidden className="size-3.5" /> {enrollment}
        </span>
      </li>
      {steps.map(({ waitBefore, ...step }, i) => (
        <Fragment key={i}>
          <li aria-hidden>
            <Connector />
          </li>
          {waitBefore && (
            <>
              <li className="flex justify-center">
                <SequenceWait>{waitBefore}</SequenceWait>
              </li>
              <li aria-hidden>
                <Connector />
              </li>
            </>
          )}
          <li>
            <SequenceStep step={i + 1} {...step} />
          </li>
        </Fragment>
      ))}
      <li aria-hidden>
        <Connector />
      </li>
      <li className="flex justify-center">
        <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-dashed border-line-strong bg-surface px-3 text-base text-fg-secondary outline-none hover:border-fg-disabled hover:text-fg focus-visible:shadow-focus">
          <Plus className="size-3.5" /> Add step
        </button>
      </li>
    </ol>
      </CardBody>
    </Card>
  );
}
