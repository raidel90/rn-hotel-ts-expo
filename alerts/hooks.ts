import { useEffect, useState } from "react";
import { useStore } from "../providers/StoreContainer";
import { AlertsResult } from "./model";

export const useAlerts = () => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const { store, dispatch } = useStore();

  useEffect(() => {
    if (!store.alertsLoaded) {
      fetch("api/alerts")
        .then(response => response.json())
        .then((result: AlertsResult) => {
          dispatch({ type: "ALERTS_LOADED", alerts: result.alerts });
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [store, dispatch, setError]);

  return {
    data: store.alertsLoaded ? Object.values(store.alerts) : undefined,
    error
  };
};

export const useAlert = (alertId: string) => {
  const { store, dispatch } = useStore();

  return {
    alert: store.alerts.hasOwnProperty(alertId) ? store.alerts[alertId] : undefined,
    handleAlert: () => {
      dispatch({ type: "ALERT_HANDLED", alertId });
    }
  }
};