"use client";

import { useContext, useEffect, useState } from "react";
import ElevatorContainer from "./components/elevatorContainer";
import { iElevator, iRequestFloor } from "@/types/elevator";
import { WebsocketContext } from "@/contexts/WebsocketContext";
import { callElevator, initialElevator } from "@/api/elevator";

export default function Home() {
  const numbers = [...Array(10).keys()].reverse();
  const [elevators, setElevators] = useState<iElevator[]>([]);
  const socket = useContext(WebsocketContext);

  const fetchDataElevator = async () => {
    const elevators = await initialElevator();

    console.log("currentElevator === ", elevators);

    setElevators(elevators);
  };

  const handleRequestFloor = async (payload: iRequestFloor) => {
    await callElevator(payload);

    // console.log("AAAAAAAAAA ", payload);

    // socket?.emit("callElevator", payload);
  };

  const connectSocket = () => {
    socket?.on("connect", () => {
      console.log("Connected!");
    });

    socket?.on("moveElevator", (data) => {
      console.log("Move elevator!", data);
    });

    socket?.on("onUpdateElevator", (data: iElevator) => {
      console.log("updateElevator ==== ", data);
      updateElevator(data);
    });
  };

  const updateElevator = (newData: iElevator) => {
    setElevators((prevElevators) => {
      const updatedElevators = prevElevators.map((elevator) =>
        elevator.id === newData.id ? { ...elevator, ...newData } : elevator
      );

      console.log("Updated Elevators:", updatedElevators);
      return updatedElevators;
    });
  };

  useEffect(() => {
    fetchDataElevator();
  }, []);

  useEffect(() => {
    connectSocket();

    return () => {
      console.log("Off socket");
      socket?.off("connect!");
      socket?.off("onMessage");
    };
  }, [socket]);

  if (!elevators.length) return <div>Loading...</div>;

  return (
    <div className="w-full h-full flex justify-center py-2 gap-40">
      <div className="flex flex-col gap-2">
        {numbers.map((n, i) => {
          return (
            <ElevatorContainer
              id={elevators[0].id}
              key={i}
              nFloor={n + 1}
              currentFloor={elevators[0].floor}
              onRequestFloor={handleRequestFloor}
              status={elevators[0].status}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        {numbers.map((n, i) => {
          return (
            <ElevatorContainer
              id={elevators[1].id}
              key={i}
              nFloor={n + 1}
              currentFloor={elevators[1].floor}
              onRequestFloor={handleRequestFloor}
              status={elevators[1].status}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        {numbers.map((n, i) => {
          return (
            <ElevatorContainer
              id={elevators[2].id}
              key={i}
              nFloor={n + 1}
              currentFloor={elevators[2].floor}
              onRequestFloor={handleRequestFloor}
              status={elevators[2].status}
            />
          );
        })}
      </div>
    </div>
  );
}
