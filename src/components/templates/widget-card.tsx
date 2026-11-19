import type { ReactNode } from "react";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { cx } from "@/utils/cx";

type Tone = "accent" | "teal" | "rose" | "orange";

/**
 * Dashboard widget on the shared card pattern: layered shell, icon tile +
 * title header with an action, then a white content panel.
 */
export function WidgetCard({
  icon,
  tone = "accent",
  title,
  description,
  action,
  className,
  bodyClassName,
  children,
}: {
  /** A lucide icon; it is placed in an <IconTile>. */
  icon: ReactNode;
  tone?: Tone;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cx("min-w-0", className)}>
      <CardHeader icon={<IconTile tone={tone}>{icon}</IconTile>} title={title} description={description} actions={action} />
      <CardBody className={cx("p-4", bodyClassName)}>{children}</CardBody>
    </Card>
  );
}
