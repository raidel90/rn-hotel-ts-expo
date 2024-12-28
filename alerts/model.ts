export interface Alert {
  id: string;
  title: string;
  description: string;
}

export interface AlertsResult {
  alerts: Alert[];
}