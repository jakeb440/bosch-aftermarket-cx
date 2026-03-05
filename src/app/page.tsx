"use client";

import { useDashboardData } from "@/lib/data";
import { JourneyMap } from "@/components/JourneyMap";
import { DiagnosticSynthesis } from "@/components/DiagnosticSynthesis";
import { FinancialBenchmark } from "@/components/FinancialBenchmark";
import { Wrench } from "lucide-react";

export default function Home() {
  const data = useDashboardData();

  return (
    <main className="min-h-screen bg-surface-alt">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text">
                {data.company.name} — Aftermarket Services CX Diagnostic
              </h1>
              <p className="text-sm text-text-secondary">
                {data.company.sector} · {data.company.context}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <JourneyMap journey={data.journey} companyName={data.company.name} />
        <DiagnosticSynthesis
          synthesis={data.synthesis}
          companyName={data.company.name}
        />
        <FinancialBenchmark
          financial={data.financial}
          companyName={data.company.name}
        />
      </div>

      <footer className="border-t border-border bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-text-muted">
          Aftermarket Services CX Diagnostic · {data.company.name} · Sources:
          JD Power 2025, Consumer Reports, PissedConsumer, Trustpilot, Amazon
          Reviews, McKinsey, Bain · Generated {new Date().getFullYear()}
        </div>
      </footer>
    </main>
  );
}
