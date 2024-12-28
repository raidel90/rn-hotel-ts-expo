import { useEffect, useState } from "react";
import { useStore } from "../providers/StoreContainer";
import { SummaryResult } from "./model";

export const useSummary = () => {
  const [ error, setError ] = useState<Error | undefined>(undefined);
  const { store, dispatch } = useStore();

  useEffect(() => {
    if (!store.summaryLoaded) {
      fetch("api/summary")
        .then(response => response.json())
        .then((summary: SummaryResult) => {
          dispatch({
            type: "SUMMARY_LOADED",
            summary
          });
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [dispatch, setError]);

  return {
    data: store.summaryLoaded ? store.summary : undefined,
    error
  }
};