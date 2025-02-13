import { STATUS } from "@/types/elevator";

type ElevatorProps = {
  nFloor: number;
  currentFloor: number;
  status: STATUS;
};

export default function Elevator({
  nFloor,
  currentFloor,
  status,
}: ElevatorProps) {
  return (
    <div
      className={`border-2 ${
        currentFloor === nFloor ? "border-red-600" : "border-black"
      } w-20 h-20 flex flex-col items-center justify-between`}
    >
      <div className="">{nFloor}</div>
      <div className="flex">
        <div
          className={`border-2 border-black w-5 h-8 ${
            currentFloor === nFloor && status === "OPENING"
              ? "-translate-x-5"
              : ""
          }`}
        ></div>
        <div
          className={`border-2 border-black w-5 h-8 ${
            currentFloor === nFloor && status === "OPENING"
              ? "translate-x-5"
              : ""
          }`}
        ></div>
      </div>
    </div>
  );
}
