"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sidebar, type SidebarItem } from "./components/Sidebar";
import { Section } from "./components/Section";
import { ColorSwatch, GradientSwatch } from "./components/ColorSwatch";
import { colorFamilies, gradients } from "./data/colors";
import { displayType, bodyType, monoType } from "./data/typography";

// ---- Sidebar nav items ----

const NAV_ITEMS: SidebarItem[] = [
  { id: "philosophy", label: "Philosophy", number: "01" },
  { id: "logo", label: "Logo", number: "02" },
  { id: "color", label: "Color", number: "03" },
  { id: "typography", label: "Typography", number: "04" },
  { id: "grid", label: "Grid & Layout", number: "05" },
  { id: "motion", label: "Motion", number: "06" },
  { id: "usage", label: "Usage Rules", number: "07" },
  { id: "resources", label: "Resources", number: "08" },
];

// ---- Logo data ----

const LOGOS = [
  { src: "/logos/torque-logo-typo.svg", label: "Primary Lockup", bg: "bg-white", cls: "" },
  { src: "/logos/torque-logo-typo.svg", label: "Inverted", bg: "bg-[#08090A]", cls: "brightness-0 invert" },
  { src: "/logos/torque-typo.svg", label: "Wordmark", bg: "bg-white", cls: "" },
  { src: "/logos/torque-typo.svg", label: "Wordmark Inverted", bg: "bg-[#08090A]", cls: "brightness-0 invert" },
  { src: "/logos/torque-symbol-new.svg", label: "Symbol", bg: "bg-white", cls: "" },
  { src: "/logos/torque-symbol-new.svg", label: "Symbol Inverted", bg: "bg-[#08090A]", cls: "brightness-0 invert" },
];

