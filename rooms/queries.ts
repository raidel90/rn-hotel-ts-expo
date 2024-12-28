import { useQuery } from "@tanstack/react-query";
import { Room, RoomsResult } from "./model";

export function useRooms() {
  return useQuery<RoomsResult>({
    queryKey: ["rooms"],
    queryFn: () =>
      fetch("api/rooms")
        .then(res => res.json())
  });
}

export function useRoom(roomNumber: string) {
  return useQuery<Room>({
    queryKey: ["rooms", roomNumber],
    queryFn: () =>
      fetch(`api/rooms/${roomNumber}`)
        .then(res => res.json())
  });
}