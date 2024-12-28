import { ImageURISource } from "react-native";

export interface Request {
  id: string;
  roomNumber: string;
  guestName: string;
  guestAvatar: ImageURISource;
  description: string;
}

export interface RequestsResult {
  requests: Request[];
}