// ---- Page ----

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5">
        <div className="flex items-center justify-between h-[57px] px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-black/70 hover:text-black transition-colors"
          >
            <Image
              src="/logos/torque-symbol-new.svg"
              alt="Torque"
              width={24}
              height={24}
              className="w-5 h-5"
            />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.15em]">
              Torque Design
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-black/30 hover:text-black/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to site</span>
          </Link>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar items={NAV_ITEMS} />

      {/* Main content */}
      <main className="lg:ml-[240px] pt-[57px] lg:pt-[57px]">
        {/* Mobile has extra top padding for the section nav bar */}
        <div className="lg:hidden h-12" />

        {/* 01 — Philosophy */}
        <Section
          id="philosophy"
          number="01"
          title="Philosophy"
          dark
        >
          <div className="mb-16">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-white/90 max-w-3xl">
              Torque is built to express momentum, precision, and programmable power.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Clarity",
                desc: "Every element serves a purpose. We remove noise so the product speaks for itself. Clean interfaces, precise data, zero ambiguity.",
              },
              {
                title: "Precision",
                desc: "Built for onchain economies where every decimal matters. Our design language reflects the exactness of programmable systems.",
              },
              {
                title: "Momentum",
                desc: "Growth is kinetic. Our visual language conveys motion and progress — from easing curves to data visualizations that trend upward.",
              },
            ].map((principle) => (
              <div
                key={principle.title}
                className="border border-white/10 rounded-lg p-6 md:p-8"
              >
                <h3 className="font-display text-lg font-medium mb-3 text-white">
                  {principle.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-white/5">
            <p className="text-sm text-white/30 max-w-2xl leading-relaxed">
              Torque is the growth engine for onchain economies. We design for builders,
              protocols, and communities who demand tools that are as precise and
              programmable as the systems they power. Our design language is a reflection
              of that mission — systematic, purposeful, and built to scale.
            </p>
          </div>
        </Section>

        {/* 02 — Logo */}
        <Section
          id="logo"
          number="02"
          title="Logo"
          description="The Torque logo is available as a full lockup, wordmark, and standalone symbol. Use the version appropriate for the context."
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {LOGOS.map((logo) => (
              <div
                key={logo.label}
                className="border border-black/5 rounded-lg overflow-hidden"
              >
                <div
                  className={cn(
                    logo.bg,
                    "flex items-center justify-center p-8 md:p-12 aspect-[5/3]"
                  )}
                >
                  <Image
                    src={logo.src}
                    alt={logo.label}
                    width={200}
                    height={48}
                    className={cn("h-8 md:h-10 w-auto", logo.cls)}
                  />
                </div>
                <div className="px-4 py-3 border-t border-black/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-black/35">
                    {logo.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Clear space */}
          <div className="mt-16">
            <h3 className="font-display text-lg font-medium mb-6">Clear Space</h3>
            <div className="border border-black/5 rounded-lg p-8 md:p-12 flex items-center justify-center bg-black/[0.01]">
              <div className="relative">
                <div className="border-2 border-dashed border-blue/20 p-8 md:p-12 rounded">
                  <Image
                    src="/logos/torque-logo-typo.svg"
                    alt="Torque lockup"
                    width={200}
                    height={48}
                    className="h-8 md:h-10 w-auto"
                  />
                </div>
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-full font-mono text-[9px] text-blue/50 pb-1">
                  x
                </div>
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 translate-y-full font-mono text-[9px] text-blue/50 pt-1">
                  x
                </div>
                <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 -translate-x-full font-mono text-[9px] text-blue/50 pr-1">
                  x
                </div>
                <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 translate-x-full font-mono text-[9px] text-blue/50 pl-1">
                  x
                </div>
              </div>
            </div>
            <p className="mt-4 font-mono text-[11px] text-black/30">
              Maintain clear space equal to the height of the symbol mark (x) on all sides. Minimum size: 24px height for the symbol, 80px width for the lockup.
            </p>
          </div>
        </Section>

        {/* 03 — Color */}
        <Section
          id="color"
          number="03"
          title="Color"
          description="Four color families, each with 10 grades from lightest (10) to darkest (100). A grade difference of 50 or more ensures WCAG AA contrast."
        >
          {/* Color families */}
          {colorFamilies.map((family) => (
            <div key={family.slug} className="mb-12">
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="font-display text-lg font-medium">{family.name}</h3>
                <span className="font-mono text-[10px] text-black/30">{family.role}</span>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5">
                {family.grades.map((g) => (
                  <ColorSwatch
                    key={g.grade}
                    hex={g.hex}
                    grade={g.grade}
                    isCore={g.grade === family.core}
                    familyName={family.name}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Gradients */}
          <div className="mt-16">
            <h3 className="font-display text-lg font-medium mb-2">Gradients</h3>
            <p className="text-sm text-black/40 mb-6">
              Approved gradient pairings. Click to copy the CSS value.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {gradients.map((g) => (
                <GradientSwatch
                  key={g.name}
                  name={g.name}
                  css={g.css}
                  stops={g.stops}
                />
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div className="mt-16 border border-black/5 rounded-lg p-6 md:p-8">
            <h3 className="font-display text-lg font-medium mb-4">Accessibility</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-black/50 leading-relaxed mb-4">
                  Use a grade difference of <strong className="text-black">50 or more</strong> between
                  foreground and background colors to meet WCAG AA contrast requirements (4.5:1 for normal text).
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-mono text-xs text-black/50">
                      Blue 60 on Gray 10 — grade diff 50 — Pass
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-mono text-xs text-black/50">
                      Gray 100 on Gray 10 — grade diff 90 — Pass
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="font-mono text-xs text-black/50">
                      Blue 50 on Blue 60 — grade diff 10 — Fail
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg p-4 text-white text-sm font-medium" style={{ backgroundColor: "#0008FF" }}>
                  Blue 60 on White — 4.8:1
                </div>
                <div className="rounded-lg p-4 text-white text-sm font-medium" style={{ backgroundColor: "#08090A" }}>
                  Gray 100 on White — 18.5:1
                </div>
                <div className="rounded-lg p-4 text-sm font-medium border border-black/5" style={{ backgroundColor: "#F4FAFF", color: "#0008FF" }}>
                  Blue 60 on Gray 10
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 04 — Typography */}
        <Section
          id="typography"
          number="04"
          title="Typography"
          description="Three typeface families serve distinct roles: Instrument Sans for display, Geist for body, and Geist Mono for data and code."
        >
          {/* Display */}
          <div className="mb-16">
            <div className="flex items-baseline gap-3 mb-6">
              <h3 className="font-display text-lg font-medium">
                {displayType.name}
              </h3>
              <span className="font-mono text-[10px] text-black/30">Display / Headings</span>
            </div>
            <div className="mb-8">
              <p className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.95] text-black">
                Programmable
                <br />
                Growth Engine
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {displayType.weights.map((w) => (
                <span
                  key={w.label}
                  className="font-display text-lg"
                  style={{ fontWeight: w.value }}
                >
                  {w.label} ({w.value})
                </span>
              ))}
            </div>
            <div className="border border-black/5 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 bg-black/[0.01]">
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Style</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Mobile</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Desktop</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Line Height</th>
                  </tr>
                </thead>
                <tbody>
                  {displayType.sizes.map((s) => (
                    <tr key={s.label} className="border-b border-black/5 last:border-0">
                      <td className="px-4 py-3 text-sm font-medium">{s.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.mobile}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.desktop}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.lineHeight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Body */}
          <div className="mb-16">
            <div className="flex items-baseline gap-3 mb-6">
              <h3 className="font-display text-lg font-medium">
                {bodyType.name}
              </h3>
              <span className="font-mono text-[10px] text-black/30">Body / UI</span>
            </div>
            <div className="mb-8">
              <p className="text-base md:text-lg text-black/50 max-w-2xl leading-relaxed">
                The quick brown fox jumps over the lazy dog.
                Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!
                0123456789
              </p>
            </div>
            <div className="border border-black/5 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 bg-black/[0.01]">
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Style</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Mobile</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Desktop</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Line Height</th>
                  </tr>
                </thead>
                <tbody>
                  {bodyType.sizes.map((s) => (
                    <tr key={s.label} className="border-b border-black/5 last:border-0">
                      <td className="px-4 py-3 text-sm font-medium">{s.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.mobile}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.desktop}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.lineHeight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mono */}
          <div className="mb-16">
            <div className="flex items-baseline gap-3 mb-6">
              <h3 className="font-display text-lg font-medium">
                {monoType.name}
              </h3>
              <span className="font-mono text-[10px] text-black/30">Data / Code / Labels</span>
            </div>
            <div className="mb-8">
              <p className="font-mono text-sm text-black/40 tracking-wide leading-relaxed">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 !@#$%^&*()_+-=
              </p>
            </div>
            <div className="border border-black/5 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 bg-black/[0.01]">
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Style</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Mobile</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Desktop</th>
                    <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 font-medium">Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  {monoType.sizes.map((s) => (
                    <tr key={s.label} className="border-b border-black/5 last:border-0">
                      <td className="px-4 py-3 text-sm font-medium font-mono">{s.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.mobile}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.desktop}</td>
                      <td className="px-4 py-3 font-mono text-xs text-black/50">{s.tracking ?? "normal"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Font pairing */}
          <div className="border border-black/5 rounded-lg p-6 md:p-8">
            <h3 className="font-display text-lg font-medium mb-6">Font Pairing</h3>
            <div className="space-y-6">
              <div>
                <p className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-2">
                  Build the engine for growth
                </p>
                <p className="text-sm text-black/50 leading-relaxed max-w-lg mb-2">
                  Torque provides the programmable infrastructure for onchain economies
                  to design, deploy, and optimize growth campaigns.
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-black/25">
                  $2.4M TVL &middot; 12,847 USERS &middot; 99.9% UPTIME
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 05 — Grid & Layout */}
        <Section
          id="grid"
          number="05"
          title="Grid & Layout"
          description="An 8px base unit underpins all spacing. The responsive grid adapts from 4 columns on mobile to 12 on desktop."
        >
          {/* Base unit */}
          <div className="mb-16">
            <h3 className="font-display text-lg font-medium mb-6">8px Base Unit</h3>
            <div className="flex items-end gap-4 flex-wrap">
              {[8, 16, 24, 32, 48, 64, 96].map((v) => (
                <div key={v} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-blue/8 border border-blue/15 rounded-sm"
                    style={{ width: v, height: v }}
                  />
                  <span className="font-mono text-[10px] text-black/30">{v}px</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing scale */}
          <div className="mb-16">
            <h3 className="font-display text-lg font-medium mb-6">Spacing Scale</h3>
            <div className="space-y-3">
              {[
                { token: "space-1", value: 8 },
                { token: "space-2", value: 16 },
                { token: "space-3", value: 24 },
                { token: "space-4", value: 32 },
                { token: "space-6", value: 48 },
                { token: "space-8", value: 64 },
                { token: "space-12", value: 96 },
              ].map((s) => (
                <div key={s.token} className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-black/30 w-20 shrink-0">
                    {s.token}
                  </span>
                  <div
                    className="h-3 bg-blue/10 border border-blue/15 rounded-sm"
                    style={{ width: s.value * 1.5 }}
                  />
                  <span className="font-mono text-[11px] text-black/40">
                    {s.value}px
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Responsive margins */}
          <div className="mb-16">
            <h3 className="font-display text-lg font-medium mb-6">Responsive Margins</h3>
            <div className="space-y-4">
              {[
                { label: "Mobile", value: "24px", width: "12%" },
                { label: "Tablet", value: "48px", width: "24%" },
                { label: "Desktop", value: "72px", width: "36%" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-black/30 w-16 shrink-0">
                    {m.label}
                  </span>
                  <div
                    className="h-6 bg-blue/8 border border-blue/15 rounded-sm"
                    style={{ width: m.width }}
                  />
                  <span className="font-mono text-[11px] text-black/40">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column grid */}
          <div>
            <h3 className="font-display text-lg font-medium mb-6">Column Grid</h3>
            <div className="space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-black/30 mb-3">
                  Desktop — 12 columns
                </div>
                <div className="grid grid-cols-12 gap-1.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-blue/6 border border-blue/10 rounded-sm flex items-center justify-center"
                    >
                      <span className="font-mono text-[9px] text-blue/30">
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-black/30 mb-3">
                  Mobile — 4 columns
                </div>
                <div className="grid grid-cols-4 gap-1.5 max-w-sm">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-blue/6 border border-blue/10 rounded-sm flex items-center justify-center"
                    >
                      <span className="font-mono text-[9px] text-blue/30">
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 06 — Motion */}
        <Section
          id="motion"
          number="06"
          title="Motion"
          description="Animation should be purposeful, subtle, and swift. Every transition reinforces the feeling of momentum."
          dark
        >
          {/* Principles */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Purposeful", desc: "Every animation communicates a state change or guides attention. Nothing moves without reason." },
              { title: "Subtle", desc: "Micro-interactions over spectacle. Motion supports the interface — it never distracts from content." },
              { title: "Swift", desc: "Fast defaults (200–300ms) for UI feedback. Longer durations (500–800ms) reserved for page transitions." },
            ].map((p) => (
              <div key={p.title} className="border border-white/10 rounded-lg p-6">
                <h3 className="font-display text-base font-medium mb-2 text-white">{p.title}</h3>
                <p className="text-sm text-white/35 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Duration tokens */}
          <div className="mb-16">
            <h3 className="font-display text-lg font-medium mb-6 text-white">Duration Tokens</h3>
            <div className="space-y-3">
              {[
                { token: "instant", value: "100ms", use: "Hover states, toggle feedback" },
                { token: "fast", value: "200ms", use: "Button press, micro-interactions" },
                { token: "normal", value: "300ms", use: "Panel transitions, modals" },
                { token: "slow", value: "500ms", use: "Page section reveals" },
                { token: "slower", value: "800ms", use: "Hero animations, page enter" },
              ].map((d) => (
                <div
                  key={d.token}
                  className="flex items-center gap-4 border border-white/5 rounded-lg px-4 py-3"
                >
                  <span className="font-mono text-[11px] text-white/60 w-16 shrink-0">
                    {d.token}
                  </span>
                  <span className="font-mono text-[11px] text-white/30 w-14 shrink-0">
                    {d.value}
                  </span>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue/60 rounded-full motion-bar"
                      style={{
                        width: "100%",
                        animation: `motionBar ${d.value} ease-out infinite`,
                        animationDelay: "0s",
                      }}
                    />
                  </div>
                  <span className="text-xs text-white/25 hidden md:block">
                    {d.use}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Easing curves */}
          <div>
            <h3 className="font-display text-lg font-medium mb-6 text-white">Easing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "ease-out",
                  value: "cubic-bezier(0.16, 1, 0.3, 1)",
                  desc: "Default for enter/reveal animations. Fast start, gentle stop.",
                },
                {
                  name: "ease-in-out",
                  value: "cubic-bezier(0.65, 0, 0.35, 1)",
                  desc: "For transitions where both start and end are visible.",
                },
              ].map((e) => (
                <div key={e.name} className="border border-white/10 rounded-lg p-6">
                  <div className="font-mono text-sm text-white/70 mb-1">{e.name}</div>
                  <div className="font-mono text-[10px] text-white/25 mb-3">{e.value}</div>
                  <p className="text-xs text-white/30">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 07 — Usage Rules */}
        <Section
          id="usage"
          number="07"
          title="Usage Rules"
          description="Guidelines for applying the Torque brand correctly and consistently."
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Do */}
            <div className="border border-black/5 rounded-lg p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-black/35">
                  Do
                </span>
              </div>
              <ul className="space-y-4 text-sm text-black/50">
                <li className="flex gap-3">
                  <span className="text-green-500 shrink-0 mt-0.5">+</span>
                  Use the logo with adequate clear space on all sides
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 shrink-0 mt-0.5">+</span>
                  Maintain minimum size of 24px for the symbol
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 shrink-0 mt-0.5">+</span>
                  Use brand colors from the defined palette
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 shrink-0 mt-0.5">+</span>
                  Pair Instrument Sans headings with Geist body text
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 shrink-0 mt-0.5">+</span>
                  Use Geist Mono for data labels, metrics, and code
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 shrink-0 mt-0.5">+</span>
                  Ensure grade difference of 50+ for text on backgrounds
                </li>
              </ul>
            </div>
            {/* Don't */}
            <div className="border border-black/5 rounded-lg p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-black/35">
                  Don&apos;t
                </span>
              </div>
              <ul className="space-y-4 text-sm text-black/50">
                <li className="flex gap-3">
                  <span className="text-red-500 shrink-0 mt-0.5">&minus;</span>
                  Stretch, rotate, or distort the logo
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 shrink-0 mt-0.5">&minus;</span>
                  Place logo on busy or low-contrast backgrounds
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 shrink-0 mt-0.5">&minus;</span>
                  Use unapproved color combinations
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 shrink-0 mt-0.5">&minus;</span>
                  Add effects like shadows or outer glow to the logo
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 shrink-0 mt-0.5">&minus;</span>
                  Alter logo proportions or internal spacing
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 shrink-0 mt-0.5">&minus;</span>
                  Combine brand colors without checking contrast
                </li>
              </ul>
            </div>
          </div>

          {/* Color combo rules */}
          <div className="mt-12">
            <h3 className="font-display text-lg font-medium mb-6">Color Combination Rules</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { bg: "#08090A", fg: "#FFFFFF", label: "Black + White", pass: true },
                { bg: "#0008FF", fg: "#FFFFFF", label: "Blue + White", pass: true },
                { bg: "#F4FAFF", fg: "#08090A", label: "Gray 10 + Black", pass: true },
                { bg: "#5DFDCB", fg: "#08090A", label: "Cyan + Black", pass: true },
                { bg: "#F1A3A1", fg: "#08090A", label: "Coral + Black", pass: true },
                { bg: "#5DFDCB", fg: "#FFFFFF", label: "Cyan + White", pass: false },
              ].map((combo, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden border border-black/5"
                >
                  <div
                    className="p-5 text-sm font-medium"
                    style={{ backgroundColor: combo.bg, color: combo.fg }}
                  >
                    Sample Text Aa
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-black/50">{combo.label}</span>
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-wider",
                        combo.pass ? "text-green-600" : "text-red-500"
                      )}
                    >
                      {combo.pass ? "Pass" : "Fail"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 08 — Resources */}
        <Section
          id="resources"
          number="08"
          title="Resources"
          description="Download brand assets and access design tools."
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Logo pack */}
            <a
              href="/logos/download"
              className="group border border-black/5 rounded-lg p-6 hover:border-black/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-black/[0.03] flex items-center justify-center">
                  <Download className="w-5 h-5 text-black/30" />
                </div>
                <ExternalLink className="w-4 h-4 text-black/15 group-hover:text-black/40 transition-colors" />
              </div>
              <h3 className="font-display text-base font-medium mb-1">Logo Pack</h3>
              <p className="text-sm text-black/40">
                SVG logos — lockup, wordmark, and symbol in light/dark variants.
              </p>
            </a>

            {/* Fonts */}
            <a
              href="https://fonts.google.com/specimen/Instrument+Sans"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-black/5 rounded-lg p-6 hover:border-black/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-black/[0.03] flex items-center justify-center font-display text-lg font-bold text-black/30">
                  Aa
                </div>
                <ExternalLink className="w-4 h-4 text-black/15 group-hover:text-black/40 transition-colors" />
              </div>
              <h3 className="font-display text-base font-medium mb-1">Instrument Sans</h3>
              <p className="text-sm text-black/40">
                Display typeface — available on Google Fonts.
              </p>
            </a>

            {/* Geist */}
            <a
              href="https://vercel.com/font"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-black/5 rounded-lg p-6 hover:border-black/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-black/[0.03] flex items-center justify-center font-mono text-sm font-bold text-black/30">
                  Gt
                </div>
                <ExternalLink className="w-4 h-4 text-black/15 group-hover:text-black/40 transition-colors" />
              </div>
              <h3 className="font-display text-base font-medium mb-1">Geist Font Family</h3>
              <p className="text-sm text-black/40">
                Body &amp; mono typeface by Vercel.
              </p>
            </a>
          </div>

          {/* Contact */}
          <div className="mt-12 border border-black/5 rounded-lg p-6 md:p-8">
            <h3 className="font-display text-lg font-medium mb-2">Brand Inquiries</h3>
            <p className="text-sm text-black/40 mb-4">
              For brand partnership, co-marketing, or custom asset requests, reach out to our team.
            </p>
            <a
              href="https://torque.so"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue hover:underline"
            >
              torque.so
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </Section>
      </main>

      {/* Motion bar animation keyframes */}
      <style jsx>{`
        @keyframes motionBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
