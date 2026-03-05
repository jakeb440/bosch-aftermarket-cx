export interface ClientData {
  company: Company;
  journey: JourneyData;
  synthesis: SynthesisData;
  financial: FinancialData;
}

export interface Company {
  name: string;
  sector: string;
  context: string;
}

export interface JourneyData {
  description: string;
  stages: JourneyStage[];
}

export interface JourneyStage {
  number: number;
  name: string;
  description: string;
  isAftermarket: boolean;
  strengths: {
    text: string;
    severity: "high" | "medium" | "low";
  }[];
  painPoints: {
    text: string;
    severity: "high" | "medium" | "low";
  }[];
  competitiveContext?: {
    label: string;
    type: "bosch-advantage" | "competitors-better" | "industry-wide";
  }[];
}

export interface SynthesisData {
  narrative: string;
  topStrengths: {
    title: string;
    detail: string;
  }[];
  topOpportunities: {
    title: string;
    detail: string;
  }[];
}

export interface FinancialData {
  overview: string;
  peerMetrics: PeerMetric[];
  analystPerspectives: {
    quote: string;
    source: string;
  }[];
}

export interface PeerMetric {
  company: string;
  isTarget: boolean;
  aftermarketRevenueBn: number | null;
  aftermarketPct: number | null;
  serviceMarginPct: number | null;
  installedBaseM: number | null;
  servicePlanAttachPct: number | null;
}
