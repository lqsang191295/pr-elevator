import { iRequestFloor } from "@/types/elevator";
import BtnDown from "./btnDown";
import BtnUp from "./btnUp";
import BtnUpDown from "./btnUpDown";

type ElevatorDirectorProps = {
  id: number;
  nFloor: number;
  onRequestFloor: (payload: iRequestFloor) => void;
};

export default function ElevatorDirector({
  id,
  nFloor,
  onRequestFloor,
}: ElevatorDirectorProps) {
  const fnOnRequestFloor = (direction: string) => {
    onRequestFloor({ id, direction, floor: nFloor });
  };

  let children = <BtnUpDown onClick={fnOnRequestFloor} />;

  switch (nFloor) {
    case 1:
      children = <BtnUp onClick={fnOnRequestFloor} />;
      break;
    case 10:
      children = <BtnDown onClick={fnOnRequestFloor} />;
      break;
    default:
      children = <BtnUpDown onClick={fnOnRequestFloor} />;
  }

  return <div className="">{children}</div>;
}
