"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type { SynthesisData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DiagnosticSynthesisProps {
  synthesis: SynthesisData;
  companyName: string;
}

export function DiagnosticSynthesis({
  synthesis,
  companyName,
}: DiagnosticSynthesisProps) {
  return (
    <section className="bg-white rounded-xl border border-border shadow-sm">
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-lg font-semibold text-text">
          Diagnostic Synthesis
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Connecting {companyName}&apos;s customer experience findings to
          aftermarket growth opportunities
        </p>
      </div>

      <div className="p-6 space-y-8">
        <div className="prose prose-slate prose-sm max-w-none">
          {synthesis.narrative.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-sm text-text leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-800">
              <ShieldCheck className="h-5 w-5" />
              Top Strengths
            </h3>
            {synthesis.topStrengths.map((strength, i) => (
              <SynthesisCard
                key={i}
                rank={i + 1}
                title={strength.title}
                detail={strength.detail}
                variant="strength"
              />
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-primary-dark">
              <TrendingUp className="h-5 w-5" />
              Top Aftermarket Growth Opportunities
            </h3>
            {synthesis.topOpportunities.map((opp, i) => (
              <SynthesisCard
                key={i}
                rank={i + 1}
                title={opp.title}
                detail={opp.detail}
                variant="opportunity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SynthesisCard({
  rank,
  title,
  detail,
  variant,
}: {
  rank: number;
  title: string;
  detail: string;
  variant: "strength" | "opportunity";
}) {
  const [expanded, setExpanded] = useState(true);

  const isStrength = variant === "strength";
  const ringColor = isStrength ? "bg-emerald-600" : "bg-primary";
  const borderColor = isStrength ? "border-emerald-200" : "border-primary/20";
  const hoverBg = isStrength
    ? "hover:bg-emerald-50/50"
    : "hover:bg-primary/5";

  return (
    <div className={cn("rounded-xl border bg-white shadow-sm", borderColor)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex w-full items-start gap-3 p-4 text-left transition-colors",
          hoverBg
        )}
      >
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
            ringColor
          )}
        >
          {rank}
        </div>
        <h4 className="flex-1 text-sm font-medium leading-snug text-text">
          {title}
        </h4>
        <div className="shrink-0 pt-0.5 text-text-muted">
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <p className="ml-10 text-sm leading-relaxed text-text-secondary whitespace-pre-line">
            {detail}
          </p>
        </div>
      )}
    </div>
  );
}
