"use client";

import { ArrowLeft, Briefcase, Building, Check, ChevronDown, Globe, Mail, PartyPopper, Rocket, Target, User, UserCog, Users, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChoiceCard, ChoiceCardGroup } from "@/components/ui/choice-card";
import { BrandLockup } from "@/components/ui/integration-mark";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { StepIndicator } from "@/components/ui/step-indicator";

const steps = [{ label: "Personal" }, { label: "Role" }, { label: "Team" }, { label: "Goal" }, { label: "Summary" }];

function StepHeader({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-linear-to-b from-subtle to-surface shadow-[0_0_0_1px_var(--color-line-subtle)]">
        <span className="flex size-11 items-center justify-center rounded-full bg-surface text-fg-secondary shadow-button [&_svg]:size-5">{icon}</span>
      </span>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-fg">{title}</h1>
      <p className="mt-1.5 text-base text-fg-secondary">{text}</p>
    </div>
  );
}

/** Multi-step onboarding: header step indicator, centered step content with choice cards. */
export function Onboarding() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("ae");
  const [team, setTeam] = useState("6-20");
  const [goal, setGoal] = useState("meetings");
  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const content: Record<number, ReactNode> = {
    0: (
      <>
        <StepHeader icon={<User />} title="Personal information" text="Tell us a little about yourself." />
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First name" defaultValue="Jordan" />
            <Input label="Last name" defaultValue="Blake" />
          </div>
          <Input label="Work email" defaultValue="jordan@vantu.dev" icon={<Mail />} />
        </div>
      </>
    ),
    1: (
      <>
        <StepHeader icon={<UserCog />} title="Role selection" text="Choose your role within Vantu." />
        <ChoiceCardGroup aria-label="Role" value={role} onChange={setRole}>
          <ChoiceCard value="ae" icon={<Briefcase />} title="I’m an Account Executive" description="Work deals, run sequences and book meetings." />
          <ChoiceCard value="sdr" icon={<Target />} title="I’m an SDR / BDR" description="Prospect, qualify and hand over hot leads." />
          <ChoiceCard value="leader" icon={<Users />} title="I lead a sales team" description="Set goals, review pipeline and coach reps." />
        </ChoiceCardGroup>
      </>
    ),
    2: (
      <>
        <StepHeader icon={<Building />} title="Team size" text="How many people sell with you?" />
        <ChoiceCardGroup aria-label="Team size" value={team} onChange={setTeam} columns={2}>
          {["Just me", "2–5", "6–20", "20+"].map((t) => (
            <ChoiceCard key={t} value={t.replace("–", "-")} title={t} description={t === "Just me" ? "Solo seller" : "people"} />
          ))}
        </ChoiceCardGroup>
        <Select label="Region" defaultSelectedKey="na">
          <SelectItem id="na">North America</SelectItem>
          <SelectItem id="emea">EMEA</SelectItem>
          <SelectItem id="apac">APAC</SelectItem>
        </Select>
      </>
    ),
    3: (
      <>
        <StepHeader icon={<Rocket />} title="Your main goal" text="We’ll tune your dashboard around it." />
        <ChoiceCardGroup aria-label="Goal" value={goal} onChange={setGoal}>
          <ChoiceCard value="meetings" icon={<Target />} title="Book more meetings" description="Prioritise reply rate and calendar slots." />
          <ChoiceCard value="pipeline" icon={<Rocket />} title="Build pipeline" description="Find and enrich more qualified prospects." />
          <ChoiceCard value="close" icon={<Check />} title="Close faster" description="Track deal stages and next steps." />
        </ChoiceCardGroup>
      </>
    ),
    4: (
      <>
        <StepHeader icon={<PartyPopper />} title="You’re all set" text="Your workspace is ready. Here’s what we set up." />
        <ul className="divide-y divide-line rounded-lg border border-line bg-subtle p-1 [&>li]:bg-surface [&>li:first-child]:rounded-t-[12px] [&>li:last-child]:rounded-b-[12px] [&>li]:border-x [&>li]:border-line [&>li:first-child]:border-t [&>li:last-child]:border-b">
          {[
            ["Role", { ae: "Account Executive", sdr: "SDR / BDR", leader: "Sales leader" }[role]],
            ["Team size", team],
            ["Goal", { meetings: "Book more meetings", pipeline: "Build pipeline", close: "Close faster" }[goal]],
          ].map(([k, v]) => (
            <li key={k} className="flex justify-between px-4 py-3 text-base">
              <span className="text-fg-secondary">{k}</span>
              <span className="font-medium text-fg">{v}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  };

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <header className="flex h-[72px] items-center gap-6 border-b border-line px-6 sm:px-10">
        <BrandLockup size="sm" variant="mark" />
        <StepIndicator steps={steps} current={step} className="mx-auto hidden md:flex" />
        <span className="mx-auto text-sm text-fg-secondary md:hidden">
          Step {step + 1} of {steps.length}
        </span>
        <button type="button" aria-label="Close onboarding" className="inline-flex size-8 items-center justify-center rounded-sm text-fg-muted outline-none hover:bg-muted hover:text-fg focus-visible:shadow-focus">
          <X className="size-4" />
        </button>
      </header>

      <main className="relative flex-1 px-6 py-10 sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(to_right,var(--color-line-subtle)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        {step > 0 && (
          <Button size="xs" leadingIcon={<ArrowLeft />} onPress={back} className="relative">
            Back
          </Button>
        )}
        <div className="relative mx-auto flex w-full max-w-[440px] flex-col gap-6 pt-4">
          {content[step]}
          <Button variant="primary" className="w-full" onPress={next}>
            {step === steps.length - 1 ? "Go to dashboard" : "Continue"}
          </Button>
        </div>
      </main>

      <footer className="flex items-center justify-between px-6 py-5 text-sm text-fg-muted sm:px-10">
        <span>© 2026 Vantu</span>
        <span className="inline-flex items-center gap-1.5">
          <Globe className="size-3.5" /> ENG <ChevronDown className="size-3.5" />
        </span>
      </footer>
    </div>
  );
}
