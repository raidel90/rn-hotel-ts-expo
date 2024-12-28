import { useQuery } from "@tanstack/react-query";
import { RequestsResult } from "./model";

export function useRequests() {
  return useQuery<RequestsResult>({
    queryKey: ["requests"],
    queryFn: () =>
      fetch("api/requests")
        .then(res => res.json())
  });
}