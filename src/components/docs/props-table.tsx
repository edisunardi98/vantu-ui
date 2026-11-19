import type { PropDef } from "@/lib/registry";

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full min-w-[560px] text-left text-base">
        <thead className="bg-subtle text-sm text-fg-muted">
          <tr className="h-10 border-b border-line">
            <th className="px-4 font-medium">Prop</th>
            <th className="px-4 font-medium">Type</th>
            <th className="px-4 font-medium">Default</th>
            <th className="px-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b border-line-subtle align-top last:border-0">
              <td className="px-4 py-3 font-mono text-[13px] font-medium text-accent-text">{p.name}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-fg-secondary">{p.type}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-fg-muted">{p.default ?? "—"}</td>
              <td className="px-4 py-3 text-fg-secondary">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
