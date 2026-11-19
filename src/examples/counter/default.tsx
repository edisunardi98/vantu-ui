import { Counter } from "@/components/ui/counter";

export default function Example() {
  return (
    <div className="flex items-center gap-3">
      <Counter>12</Counter>
      <Counter tone="accent">12</Counter>
      <Counter tone="alert">12</Counter>
    </div>
  );
}
