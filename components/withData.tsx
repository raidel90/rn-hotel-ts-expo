import React from "react";
import { ErrorScreen } from "./ErrorScreen";
import { LoadingScreen } from "./LoadingScreen";

export type WithDataProps<TData, TProps> = { data: TData } & TProps;

export interface UseDataResult<TData> {
  error: unknown;
  data: TData | undefined;
}

export function withData<TData>(useData: () => UseDataResult<TData>) {
  return function <TProps>(WrappedComponent: React.ComponentType<{ data: TData } & TProps>) {
    return function (props: TProps) {
      const { error, data } = useData();

      if (error) {
        return <ErrorScreen error={error} />;
      }

      if (!data) {
        return <LoadingScreen />;
      }

      return (
        <WrappedComponent {...props} data={data} />
      );
    }
  }
}