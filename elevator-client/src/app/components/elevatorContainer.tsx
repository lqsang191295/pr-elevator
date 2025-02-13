import { iRequestFloor, STATUS } from "@/types/elevator";
import Elevator from "./elevator";
import ElevatorBehavior from "./elevatorBehavior";
import ElevatorDirector from "./elevatorDirector";

type ElevatorContainerProps = {
  id: number;
  nFloor: number;
  currentFloor: number;
  status: STATUS;
  onRequestFloor: (payload: iRequestFloor) => void;
};

export default function ElevatorContainer({
  id,
  nFloor,
  currentFloor,
  status,
  onRequestFloor,
}: ElevatorContainerProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <ElevatorDirector
          id={id}
          nFloor={nFloor}
          onRequestFloor={onRequestFloor}
        />
      </div>
      <div className="px-5">
        <Elevator nFloor={nFloor} currentFloor={currentFloor} status={status} />
      </div>
      <div>
        <ElevatorBehavior />
      </div>
    </div>
  );
}
