"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, Quote } from "lucide-react";
import type { FinancialData } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";

interface FinancialBenchmarkProps {
  financial: FinancialData;
  companyName: string;
}

export function FinancialBenchmark({
  financial,
  companyName,
}: FinancialBenchmarkProps) {
  const chartData = financial.peerMetrics
    .filter((p) => p.aftermarketPct != null)
    .sort((a, b) => (b.aftermarketPct ?? 0) - (a.aftermarketPct ?? 0))
    .map((p) => ({
      name: p.company,
      pct: p.aftermarketPct,
      isTarget: p.isTarget,
    }));

  return (
    <section className="bg-white rounded-xl border border-border shadow-sm">
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-text">
            Financial Benchmarking &amp; Analyst Perspectives
          </h2>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Aftermarket services opportunity sizing and competitive financial
          context
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Overview narrative */}
        <div className="prose prose-slate prose-sm max-w-none">
          <p className="text-sm text-text leading-relaxed">
            {financial.overview}
          </p>
        </div>

        {/* Peer metrics table */}
        <div>
          <h3 className="text-sm font-semibold text-text mb-3">
            Peer Aftermarket Metrics (Estimates)
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-alt border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">
                    Company
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-text-secondary">
                    Aftermarket Rev. ($B)
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-text-secondary">
                    Aftermarket %
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-text-secondary">
                    Installed Base (M units)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {financial.peerMetrics.map((peer) => (
                  <tr
                    key={peer.company}
                    className={cn(
                      peer.isTarget ? "bg-primary/5 font-medium" : ""
                    )}
                  >
                    <td className="px-4 py-3 text-text">
                      {peer.company}
                      {peer.isTarget && (
                        <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                          TARGET
                        </span>
                      )}
                    </td>
                    <td className="text-right px-4 py-3 text-text">
                      {peer.aftermarketRevenueBn != null
                        ? `$${formatNumber(peer.aftermarketRevenueBn)}`
                        : "—"}
                    </td>
                    <td className="text-right px-4 py-3 text-text">
                      {peer.aftermarketPct != null
                        ? `${peer.aftermarketPct}%`
                        : "—"}
                    </td>
                    <td className="text-right px-4 py-3 text-text">
                      {peer.installedBaseM != null
                        ? `~${peer.installedBaseM}M`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Note: Aftermarket revenue and installed base figures are analyst
            estimates based on public filings, industry reports, and market
            research. Service margins and plan attach rates are not publicly
            disclosed by most appliance OEMs.
          </p>
        </div>

        {/* Aftermarket % chart */}
        {chartData.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-text mb-3">
              Aftermarket Revenue as % of Total
            </h3>
            <div className="rounded-xl border border-border p-4">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 25]}
                    tickFormatter={(v: number) => `${v}%`}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={180}
                    tick={{ fontSize: 12, fill: "#334155" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    formatter={(value: number) => [`${value}%`, "Aftermarket %"]}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                    }}
                  />
                  <Bar dataKey="pct" radius={[0, 4, 4, 0]} barSize={24}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isTarget ? "#6366f1" : "#94a3b8"}
                        stroke={entry.isTarget ? "#4f46e5" : "none"}
                        strokeWidth={entry.isTarget ? 2 : 0}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Analyst perspectives */}
        {financial.analystPerspectives.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-text mb-3">
              Analyst Perspectives
            </h3>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {financial.analystPerspectives.map((item, i) => (
                <div
                  key={i}
                  className="relative rounded-xl border border-border bg-surface-alt p-5"
                >
                  <Quote className="absolute right-4 top-4 h-6 w-6 text-primary/10" />
                  <blockquote className="relative text-sm leading-relaxed text-text">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-xs font-medium text-text-muted">
                    — {item.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
