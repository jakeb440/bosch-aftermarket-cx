import type { ClientData } from "./types";
import rawData from "../../public/data/client-data.json";

const data = rawData as ClientData;

export function useDashboardData(): ClientData {
  return data;
}
