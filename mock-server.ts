import { Alert, AlertsResult } from "alerts/model";
import { SummaryResult } from "home/model";
import { createServer, Response, Server } from "miragejs";
import { useEffect, useState } from "react";
import { Request, RequestsResult } from "./requests/model";
import { Room, RoomsResult } from "./rooms/model";

const mindFlayer = require("@assets/mind-flayer.png");
const wraith = require("@assets/wraith.png");

const rooms: Room[] = [
  { roomNumber: "101", guest: { name: "Melinda Flair", avatar: mindFlayer, serviceRequests: [] } },
  { roomNumber: "102" },
  { roomNumber: "103", guest: { name: "Walter Raithe", avatar: wraith, serviceRequests: ["Fresh towels"] } },
  { roomNumber: "201" },
  { roomNumber: "202" },
  { roomNumber: "203" },
  { roomNumber: "301" },
  { roomNumber: "302" },
  { roomNumber: "303" }
];

const requests: Request[] = [
  { id: "103-1", roomNumber: "103", guestName: "Walter Raithe", guestAvatar: wraith, description: "Fresh towels" }
];

const alerts: Alert[] = [
  { id: "1", title: "Adventurer spotted!", description: "A fighter has been spotted in the lobby." },
];

export function useMockServer() {
  const [server, setServer] = useState<Server | undefined>();
  useEffect(() => {
    server?.shutdown();
    
    setServer(createServer({
      routes() {
        this.get<SummaryResult>("/api/summary", () => {
          return {
            occupiedRooms: rooms.filter(room => room.guest).length,
            pendingRequests: requests.length,
            pendingTasks: 0,
            pendingAlerts: 0
          };
        });
        this.get<RoomsResult>("/api/rooms", () => {
          return { rooms };
        });
        this.get("/api/rooms/:roomNumber", (schema, request) => {
          const roomNumber = request.params.roomNumber;
          const room = rooms.find(room => room.roomNumber === roomNumber);
          if (!room) {
            return new Response(404, {}, { error: "Room not found" });
          }
          return room;
        });
        this.get<RequestsResult>("/api/requests", () => {
          return { requests };
        });
        this.get<AlertsResult>("/api/alerts", () => {
          return { alerts: [] };
        });
        this.get("/api/alerts/:id", (schema, request) => {
          const id = request.params.id;
          const alert = alerts.find(alert => alert.id === id);
          if (!alert) {
            return new Response(404, {}, { error: "Alert not found" });
          }
          return alert;
        });
      },
    }));

    return () => {
      server?.shutdown();
      setServer(undefined);
    }
  }, []);
}