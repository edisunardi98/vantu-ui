"use client";

import { CalendarCheck, ChevronDown, Eye, EyeOff, Globe, Lock, Mail, Sparkles, Target, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, IconTile } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Gauge } from "@/components/ui/circular-progress";
import { BrandLockup, GoogleGlyph, MicrosoftGlyph } from "@/components/ui/integration-mark";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/ui/link-button";
import { ScoreMeter } from "@/components/ui/score-meter";
import { StepperDots } from "@/components/ui/step-indicator";

function LinkedInGlyph() {
  return (
    <span aria-hidden className="flex size-4 items-center justify-center rounded-[3px] bg-[#0a66c2] text-[9px] font-bold leading-none text-white">
      in
    </span>
  );
}

const slides = [
  {
    title: "Hit your meetings goal",
    text: "Track meetings booked against your monthly goal and see which deals are still pending.",
    widget: (
      <Card className="w-80 shadow-popover">
        <CardHeader
          icon={
            <IconTile>
              <Target />
            </IconTile>
          }
          title="Meetings goal"
          description="September"
          actions={<Button size="2xs">See all</Button>}
        />
        <CardBody>
        <div className="flex justify-center py-4">
          <Gauge value={14} max={20} caption="out of 20" width={170} />
        </div>
        <ul className="divide-y divide-line-subtle border-t border-line-subtle px-4">
          {[
            ["Sep 15", "Ledgerly", "Booked", "success"],
            ["Sep 17", "Northpeak", "Pending", "warning"],
          ].map(([d, c, s, t]) => (
            <li key={c} className="flex items-center gap-2 py-2.5 text-sm">
              <CalendarCheck className="size-3.5 text-fg-muted" /> {d} <span className="flex-1 text-fg-muted">({c})</span>
              <Badge size="sm" tone={t as "success" | "warning"}>
                {s}
              </Badge>
            </li>
          ))}
        </ul>
        </CardBody>
      </Card>
    ),
  },
  {
    title: "Know who to call first",
    text: "AI scores every prospect against your ideal customer profile and fresh buying signals.",
    widget: (
      <Card className="w-80 shadow-popover">
        <CardHeader
          icon={
            <IconTile tone="teal">
              <Sparkles />
            </IconTile>
          }
          title="Top prospects"
          description="Ranked by AI score"
        />
        <CardBody className="p-1.5">
        {[
          ["Sarah Chen", "VP Sales · Ledgerly", 92],
          ["Daniel Brooks", "CRO · Verdant Cloud", 90],
          ["Oliver Grant", "Head of Revenue · Parcelio", 74],
        ].map(([n, r, s]) => (
          <div key={n as string} className="flex items-center gap-3 rounded-md px-2.5 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="truncate text-base font-medium text-fg">{n}</div>
              <div className="truncate text-sm text-fg-muted">{r}</div>
            </div>
            <ScoreMeter score={s as number} />
          </div>
        ))}
        </CardBody>
      </Card>
    ),
  },
];

export interface AuthSplitProps {
  mode?: "sign-in" | "register";
}

/** Split auth screen: form on the left, a rotating product showcase on the right. */
export function AuthSplit({ mode = "sign-in" }: AuthSplitProps) {
  const [slide, setSlide] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const register = mode === "register";

  return (
    <div className="grid min-h-dvh bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="flex flex-col px-6 py-6 sm:px-10">
        <header className="flex items-center justify-between">
          <BrandLockup size="sm" variant="mark" />
          <div className="flex items-center gap-3 text-base text-fg-secondary">
            <span className="hidden sm:inline">{register ? "Already have an account?" : "Don’t have an account?"}</span>
            <Button size="xs">{register ? "Sign in" : "Register"}</Button>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[392px] flex-1 flex-col justify-center py-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-linear-to-b from-subtle to-surface shadow-[0_0_0_1px_var(--color-line-subtle)]">
            <span className="flex size-11 items-center justify-center rounded-full bg-surface text-fg-secondary shadow-button">
              <User className="size-5" />
            </span>
          </span>
          <h1 className="mt-5 text-center text-2xl font-semibold tracking-tight text-fg">{register ? "Create a new account" : "Sign in to your account"}</h1>
          <p className="mt-1.5 text-center text-base text-fg-secondary">{register ? "Enter your details to register." : "Enter your details to sign in."}</p>

          <div className="mt-7 grid grid-cols-3 gap-3">
            <Button aria-label="Continue with Google" iconOnly className="w-full">
              <GoogleGlyph />
            </Button>
            <Button aria-label="Continue with Microsoft" iconOnly className="w-full">
              <MicrosoftGlyph />
            </Button>
            <Button aria-label="Continue with LinkedIn" iconOnly className="w-full">
              <LinkedInGlyph />
            </Button>
          </div>
          <div className="my-6 flex items-center gap-3 text-label text-[10px] text-fg-muted">
            <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
          </div>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {register && <Input label="Full name" placeholder="Jordan Blake" icon={<User />} isRequired />}
            <Input label="Work email" type="email" placeholder="you@company.com" icon={<Mail />} isRequired />
            <Input
              label="Password"
              type={show ? "text" : "password"}
              placeholder="••••••••••"
              icon={<Lock />}
              isRequired
              trailing={
                <button type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow((s) => !s)} className="text-fg-muted outline-none hover:text-fg focus-visible:shadow-focus [&_svg]:size-4">
                  {show ? <EyeOff /> : <Eye />}
                </button>
              }
            />
            <div className="flex items-center justify-between">
              <Checkbox>{register ? "I agree to the Terms" : "Keep me signed in"}</Checkbox>
              {!register && (
                <LinkButton tone="black" size="sm" underline>
                  Forgot password?
                </LinkButton>
              )}
            </div>
            <Button type="submit" variant="primary" className="mt-1 w-full">
              {register ? "Get started" : "Sign in"}
            </Button>
          </form>
        </main>

        <footer className="flex items-center justify-between text-sm text-fg-muted">
          <span>© 2026 Vantu</span>
          <button type="button" className="inline-flex items-center gap-1.5 rounded-xs outline-none hover:text-fg focus-visible:shadow-focus">
            <Globe className="size-3.5" /> ENG <ChevronDown className="size-3.5" />
          </button>
        </footer>
      </div>

      <aside aria-label="Product highlights" className="relative m-2 hidden flex-col items-center justify-center overflow-hidden rounded-[20px] bg-app lg:flex">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line-subtle)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="relative flex h-80 items-center">{slides[slide]!.widget}</div>
        <div className="relative mt-12 max-w-md px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">{slides[slide]!.title}</h2>
          <p className="mt-2 text-base text-fg-secondary">{slides[slide]!.text}</p>
        </div>
        <StepperDots className="relative mt-10" count={slides.length} current={slide} onChange={setSlide} />
      </aside>
    </div>
  );
}
