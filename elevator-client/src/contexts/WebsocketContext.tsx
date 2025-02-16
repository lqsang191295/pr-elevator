"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(
  process.env.API_HOST || "https://pr-elevator.vercel.app",
  {
    withCredentials: true,
  }
);
export const WebsocketContext = createContext<Socket | null>(null);

interface WebsocketProviderProps {
  children: ReactNode;
}

export const WebsocketProvider = ({ children }: WebsocketProviderProps) => {
  const [ws, setWs] = useState<Socket | null>(null);

  useEffect(() => {
    setWs(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <WebsocketContext.Provider value={ws}>{children}</WebsocketContext.Provider>
  );
};
