import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Alert } from "../alerts/model";
import { useStore } from "./StoreContainer";

interface EmployeeState {
  clockIn: () => void;
  clockOut: () => void;
  subscribe: (listener: AlertListener) => AlertSubscription;
  unsubscribe: (subscription: AlertSubscription) => void;
}

const EmployeeContext = createContext<EmployeeState | undefined>(undefined);

export type AlertListener = (alert: Alert) => void;
export type AlertSubscription = number;

export const EmployeeContainer = ({ children }: PropsWithChildren) => {
  const [ clockedIn, setClockedIn ] = useState<boolean>(false);
  const [ listeners, setListeners ] = useState<{ [key: number]: AlertListener}>({});
  const { dispatch } = useStore();

  useEffect(() => {
    const timeout = clockedIn ? setTimeout(() => {
      for (const key in listeners) {
        if (Object.prototype.hasOwnProperty.call(listeners, key)) {
          const listener = listeners[key];
          listener({
            id: "1",
            title: "Adventurer spotted!",
            description: "A fighter has been spotted in the lobby."
          });
        }
      }
    }, 5000) : undefined;

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [ clockedIn ]);

  return (
    <EmployeeContext.Provider value={{
      clockIn: () => {
        setClockedIn(true);
      },
      clockOut: () => {
        setClockedIn(false);
        dispatch({ type: "RESET" });
      },
      subscribe: (listener: AlertListener) => {
        const keys = Object.keys(listeners);
        const nextKey = keys.length > 0 ? Math.max(...keys.map(key => parseInt(key))) + 1 : 0;
        setListeners({
          ...listeners,
          [nextKey]: listener
        });
        return nextKey;
      },
      unsubscribe: (subscription: AlertSubscription) => {
        const { [subscription]: _, ...rest } = listeners;
        setListeners(rest);
      }
    }}>
      {children}
    </EmployeeContext.Provider>
  )
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeContainer");
  }
  return {
    clockIn: context.clockIn,
    clockOut: context.clockOut
  };
};

export const useAlertNotification = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useAlertNotification must be used within an EmployeeContainer");
  }
  return {
    subscribe: context.subscribe,
    unsubscribe: context.unsubscribe
  }
}