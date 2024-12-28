import { useQuery } from "@tanstack/react-query";
import { SummaryResult } from "./model";

export function useSummary() {
  return useQuery<SummaryResult>({
    queryKey: ["summary"],
    queryFn: () =>
      fetch("api/summary")
        .then(res => res.json())
  });
}