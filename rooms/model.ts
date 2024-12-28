import { ImageURISource } from "react-native";

export interface Guest {
  name: string;
  avatar: ImageURISource;
  serviceRequests: string[];
}

export interface Room {
  roomNumber: string;
  guest?: Guest;
}

export interface RoomsResult {
  rooms: Room[];
}