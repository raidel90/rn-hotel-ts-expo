import { createContext, Dispatch, useContext, useReducer } from "react";
import { Alert } from "../alerts/model";
import { SummaryResult } from "../home/model";

interface StoreData {
  summary: SummaryResult;
  summaryLoaded: boolean;
  alerts: { [id: string]: Alert };
  alertsLoaded: boolean;
}

const initialState: StoreData = {
  summary: {
    occupiedRooms: 0,
    pendingRequests: 0,
    pendingTasks: 0,
    pendingAlerts: 0,
  },
  summaryLoaded: false,
  alerts: {},
  alertsLoaded: false,
};

interface ResetAction {
  type: "RESET";
}

interface SummaryLoadedAction {
  type: "SUMMARY_LOADED";
  summary: SummaryResult;
}

interface AlertsLoadedAction {
  type: "ALERTS_LOADED";
  alerts: Alert[];
}

interface NewAlertAction {
  type: "NEW_ALERT";
  alert: Alert;
}

interface AlertHandledAction {
  type: "ALERT_HANDLED";
  alertId: string;
}

type StoreAction = ResetAction | SummaryLoadedAction | AlertsLoadedAction | NewAlertAction | AlertHandledAction;

const updateStore = (store: StoreData, action: StoreAction) => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SUMMARY_LOADED":
      return {
        ...store,
        summary: action.summary,
        summaryLoaded: true,
      };
    case "ALERTS_LOADED":
      return {
        ...store,
        alerts: action.alerts.reduce((acc, alert) => {
          acc[alert.id] = alert;
          return acc;
        }, store.alerts),
        alertsLoaded: true,
      };
    case "NEW_ALERT":
      const newAlerts = {
        ...store.alerts,
        [action.alert.id]: action.alert,
      };
      return {
        ...store,
        alerts: newAlerts,
        summary: {
          ...store.summary,
          pendingAlerts: Object.keys(newAlerts).length,
        },
      };
    case "ALERT_HANDLED":
      const { [action.alertId]: _, ...remainingAlerts } = store.alerts;
      return {
        ...store,
        alerts: remainingAlerts,
        summary: {
          ...store.summary,
          pendingAlerts: Object.keys(remainingAlerts).length,
        },
      };
    default:
      const _exhaustiveCheck: never = action;
      return store;
  }
};

interface StoreContextValue {
  store: StoreData;
  dispatch: Dispatch<StoreAction>;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const StoreContainer = ({ children }: { children: React.ReactNode }) => {
  const [store, dispatch] = useReducer(updateStore, initialState);

  return (
    <StoreContext.Provider value={{
      store,
      dispatch,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error("useStore must be used within a StoreContainer");
  }
  return value;
};